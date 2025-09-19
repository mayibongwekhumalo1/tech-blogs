"use client"

import React, { useState, useEffect } from 'react';

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
        <div className="lg:col-span-2 bg-black/25 rounded-lg shadow-md p-6 relative overflow-hidden">
          {mainPost.image && (
            <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: `url(${mainPost.image})` }}></div>
          )}
          <div className="relative z-10">
            <span className="text-blue-600 font-semibold">{mainPost.category?.name || 'Technology'}</span>
            <h2 className="text-3xl font-bold mt-2 mb-4">{mainPost.title}</h2>
            <p className="text-gray-600 mb-4">{mainPost.excerpt || 'Read the full article'}</p>
            <div className="flex items-center text-sm text-gray-500 mb-6">
              <span>by {mainPost.author?.name || 'Admin'}</span>
              <span className="mx-2">•</span>
              <span>{new Date(mainPost.createdAt).toLocaleDateString()}</span>
              <span className="mx-2">•</span>
              <span>5 Mins</span>
            </div>
            <p className="text-gray-700 mb-6">
              {mainPost.excerpt || 'Browned butter and brown sugar area caramelly goodness, crispy edges and soft centers rare melty little puddles of chocolate first favorite thing about these browned butter.'}
            </p>
            <button className="text-blue-600 font-semibold hover:underline">Read More</button>
          </div>
        </div>

        <div className="space-y-6">
          {sidePosts.map((post, index) => (
            <div key={post._id} className="bg-white rounded-lg shadow-md p-4">
              <span className={`font-semibold ${index === 0 ? 'text-green-600' : index === 1 ? 'text-purple-600' : 'text-red-600'}`}>
                {post.category?.name || 'Category'}
              </span>
              <h3 className="text-lg font-bold mt-1 mb-2">{post.title}</h3>
              <p className="text-gray-600 mb-2">{post.excerpt || 'Read more about this topic'}</p>
              <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;