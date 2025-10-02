"use client";

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import { FaThumbsUp, FaComment, FaShare } from 'react-icons/fa';
import { CldImage } from 'next-cloudinary';

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
  likes: number;
  views: number;
}

interface Comment {
  _id: string;
  content: string;
  author: { name: string; email: string; image?: string };
  createdAt: string;
  likes: number;
}

const PostPage: React.FC = () => {
  const params = useParams();
  const id = params.id as string;
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const postResponse = await fetch(`/api/posts/${id}`);
        if (postResponse.ok) {
          const postData = await postResponse.json();
          setPost(postData);

          // Fetch comments using post._id
          const commentsResponse = await fetch(`/api/comments?postId=${postData._id}`);
          if (commentsResponse.ok) {
            const commentsData = await commentsResponse.json();
            setComments(commentsData.comments);
          }
        } else {
          router.push('/404');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, router]);

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
        setPost({ ...post, likes: data.likes });
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
        setComments([comment, ...comments]); // Add new comment at the top (newest first)
        setNewComment('');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const getCategoryColor = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'technology': return 'text-blue-600';
      case 'mobile': return 'text-green-600';
      case 'gadget': return 'text-purple-600';
      case 'news': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Post not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header image */}
      {post.image && (
        <div className="relative h-64 md:h-96 overflow-hidden">
          <CldImage
            src={post.image}
            alt={post.title}
            width={1200}
            height={400}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      )}

      <div className="max-w-4xl mx-auto py-12 px-6">
        {/* Category and date */}
        <div className="flex items-center justify-between mb-4">
          <span className={`font-semibold text-lg ${getCategoryColor(post.category.name)}`}>
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
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
          {post.title}
        </h1>

        {/* Author */}
        <div className="flex items-center mb-8">
          {post.author.image && (
            <img
              src={post.author.image}
              alt={post.author.name}
              className="w-12 h-12 rounded-full mr-4"
            />
          )}
          <div>
            <p className="font-semibold text-gray-900">by {post.author.name}</p>
            <p className="text-sm text-gray-500">{post.author.email}</p>
          </div>
        </div>

        {/* Excerpt */}
        {post.excerpt && (
          <div className="bg-gray-50 p-6 rounded-lg mb-8 border-l-4 border-blue-500">
            <p className="text-gray-700 italic">{post.excerpt}</p>
          </div>
        )}

        {/* Full content */}
        <div className="prose prose-lg max-w-none mb-12">
          <div
            className="text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        {/* Like and Comment Section */}
        <div className="border-t border-b border-gray-200 py-6 mb-12">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <button
                onClick={handleLike}
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                <FaThumbsUp />
                <span>{post.likes} Likes</span>
              </button>
              <div className="flex items-center space-x-2 text-gray-600">
                <FaComment />
                <span>{comments.length} Comments</span>
              </div>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200">
                <FaShare />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Comments</h2>

          {/* Comment Form */}
          {session ? (
            <form onSubmit={handleCommentSubmit} className="mb-8">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write a comment..."
                className="w-full p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={4}
                required
              />
              <button
                type="submit"
                disabled={submitting}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50"
              >
                {submitting ? 'Posting...' : 'Post Comment'}
              </button>
            </form>
          ) : (
            <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800">Please <a href="/auth/signin" className="underline">sign in</a> to comment.</p>
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment._id} className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center mb-4">
                  {comment.author?.image && (
                    <img
                      src={comment.author.image}
                      alt={comment.author.name}
                      className="w-8 h-8 rounded-full mr-3"
                    />
                  )}
                  <div>
                    <p className="font-semibold text-gray-900">{comment.author?.name || 'Anonymous'}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(comment.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700">{comment.content}</p>
                <div className="flex items-center mt-4 text-sm text-gray-500">
                  <button className="flex items-center space-x-1 hover:text-blue-600">
                    <FaThumbsUp size={12} />
                    <span>{comment.likes}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostPage;