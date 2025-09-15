import NextAuth from 'next-auth';
import type { NextAuthOptions, Session, User as NextAuthUser } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import type { Account } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import User from './models/User';
import connectToDatabase from './mongodb';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
    };
  }

  interface User {
    role?: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: string;
  }
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        try {
          await connectToDatabase();
          const user = await User.findOne({ email: credentials.email.toLowerCase() }).select('+password');

          if (!user) {
            throw new Error('No user found with this email');
          }

          if (!user.password) {
            throw new Error('This account uses OAuth. Please sign in with the appropriate provider');
          }

          const isPasswordValid = await user.comparePassword(credentials.password);

          if (!isPasswordValid) {
            throw new Error('Invalid password');
          }

          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role || 'user',
          };
        } catch (error) {
          console.error('Auth error:', error);
          throw error;
        }
      }
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: 'jwt' as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/signin',
    newUser: '/auth/signup',
  },
  callbacks: {
    async jwt({ token, user, account }: { token: JWT; user?: NextAuthUser; account?: Account | null }) {
      if (user) {
        token.role = user.role || 'user';
      }

      // Handle OAuth users
      if (account?.provider === 'github' || account?.provider === 'google') {
        await connectToDatabase();
        const existingUser = await User.findOne({ email: token.email });

        if (existingUser) {
          token.role = existingUser.role || 'user';
        } else {
          // Create user for OAuth if they don't exist
          const newUser = new User({
            name: token.name,
            email: token.email,
            image: token.picture,
            role: 'user',
          });
          await newUser.save();
        }
      }

      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token && session.user) {
        session.user.id = token.sub!;
        session.user.role = token.role as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      // Redirect to home page after sign in
      if (url.startsWith('/auth/signin') || url.startsWith('/auth/signup')) {
        return baseUrl;
      }
      // Allows relative callback URLs

      if (url.startsWith("/")) return `${baseUrl}${url}`;
      
      // Allows callback URLs on the same origin
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  events: {

    async signIn({ user, account }: { user: NextAuthUser; account?: Account | null }) {
      console.log(`User ${user.email} signed in via ${account?.provider}`);
    },
    async signOut({ token }: { token?: JWT }) {
      console.log(`User ${token?.email} signed out`);
    },
  },
};

export default NextAuth(authOptions);