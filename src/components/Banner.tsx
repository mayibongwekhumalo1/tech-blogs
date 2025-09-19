"use client"

import React, { useState, useEffect } from 'react';
import PostModal from './PostModal';

interface Post {
  _id: string;
  slug: string;
  title: string;
  content: string;
  excerpt?: string;
  image?: string;
  category: { name: string; slug: string; color?: string };
  createdAt: string;
  author: { name: string; email: string; image?: string };
  published: boolean;
  featured: boolean;
}

const Hero = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts?limit=4&published=true&page=1');
        const data = await response.json();
        setPosts(data.posts || []);
      } catch (error) {
        console.error('Error fetching posts for banner:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-100 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">Loading banner...</div>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="bg-gray-100 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">No posts available</div>
        </div>
      </div>
    );
  }

  const mainPost = posts[0];
  const sidePosts = posts.slice(1, 4);

  return (
    <div className="bg-gray-100 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 rounded-lg shadow-md relative overflow-hidden hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer group" onClick={() => setSelectedPost(mainPost)}>
          {mainPost.image && (
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${mainPost.image})` }}></div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-5"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
            <span className="bg-pink-500 text-white font-semibold px-2 py-1">{mainPost.category?.name || 'Technology'}</span>
            <h2 className="text-2xl font-bold mt-2 mb-4 text-white">{mainPost.title}</h2>
            <p className="text-gray-200 mb-4">{mainPost.excerpt || 'Read the full article'}</p>
            <div className="flex items-center text-sm text-gray-300 mb-6">
              <span>by {mainPost.author?.name || 'Admin'}</span>
              <span className="mx-2">•</span>
              <span>{new Date(mainPost.createdAt).toLocaleDateString()}</span>
              <span className="mx-2">•</span>
              <span>5 Mins</span>
            </div>
            <p className="text-gray-200 mb-6">
              {mainPost.excerpt || 'Browned butter and brown sugar area caramelly goodness, crispy edges and soft centers rare melty little puddles of chocolate first favorite thing about these browned butter.'}
            </p>
            <button className="text-white font-semibold hover:underline">Read More</button>
          </div>
        </div>

        <div className="space-y-6">
          {sidePosts.map((post, index) => (
            <div key={post._id} className="rounded-lg shadow-md p-4 relative overflow-hidden hover:scale-105 hover:shadow-xl transition-all duration-300 cursor-pointer group" onClick={() => setSelectedPost(post)}>
              {post.image && (
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${post.image})` }}></div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-5"></div>
              <div className="relative z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className={`bg-pink-500 text-white font-semibold px-2 py-1`}>
                  {post.category?.name || 'Category'}
                </span>
                <h3 className="text-lg font-bold mt-1 mb-2 text-white">{post.title}</h3>
                <p className="text-gray-300 mb-2">{post.excerpt || 'Read more about this topic'}</p>
                <p className="text-sm text-gray-400">{new Date(post.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <PostModal post={selectedPost} isOpen={!!selectedPost} onClose={() => setSelectedPost(null)} />
    </div>
  );
};

export default Hero;