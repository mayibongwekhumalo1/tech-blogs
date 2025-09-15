# Tech Blogs

A modern, full-stack blog application built with Next.js 15, featuring user authentication, role-based access control, and a rich content management system.

## 🚀 Features

- **Modern Tech Stack**: Built with Next.js 15, React 19, and TypeScript
- **Authentication**: Secure user authentication with NextAuth.js supporting credentials, GitHub, and Google OAuth
- **Role-Based Access**: Separate dashboards for regular users and administrators
- **Content Management**: Create, edit, and manage blog posts with rich text content
- **Categories & Comments**: Organize posts by categories and enable user engagement through comments
- **Image Upload**: Cloudinary integration for seamless image management
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Real-time Updates**: Dynamic content loading and updates
- **SEO Optimized**: Server-side rendering and optimized meta tags

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, MongoDB with Mongoose
- **Authentication**: NextAuth.js
- **Database**: MongoDB Atlas
- **Image Storage**: Cloudinary
- **Icons**: Lucide React, React Icons, Heroicons
- **Styling**: Tailwind CSS with custom components

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js 18+ installed
- MongoDB Atlas account and cluster
- GitHub OAuth app (optional)
- Google OAuth app (optional)
- Cloudinary account (optional)

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/tech-blogs.git
   cd tech-blogs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Copy `.env.local.example` to `.env.local` and fill in your values:

   ```env
   # MongoDB
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name

   # NextAuth.js
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here-change-in-production

   # OAuth Providers (Optional)
   GITHUB_CLIENT_ID=your-github-client-id
   GITHUB_CLIENT_SECRET=your-github-client-secret
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret

   # Cloudinary (Optional)
   CLOUDINARY_CLOUD_NAME=your-cloud-name
   CLOUDINARY_API_KEY=your-api-key
   CLOUDINARY_API_SECRET=your-api-secret
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
tech-blogs/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   ├── auth/          # Authentication endpoints
│   │   │   ├── posts/         # Post management
│   │   │   ├── comments/      # Comment system
│   │   │   ├── users/         # User management
│   │   │   └── categories/    # Category management
│   │   ├── admin/             # Admin dashboard
│   │   ├── dashboard/         # User dashboard
│   │   ├── auth/              # Authentication pages
│   │   └── (other pages)/     # Public pages
│   ├── components/            # Reusable components
│   │   ├── AdminGuard.tsx     # Admin role protection
│   │   ├── FloatingCreateButton.tsx # Quick create button
│   │   ├── PostCard.tsx       # Post display component
│   │   └── ...
│   ├── lib/                   # Utility functions
│   │   ├── auth.ts            # Authentication configuration
│   │   ├── mongodb.ts         # Database connection
│   │   ├── models/            # Mongoose models
│   │   └── samplePosts.ts     # Sample data
│   └── middleware.ts          # Next.js middleware
├── public/                    # Static assets
├── .env.local                 # Environment variables
└── package.json               # Dependencies and scripts
```

## 🔐 Authentication & Authorization

The application supports multiple authentication methods:

- **Credentials**: Email and password authentication
- **GitHub OAuth**: Sign in with GitHub account
- **Google OAuth**: Sign in with Google account

### User Roles

- **User**: Can create posts, comment, and access personal dashboard
- **Admin**: Full access including user management, content moderation, and admin dashboard

## 📝 API Endpoints

### Posts
- `GET /api/posts` - Fetch posts with pagination and filtering
- `POST /api/posts` - Create new post (authenticated)
- `GET /api/posts/[id]` - Get single post
- `PUT /api/posts/[id]` - Update post (author/admin only)
- `DELETE /api/posts/[id]` - Delete post (author/admin only)

### Comments
- `GET /api/comments` - Fetch comments for a post
- `POST /api/comments` - Create comment (authenticated)

### Users
- `GET /api/users` - Get user list (admin only)
- `PUT /api/users/[id]` - Update user (admin only)

### Categories
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (admin only)

## 🎨 Customization

### Styling
The application uses Tailwind CSS for styling. Custom styles can be added in:
- `src/app/globals.css` - Global styles
- Component-specific styles using Tailwind classes

### Themes
Currently uses a light theme with amber background. Theme customization can be implemented by modifying the Tailwind configuration.

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms
The application can be deployed to any platform supporting Node.js:
- Netlify
- Railway
- Render
- AWS/GCP/Azure

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React framework
- [NextAuth.js](https://next-auth.js.org/) - Authentication library
- [MongoDB](https://www.mongodb.com/) - NoSQL database
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Cloudinary](https://cloudinary.com/) - Image management

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

Built with ❤️ using Next.js and modern web technologies.
