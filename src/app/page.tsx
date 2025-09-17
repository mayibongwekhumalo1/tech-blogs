

'use client'

import React, { useState, useEffect } from 'react';
import Banner from '../components/Banner';
import PostCard from '../components/PostCard';
import Sidebar from '../components/Sidebar';
import PostModal from '../components/PostModal';
import SmallCard from '../components/SmallCard'
import OverlayCard from '../components/OverlayCard'

interface Post {
  _id: string;
  slug: string;
  title: string;
  content: string;
  category: { name: string; slug: string; color?: string };
  createdAt: string;
  author: { name: string; email: string; image?: string };
  excerpt?: string;
  image?: string;
  published: boolean;
  featured: boolean;
}

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts?limit=12&published=true&page=1');
        const data = await response.json();
        setPosts(data.posts || []);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Banner />



       <div className="flex justify-between items-center mb-6 px-20">
              <h2 className="text-2xl font-bold">Editor&apos;s Choice</h2>
              <div className="flex space-x-2">
                <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">◀</button>
                <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">▶</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:flex items-center justify-center gap-6 mb-12 border-2 border-black">
              {posts.slice(0, 3).map((post) => (
                <SmallCard
                  key={post._id}
                  category={post.category?.name || 'Uncategorized'}
                  title={post.title}
                  date={new Date(post.createdAt).toLocaleDateString()}
                  excerpt={post.excerpt}
                  author={post.author?.name ? `by ${post.author.name}` : undefined}
                  onClick={() => handlePostClick(post)}
                  slug={post.slug}
                />
              ))}
            </div>

      <main className="max-w-7xl mx-auto py-12 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Editor&apos;s Choice */}
           

            {/* Recent Posts */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Recent Posts</h2>
              <button className="text-blue-600 font-semibold hover:underline">View All</button>
            </div>
              
              
            <div className="space-y-6 mb-12 grid grid-rows-1 grid-cols-1 lg:grid-cols-3">
              {posts.slice(3, 7).map((post, index) => (
                <div key={post._id} className={index === 0 ? 'lg:col-span-2' : ''}>
                  {index === 0 ? (
                    <OverlayCard
                      category={post.category?.name || 'Uncategorized'}
                      title={post.title}
                      date={new Date(post.createdAt).toLocaleDateString()}
                      excerpt={post.excerpt}
                      author={post.author?.name ? `by ${post.author.name}` : undefined}
                      readTime="5 Mins"
                      onClick={() => handlePostClick(post)}
                      slug={post.slug}
                      image={post.image}
                    />
                  ) : (
                    <PostCard
                      category={post.category?.name || 'Uncategorized'}
                      title={post.title}
                      date={new Date(post.createdAt).toLocaleDateString()}
                      excerpt={post.excerpt}
                      author={post.author?.name ? `by ${post.author.name}` : undefined}
                      readTime="5 Mins"
                      onClick={() => handlePostClick(post)}
                      slug={post.slug}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Trending News */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Trending News</h2>
              <button className="text-blue-600 font-semibold hover:underline">View All</button>
            </div>

            {posts.length > 7 && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-12">
                <span className="text-blue-600 font-semibold">{posts[7].category?.name || 'Technology'}</span>
                <h3 className="text-xl font-bold mt-1 mb-2">{posts[7].title}</h3>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <span>by {posts[7].author?.name || 'Admin'}</span>
                  <span className="mx-2">•</span>
                  <span>{new Date(posts[7].createdAt).toLocaleDateString()}</span>
                  <span className="mx-2">•</span>
                  <span>5 Mins</span>
                </div>
                <p className="text-gray-700 mb-4">
                  {posts[7].excerpt || 'Browned butter and brown sugar area caramelly goodness, crispy edges and soft centers rare melty little puddles of chocolate first favorite thing about these browned butter.'}
                </p>
                <button className="text-blue-600 font-semibold hover:underline">Read More</button>
              </div>
            )}

            {/* More Posts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {posts.slice(8, 11).map((post) => (
                <PostCard
                  key={post._id}
                  category={post.category?.name || 'Uncategorized'}
                  title={post.title}
                  date={new Date(post.createdAt).toLocaleDateString()}
                  onClick={() => handlePostClick(post)}
                  slug={post.slug}
                />
              ))}
            </div>

            {/* Weekly Best News */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Weekly Best News</h2>
              <button className="text-blue-600 font-semibold hover:underline">View All</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.slice(11, 15).map((post) => (
                <PostCard
                  key={post._id}
                  category={post.category?.name || 'Uncategorized'}
                  title={post.title}
                  date={new Date(post.createdAt).toLocaleDateString()}
                  onClick={() => handlePostClick(post)}
                  slug={post.slug}
                />
              ))}
            </div>
          </div>

          <div>
            <Sidebar />
          </div>
        </div>
      </main>

      <PostModal
        post={selectedPost}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Home;