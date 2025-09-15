'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [categories, setCategories] = useState<{ _id: string; name: string; color?: string }[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingPost, setEditingPost] = useState<string | null>(null);
  const [userPosts, setUserPosts] = useState<{
    _id: string;
    title: string;
    excerpt: string;
    image?: string;
    published: boolean;
    createdAt: string;
    category: { name: string; _id: string };
    content?: string;
    tags?: string[];
  }[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    image: '',
    category: '',
    tags: '',
    published: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/categories');
        if (res.ok) {
          const data = await res.json();
          setCategories(data.categories || []);
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    const fetchUserPosts = async () => {
      try {
        const res = await fetch('/api/posts?limit=20');
        if (res.ok) {
          const data = await res.json();
          // Filter posts by current user
          const userPosts = data.posts.filter((post: { author: { _id: string } }) => post.author._id === session?.user?.id);
          setUserPosts(userPosts);
        }
      } catch (error) {
        console.error('Failed to fetch user posts:', error);
      }
    };

    if (session) {
      fetchCategories();
      fetchUserPosts();
    }
  }, [session]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const isEditing = !!editingPost;
      const method = isEditing ? 'PUT' : 'POST';
      const url = isEditing ? `/api/posts/${editingPost}` : '/api/posts';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(`Blog post ${isEditing ? 'updated' : 'created'} successfully!`);
        setFormData({
          title: '',
          content: '',
          excerpt: '',
          image: '',
          category: '',
          tags: '',
          published: false,
        });
        setEditingPost(null);
        // Refresh posts list
        const fetchUserPosts = async () => {
          try {
            const res = await fetch('/api/posts?limit=20');
            if (res.ok) {
              const data = await res.json();
              const userPosts = data.posts.filter((post: { author: { _id: string } }) => post.author._id === session?.user?.id);
              setUserPosts(userPosts);
            }
          } catch (error) {
            console.error('Failed to refresh posts:', error);
          }
        };

        await fetchUserPosts();

        setTimeout(() => {
          setShowCreateModal(false);
          setMessage('');
        }, 2000);
      } else {
        setMessage(data.error || `Failed to ${isEditing ? 'update' : 'create'} blog post`);
      }
    } catch (error) {
      setMessage(`An error occurred while ${editingPost ? 'updating' : 'creating'} the blog post`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleEditPost = (post: typeof userPosts[0]) => {
    setEditingPost(post._id);
    setFormData({
      title: post.title,
      content: post.content || '',
      excerpt: post.excerpt,
      image: post.image || '',
      category: post.category._id,
      tags: post.tags?.join(', ') || '',
      published: post.published,
    });
    setShowCreateModal(true);
    setMessage('');
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage('Post deleted successfully!');
        // Refresh posts
        const fetchUserPosts = async () => {
          try {
            const res = await fetch('/api/posts?limit=20');
            if (res.ok) {
              const data = await res.json();
              const userPosts = data.posts.filter((post: { author: { _id: string } }) => post.author._id === session?.user?.id);
              setUserPosts(userPosts);
            }
          } catch (error) {
            console.error('Failed to refresh posts:', error);
          }
        };
        await fetchUserPosts();
        setTimeout(() => setMessage(''), 3000);
      } else {
        const data = await response.json();
        setMessage(data.error || 'Failed to delete post');
      }
    } catch (error) {
      setMessage('An error occurred while deleting the post');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Modern Navbar */}
      <nav className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">D</span>
                </div>
                <h1 className="text-xl font-bold bg-blue-600 bg-clip-text text-transparent">
                  Dashboard
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                  {session.user?.name?.charAt(0)?.toUpperCase() || session.user?.email?.charAt(0)?.toUpperCase()}
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">
                    {session.user?.name || 'User'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {session.user?.email}
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border border-blue-200">
                {session.user?.role || 'user'}
              </span>
              <button
                onClick={handleSignOut}
                className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 shadow-lg"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-blue-600 rounded-2xl p-8 text-white shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2">
                  Welcome back, {session.user?.name || 'User'}! 👋
                </h2>
                <p className="text-blue-100 text-lg">
                  Ready to create amazing content today?
                </p>
              </div>
              <div className="hidden md:block">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <span className="text-4xl"> {session.user?.name?.charAt(0)?.toUpperCase()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">📝</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Posts</p>
                <p className="text-2xl font-bold text-gray-900">--</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">👁️</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Views</p>
                <p className="text-2xl font-bold text-gray-900">--</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl">⭐</span>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Engagement</p>
                <p className="text-2xl font-bold text-gray-900">--</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white text-sm">⚡</span>
                </span>
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => {
                    setShowCreateModal(true);
                    setMessage('');
                  }}
                  className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg hover:from-blue-100 hover:to-purple-100 transition-all duration-200 border border-blue-200 cursor-pointer"
                >
                  <span className="text-2xl mr-3">📝</span>
                  <div>
                    <p className="font-medium text-gray-900">New Post</p>
                    <p className="text-sm text-gray-600">Create a blog post</p>
                  </div>
                </button>
                <button className="flex items-center p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg hover:from-green-100 hover:to-teal-100 transition-all duration-200 border border-green-200">
                  <span className="text-2xl mr-3">📊</span>
                  <div>
                    <p className="font-medium text-gray-900">Analytics</p>
                    <p className="text-sm text-gray-600">View statistics</p>
                  </div>
                </button>
                <button className="flex items-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg hover:from-purple-100 hover:to-pink-100 transition-all duration-200 border border-purple-200">
                  <span className="text-2xl mr-3">⚙️</span>
                  <div>
                    <p className="font-medium text-gray-900">Settings</p>
                    <p className="text-sm text-gray-600">Manage account</p>
                  </div>
                </button>
                <button className="flex items-center p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg hover:from-yellow-100 hover:to-orange-100 transition-all duration-200 border border-yellow-200">
                  <span className="text-2xl mr-3">📁</span>
                  <div>
                    <p className="font-medium text-gray-900">Categories</p>
                    <p className="text-sm text-gray-600">View all categories</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white text-sm">📈</span>
                </span>
                Recent Activity
              </h3>
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-blue-600">📝</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Welcome to your dashboard!</p>
                    <p className="text-xs text-gray-500">Just now</p>
                  </div>
                </div>
                <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-600">✅</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">Account setup completed</p>
                    <p className="text-xs text-gray-500">Today</p>
                  </div>
                </div>
              </div>
            </div>

            {/* My Posts */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white text-sm">📚</span>
                </span>
                My Posts
              </h3>
              {userPosts.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📝</span>
                  </div>
                  <p className="text-gray-600 mb-4">No posts yet. Create your first post!</p>
                  <button
                    onClick={() => setShowCreateModal(true)}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                  >
                    Create Post
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {userPosts.slice(0, 4).map((post) => (
                    <div key={post._id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-all duration-200">
                      <div className="flex items-start space-x-3">
                        {post.image ? (
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-gray-500 text-xl">📷</span>
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 truncate">{post.title}</h4>
                          <p className="text-xs text-gray-600 mt-1 line-clamp-2">{post.excerpt || 'No excerpt'}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {post.category.name}
                            </span>
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              post.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {post.published ? 'Published' : 'Draft'}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(post.createdAt).toLocaleDateString()}
                          </p>
                          <div className="flex space-x-2 mt-2">
                            <button
                              onClick={() => handleEditPost(post)}
                              className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeletePost(post._id)}
                              className="text-xs bg-red-600 hover:bg-red-700 text-white px-2 py-1 rounded"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* User Profile Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Profile</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Name</span>
                  <span className="text-sm font-medium text-gray-900">{session.user?.name || 'N/A'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Email</span>
                  <span className="text-sm font-medium text-gray-900">{session.user?.email}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Role</span>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800">
                    {session.user?.role || 'user'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">ID</span>
                  <span className="text-xs font-mono text-gray-500">{session.user?.id?.slice(0, 8)}...</span>
                </div>
              </div>
            </div>

            {/* Available Categories */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <span className="w-6 h-6 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mr-3">
                  <span className="text-white text-xs">📁</span>
                </span>
                Available Categories
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {categories.slice(0, 8).map((category) => (
                  <div key={category._id} className="flex items-center p-2 bg-gray-50 rounded-lg">
                    <div
                      className="w-4 h-4 rounded-full mr-2"
                      style={{ backgroundColor: category.color }}
                    ></div>
                    <span className="text-sm font-medium text-gray-900 truncate">{category.name}</span>
                  </div>
                ))}
              </div>
              {categories.length > 8 && (
                <p className="text-xs text-gray-500 mt-3">
                  And {categories.length - 8} more categories...
                </p>
              )}
            </div>

            {/* Role-based Features */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Your Features</h3>
              <div className="space-y-3">
                <div className="flex items-center p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                  <span className="text-xl mr-3">👤</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">User Access</p>
                    <p className="text-xs text-gray-600">Basic functionality</p>
                  </div>
                </div>

                {(session.user?.role === 'moderator' || session.user?.role === 'admin') && (
                  <div className="flex items-center p-3 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg border border-green-200">
                    <span className="text-xl mr-3">🛡️</span>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Moderator Tools</p>
                      <p className="text-xs text-gray-600">Content moderation</p>
                    </div>
                  </div>
                )}

                {session.user?.role === 'admin' && (
                  <div className="flex items-center p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
                    <span className="text-xl mr-3">⚡</span>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Admin Panel</p>
                      <p className="text-xs text-gray-600">Full system control</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Create Post Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <span className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-white text-sm">📝</span>
                  </span>
                  {editingPost ? 'Edit Post' : 'Create New Post'}
                </h2>
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setEditingPost(null);
                    setFormData({
                      title: '',
                      content: '',
                      excerpt: '',
                      image: '',
                      category: '',
                      tags: '',
                      published: false,
                    });
                  }}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <span className="text-2xl">×</span>
                </button>
              </div>
            </div>

            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="modal-title" className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    id="modal-title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your post title"
                  />
                </div>

                <div>
                  <label htmlFor="modal-excerpt" className="block text-sm font-medium text-gray-700 mb-2">
                    Excerpt
                  </label>
                  <textarea
                    id="modal-excerpt"
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Brief description of your post"
                  />
                </div>

                <div>
                  <label htmlFor="modal-image" className="block text-sm font-medium text-gray-700 mb-2">
                    Featured Image URL
                  </label>
                  <input
                    type="url"
                    id="modal-image"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <label htmlFor="modal-content" className="block text-sm font-medium text-gray-700 mb-2">
                    Content *
                  </label>
                  <textarea
                    id="modal-content"
                    name="content"
                    value={formData.content}
                    onChange={handleInputChange}
                    required
                    rows={8}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Write your post content here..."
                  />
                </div>

                <div>
                  <label htmlFor="modal-category" className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    id="modal-category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="modal-tags" className="block text-sm font-medium text-gray-700 mb-2">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    id="modal-tags"
                    name="tags"
                    value={formData.tags}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="javascript, react, tutorial"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    id="modal-published"
                    name="published"
                    type="checkbox"
                    checked={formData.published}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="modal-published" className="ml-2 block text-sm text-gray-900">
                    Publish immediately
                  </label>
                </div>

                {message && (
                  <div className={`p-4 rounded-lg ${message.includes('successfully') ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                    {message}
                  </div>
                )}

                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowCreateModal(false);
                      setEditingPost(null);
                      setFormData({
                        title: '',
                        content: '',
                        excerpt: '',
                        image: '',
                        category: '',
                        tags: '',
                        published: false,
                      });
                    }}
                    className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
                  >
                    {isSubmitting ? (editingPost ? 'Updating...' : 'Creating...') : (editingPost ? 'Update Post' : 'Create Post')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}