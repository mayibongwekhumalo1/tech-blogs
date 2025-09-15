'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AdminGuard from '../../../components/AdminGuard';

type PostWithDetails = {
  _id: string;
  title: string;
  author?: { name: string };
  createdAt: string | Date;
  published: boolean;
  category?: { name: string };
};


export default function AdminDashboard() {
  const { data: session } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({ totalPosts: 0, totalUsers: 0, publishedPosts: 0 });
  const [posts, setPosts] = useState<PostWithDetails[]>([]);
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    tags: '',
    published: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');


  useEffect(() => {
    if (session?.user?.role === 'admin') {
      fetchStats();
      fetchPosts();
      fetchCategories();
    }
  }, [session]);

  const fetchStats = async () => {
    try {
      const [postsRes, usersRes] = await Promise.all([
        fetch('/api/posts?limit=1000'),
        fetch('/api/users')
      ]);
      const postsData = await postsRes.json();
      const usersData = await usersRes.json();

      setStats({
        totalPosts: postsData.posts?.length || 0,
        totalUsers: usersData.users?.length || 0,
        publishedPosts: postsData.posts?.filter((p: PostWithDetails) => p.published).length || 0,
      });
    } catch (_error) {
      console.error('Failed to fetch stats:', _error);
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/posts?limit=50');
      const data = await res.json();
      setPosts(data.posts || []);
    } catch (_error) {
      console.error('Failed to fetch posts:', _error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data.categories || []);
    } catch (_error) {
      console.error('Failed to fetch categories:', _error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
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
        setMessage('Blog post created successfully!');
        setFormData({
          title: '',
          content: '',
          excerpt: '',
          category: '',
          tags: '',
          published: false,
        });
        fetchPosts(); 
        fetchStats(); 
      } else {
        setMessage(data.error || 'Failed to create blog post');
      }
    } catch (_error) {
      setMessage('An error occurred while creating the blog post');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage('Post deleted successfully!');
        fetchPosts();
        fetchStats();
      } else {
        const data = await response.json();
        setMessage(data.error || 'Failed to delete post');
      }
    } catch (_error) {
      setMessage('An error occurred while deleting the post');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <AdminGuard>
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">
                Welcome, {session?.user?.name || session?.user?.email}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                Admin
              </span>
              <button
                onClick={() => router.push('/dashboard')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                User Dashboard
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Posts</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalPosts}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Published</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.publishedPosts}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Draft Posts</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalPosts - stats.publishedPosts}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white shadow rounded-lg">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8 px-6">
                {[
                  { id: 'overview', label: 'Overview' },
                  { id: 'create', label: 'Create Post' },
                  { id: 'manage', label: 'Manage Posts' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-indigo-500 text-indigo-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'overview' && (
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Welcome to the Admin Dashboard!
                  </h2>
                  <p className="text-gray-600 mb-8">
                    This is the administrative control panel. Here you can manage users, posts, categories, and system settings.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white">
                      <h3 className="text-lg font-medium mb-2">User Management</h3>
                      <p className="text-sm opacity-90 mb-4">
                        Manage user accounts, roles, and permissions.
                      </p>
                      <button className="w-full bg-white text-blue-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50">
                        Manage Users
                      </button>
                    </div>
                    <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-white">
                      <h3 className="text-lg font-medium mb-2">Content Management</h3>
                      <p className="text-sm opacity-90 mb-4">
                        Review, approve, and manage blog posts and comments.
                      </p>
                      <button
                        onClick={() => setActiveTab('manage')}
                        className="w-full bg-white text-green-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50"
                      >
                        Manage Content
                      </button>
                    </div>
                    <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-white">
                      <h3 className="text-lg font-medium mb-2">System Settings</h3>
                      <p className="text-sm opacity-90 mb-4">
                        Configure system-wide settings and preferences.
                      </p>
                      <button className="w-full bg-white text-purple-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-50">
                        System Settings
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'create' && (
                <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-xl shadow-lg border border-gray-100">
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-indigo-100 rounded-full mr-4">
                      <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Create New Blog Post</h3>
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="group">
                        <label htmlFor="title" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                          <svg className="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                          Title *
                        </label>
                        <input
                          type="text"
                          id="title"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white hover:border-gray-400"
                          placeholder="Enter post title..."
                        />
                      </div>
                      <div className="group">
                        <label htmlFor="category" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                          <svg className="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                          </svg>
                          Category *
                        </label>
                        <select
                          id="category"
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white hover:border-gray-400"
                        >
                          <option value="">Select a category</option>
                          {categories.map((category) => (
                            <option key={category._id} value={category._id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="group">
                      <label htmlFor="excerpt" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                        <svg className="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                        </svg>
                        Excerpt
                      </label>
                      <textarea
                        id="excerpt"
                        name="excerpt"
                        value={formData.excerpt}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white hover:border-gray-400 resize-none"
                        placeholder="Brief description of the post..."
                      />
                    </div>

                    <div className="group">
                      <label htmlFor="content" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                        <svg className="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Content *
                      </label>
                      <textarea
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleInputChange}
                        required
                        rows={12}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white hover:border-gray-400 resize-none"
                        placeholder="Write your blog post content here..."
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="group">
                        <label htmlFor="tags" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                          <svg className="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                          </svg>
                          Tags (comma-separated)
                        </label>
                        <input
                          type="text"
                          id="tags"
                          name="tags"
                          value={formData.tags}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white hover:border-gray-400"
                          placeholder="e.g., tech, javascript, tutorial"
                        />
                      </div>
                      <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <input
                          id="published"
                          name="published"
                          type="checkbox"
                          checked={formData.published}
                          onChange={handleInputChange}
                          className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded transition-all duration-200"
                        />
                        <label htmlFor="published" className="ml-3 text-sm font-medium text-gray-700 cursor-pointer">
                          Publish immediately
                        </label>
                      </div>
                    </div>

                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex justify-center items-center py-4 px-6 border border-transparent rounded-lg shadow-lg text-base font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
                      >
                        {isSubmitting ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Creating...
                          </>
                        ) : (
                          <>
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                            Create Blog Post
                          </>
                        )}
                      </button>
                    </div>

                    {message && (
                      <div className={`p-4 rounded-lg border ${message.includes('successfully') ? 'bg-green-50 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                        <div className="flex items-center">
                          <svg className={`w-5 h-5 mr-2 ${message.includes('successfully') ? 'text-green-600' : 'text-red-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={message.includes('successfully') ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" : "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"} />
                          </svg>
                          {message}
                        </div>
                      </div>
                    )}
                  </form>
                </div>
              )}

              {activeTab === 'manage' && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Manage Blog Posts</h3>
                  <div className="space-y-4">
                    {posts.map((post) => (
                      <div key={post._id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="text-lg font-medium text-gray-900">{post.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">
                              By {post.author?.name || 'Unknown'} • {new Date(post.createdAt).toLocaleDateString()}
                            </p>
                            <div className="flex items-center mt-2 space-x-2">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                post.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {post.published ? 'Published' : 'Draft'}
                              </span>
                              <span className="text-sm text-gray-500">
                                {post.category?.name}
                              </span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeletePost(post._id)}
                              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
    </AdminGuard>
  );
}