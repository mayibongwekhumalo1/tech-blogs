"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { FaThumbsUp, FaComment, FaShare } from 'react-icons/fa';

interface Post {
  _id: string;
  slug: string;
  title: string;
  content: string;
  excerpt?: string;
  image?: string;
  category: { name: string; slug: string; color?: string };
  createdAt: string;
  author?: { name: string; email: string; image?: string };
  published: boolean;
  featured: boolean;
  likes?: number;
  views?: number;
}

interface Comment {
  _id: string;
  content: string;
  author: { name: string; email: string; image?: string };
  createdAt: string;
  likes: number;
}

interface PostModalProps {
  post: Post | null;
  isOpen: boolean;
  onClose: () => void;
}

const PostModal: React.FC<PostModalProps> = ({ post, isOpen, onClose }) => {
  const { data: session } = useSession();
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(post?.likes || 0);

  useEffect(() => {
    if (post && isOpen) {
      fetchComments();
      setCurrentLikes(post.likes || 0);
    }
  }, [post, isOpen]);

  const fetchComments = async () => {
    if (!post) return;
    try {
      const response = await fetch(`/api/comments?postId=${post._id}`);
      if (response.ok) {
        const data = await response.json();
        // Sort comments by creation date (newest first)
        const sortedComments = data.comments.sort((a: Comment, b: Comment) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setComments(sortedComments);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleLike = async () => {
    if (!post) return;
    try {
      const response = await fetch(`/api/posts/${post._id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'like' }),
      });
      if (response.ok) {
        const data = await response.json();
        setCurrentLikes(data.likes);
      }
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !post || !session) return;

    setSubmitting(true);
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: newComment,
          postId: post._id,
        }),
      });

      if (response.ok) {
        const comment = await response.json();
        setComments([...comments, comment]);
        setNewComment('');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;

    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setComments(comments.filter(c => c._id !== commentId));
      }
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

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

        {/* Admin Controls */}
        {session?.user?.role === 'admin' && (
          <div className="absolute top-4 left-4 z-10 flex space-x-2">
            <button
              onClick={() => {
                // TODO: Implement edit functionality
                alert('Edit functionality to be implemented');
              }}
              className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors duration-200"
            >
              Edit Post
            </button>
            <button
              onClick={() => {
                if (confirm('Are you sure you want to delete this post?')) {
                  // TODO: Implement delete functionality
                  alert('Delete functionality to be implemented');
                }
              }}
              className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors duration-200"
            >
              Delete Post
            </button>
          </div>
        )}

        {/* Modal content */}
        <div className="overflow-y-auto max-h-[90vh]">
          {/* Header image */}
          {post.image && (
            <div className="relative h-64 overflow-hidden">
              <Image
                src={post.image}
                alt={post.title}
                width={800}
                height={256}
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
              {post.author?.image && (
                <Image
                  src={post.author.image}
                  alt={post.author?.name || 'Author'}
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded-full mr-3"
                />
              )}
              <div>
                <p className="font-semibold text-gray-900">by {post.author?.name || 'Unknown Author'}</p>
                <p className="text-sm text-gray-500">{post.author?.email || 'No email'}</p>
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
                  <button
                    onClick={handleLike}
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
                  >
                    <FaThumbsUp />
                    <span>Like ({currentLikes})</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200">
                    <FaComment />
                    <span>Comment ({comments.length})</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200">
                    <FaShare />
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

            {/* Comments Section */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold mb-4">Comments</h3>

              {/* Comment Form */}
              {session ? (
                <form onSubmit={handleCommentSubmit} className="mb-6">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    required
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
                  >
                    {submitting ? 'Posting...' : 'Post Comment'}
                  </button>
                </form>
              ) : (
                <div className="mb-6 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-yellow-800 text-sm">Please <a href="/auth/signin" className="underline">sign in</a> to comment.</p>
                </div>
              )}

              {/* Comments List */}
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment._id} className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center mb-2">
                        {comment.author?.image && (
                          <img
                            src={comment.author.image}
                            alt={comment.author.name}
                            className="w-6 h-6 rounded-full mr-2"
                          />
                        )}
                        <div>
                          <p className="font-semibold text-sm text-gray-900">{comment.author?.name || 'Anonymous'}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(comment.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                      {session?.user?.role === 'admin' && (
                        <button
                          onClick={() => handleDeleteComment(comment._id)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                    <p className="text-gray-700 text-sm">{comment.content}</p>
                    <div className="flex items-center mt-2 text-xs text-gray-500">
                      <button className="flex items-center space-x-1 hover:text-blue-600">
                        <FaThumbsUp size={12} />
                        <span>{comment.likes}</span>
                      </button>
                    </div>
                  </div>
                ))}
                {comments.length === 0 && (
                  <p className="text-gray-500 text-center py-4">No comments yet.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;