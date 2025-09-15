"use client";

import React from 'react';

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

interface PostModalProps {
  post: Post | null;
  isOpen: boolean;
  onClose: () => void;
}

const PostModal: React.FC<PostModalProps> = ({ post, isOpen, onClose }) => {
  if (!isOpen || !post) return null;

  const getCategoryColor = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'technology': return 'text-blue-600';
      case 'mobile': return 'text-green-600';
      case 'gadget': return 'text-purple-600';
      case 'news': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop with fade animation */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal content with slide and scale animation */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden transform transition-all duration-300 scale-100 opacity-100">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors duration-200"
        >
          ✕
        </button>

        {/* Modal content */}
        <div className="overflow-y-auto max-h-[90vh]">
          {/* Header image */}
          {post.image && (
            <div className="relative h-64 overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          )}

          {/* Content */}
          <div className="p-8">
            {/* Category and date */}
            <div className="flex items-center justify-between mb-4">
              <span className={`font-semibold ${getCategoryColor(post.category.name)}`}>
                {post.category.name}
              </span>
              <span className="text-sm text-gray-500">
                {new Date(post.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold mb-4 text-gray-900">
              {post.title}
            </h1>

            {/* Author */}
            <div className="flex items-center mb-6">
              {post.author.image && (
                <img
                  src={post.author.image}
                  alt={post.author.name}
                  className="w-10 h-10 rounded-full mr-3"
                />
              )}
              <div>
                <p className="font-semibold text-gray-900">by {post.author.name}</p>
                <p className="text-sm text-gray-500">{post.author.email}</p>
              </div>
            </div>

            {/* Excerpt */}
            {post.excerpt && (
              <div className="bg-gray-50 p-4 rounded-lg mb-6 border-l-4 border-blue-500">
                <p className="text-gray-700 italic">{post.excerpt}</p>
              </div>
            )}

            {/* Full content */}
            <div className="prose prose-lg max-w-none">
              <div
                className="text-gray-800 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200">
                    <span>👍</span>
                    <span>Like</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200">
                    <span>💬</span>
                    <span>Comment</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200">
                    <span>📤</span>
                    <span>Share</span>
                  </button>
                </div>
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;