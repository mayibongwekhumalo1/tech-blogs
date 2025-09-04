'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import PostSlider from '../components/Slider';

interface Post {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  author: {
    name: string;
    email: string;
    image?: string;
  };
  category: {
    name: string;
    slug: string;
    color: string;
  };
  createdAt: string;
  views: number;
  likes: number;
}

export default function Home() {
  const { status } = useSession();
  const router = useRouter();
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const [featuredRes, recentRes] = await Promise.all([
          fetch('/api/posts?featured=true&limit=3'),
          fetch('/api/posts?limit=5')
        ]);

        if (featuredRes.ok) {
          const featuredData = await featuredRes.json();
          setFeaturedPosts(featuredData.posts);
        }

        if (recentRes.ok) {
          const recentData = await recentRes.json();
          setRecentPosts(recentData.posts);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    if (status !== 'authenticated') {
      fetchPosts();
    }
  }, [status]);

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <main className="lg:col-span-3">
            {/* Featured Posts */}
            {featuredPosts.length > 0 && (
              <section className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Featured Posts</h2>
                <PostSlider posts={featuredPosts} />
              </section>
            )}

            {/* Recent Posts */}
            <section>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Recent Posts</h2>
              <div className="space-y-6">
                {recentPosts.map((post) => (
                  <article key={post._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start space-x-4">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <span
                            className="px-2 py-1 text-xs font-semibold rounded mr-2"
                            style={{ backgroundColor: post.category.color + '20', color: post.category.color }}
                          >
                            {post.category.name}
                          </span>
                          <span className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</span>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          <Link href={`/posts/${post.slug}`} className="hover:text-blue-600">
                            {post.title}
                          </Link>
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">By {post.author.name}</span>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>{post.views} views</span>
                            <span>{post.likes} likes</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </main>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">About</h3>
              <p className="text-gray-600 text-sm">
                Discover the latest in technology, programming, and innovation. Join our community of tech enthusiasts.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Categories</h3>
              <div className="space-y-2">
                <Link href="/category/javascript" className="block text-gray-600 hover:text-blue-600 text-sm">JavaScript</Link>
                <Link href="/category/react" className="block text-gray-600 hover:text-blue-600 text-sm">React</Link>
                <Link href="/category/nodejs" className="block text-gray-600 hover:text-blue-600 text-sm">Node.js</Link>
                <Link href="/category/python" className="block text-gray-600 hover:text-blue-600 text-sm">Python</Link>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Newsletter</h3>
              <p className="text-gray-600 text-sm mb-4">Subscribe to get the latest posts delivered to your inbox.</p>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm mb-2"
              />
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 text-sm">
                Subscribe
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
