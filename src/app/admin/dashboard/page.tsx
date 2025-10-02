'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import AdminGuard from '../../../components/AdminGuard';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import {
  FaBook,
  FaCheckCircle,
  FaUsers,
  FaChartLine,
  FaPlus,
  FaTag,
  FaImage,
  FaFileAlt,
  FaEdit,
  FaTrash,
  FaFolder
} from 'react-icons/fa';

type PostWithDetails = {
  _id: string;
  title: string;
  author?: { name: string };
  createdAt: string | Date;
  published: boolean;
  category?: { name: string; _id?: string };
  excerpt?: string;
  image?: string;
  tags?: string[];
  content?: string;
};


export default function AdminDashboard() {
  const { data: session } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({ totalPosts: 0, totalUsers: 0, publishedPosts: 0 });
  const [posts, setPosts] = useState<PostWithDetails[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);
  const [activeTab, setActiveTab] = useState('overview');
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
  const [editingPost, setEditingPost] = useState<PostWithDetails | null>(null);


  useEffect(() => {
    if (session?.user?.role === 'admin') {
      fetchStats();
      fetchPosts();
      fetchCategories();
      fetchComments();
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
    } catch {
      console.error('Failed to fetch stats');
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/posts?limit=50');
      const data = await res.json();
      setPosts(data.posts || []);
    } catch {
      console.error('Failed to fetch posts');
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data.categories || []);
    } catch {
      console.error('Failed to fetch categories');
    }
  };

  const fetchComments = async () => {
    try {
      // Fetch all comments, maybe paginated or limited
      const res = await fetch('/api/comments?limit=100'); // Assuming we modify API to allow fetching all
      const data = await res.json();
      setComments(data.comments || []);
    } catch {
      console.error('Failed to fetch comments');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const isEditing = !!editingPost;
      const url = isEditing ? `/api/posts/${editingPost._id}` : '/api/posts';
      const method = isEditing ? 'PUT' : 'POST';

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
        fetchPosts();
        fetchStats();
      } else {
        setMessage(data.error || `Failed to ${isEditing ? 'update' : 'create'} blog post`);
      }
    } catch {
      setMessage('An error occurred while saving the blog post');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditPost = async (post: PostWithDetails) => {
    try {
      const response = await fetch(`/api/posts/${post._id}`);
      if (response.ok) {
        const fullPost = await response.json();
        setEditingPost(fullPost);
        setFormData({
          title: fullPost.title,
          content: fullPost.content,
          excerpt: fullPost.excerpt || '',
          image: fullPost.image || '',
          category: fullPost.category._id,
          tags: fullPost.tags?.join(', ') || '',
          published: fullPost.published,
        });
        setActiveTab('create');
      }
    } catch (error) {
      console.error('Failed to fetch post for editing:', error);
      setMessage('Failed to load post for editing');
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
    } catch {
      setMessage('An error occurred while deleting the post');
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;

    try {
      const response = await fetch(`/api/comments/${commentId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage('Comment deleted successfully!');
        fetchComments();
      } else {
        const data = await response.json();
        setMessage(data.error || 'Failed to delete comment');
      }
    } catch {
      setMessage('An error occurred while deleting the comment');
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <nav className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-950 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <h1 className="text-xl font-bold text-blue-950">
                  Admin Dashboard
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">
                Welcome, {session?.user?.name || session?.user?.email}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-950 text-white">
                Admin
              </span>
              <button
                onClick={() => router.push('/dashboard')}
                className="bg-blue-950 hover:bg-blue-900 text-white px-4 py-2 rounded-md text-sm font-medium transition-all duration-200"
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
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-950 rounded-lg flex items-center justify-center">
                  <FaBook className="text-white text-xl" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Posts</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalPosts}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-950 rounded-lg flex items-center justify-center">
                  <FaCheckCircle className="text-white text-xl" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Published</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.publishedPosts}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-950 rounded-lg flex items-center justify-center">
                  <FaUsers className="text-white text-xl" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-950 rounded-lg flex items-center justify-center">
                  <FaChartLine className="text-white text-xl" />
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
                  { id: 'comments', label: 'Manage Comments' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-blue-950 text-blue-950'
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
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-blue-950 rounded-full flex items-center justify-center mr-4">
                        <FaPlus className="text-white text-xl" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {editingPost ? 'Edit Blog Post' : 'Create New Blog Post'}
                      </h3>
                    </div>
                    {editingPost && (
                      <button
                        onClick={() => {
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
                        className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-sm font-medium"
                      >
                        Cancel Edit
                      </button>
                    )}
                  </div>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="group">
                        <label htmlFor="title" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                          <FaTag className="w-4 h-4 mr-2 text-blue-950" />
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
                          <FaFolder className="w-4 h-4 mr-2 text-blue-950" />
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
                        <FaFileAlt className="w-4 h-4 mr-2 text-blue-950" />
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
                      <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                        <FaImage className="w-4 h-4 mr-2 text-blue-950" />
                        Post Image
                      </label>
                      <CldUploadWidget
                        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "tech-blogs"}
                        onSuccess={(results) => {
                          if (results?.info && typeof results.info === 'object' && 'secure_url' in results.info) {
                            const info = results.info as { secure_url: string };
                            if (info.secure_url) {
                              setFormData(prev => ({
                                ...prev,
                                image: info.secure_url
                              }));
                            }
                          }
                        }}
                        onError={(error) => {
                          console.error('Upload error:', error);

                          // Provide more specific error messages
                          let errorMessage = 'Failed to upload image';

                          if (typeof error === 'object' && error !== null) {
                            const status = String(error.status);
                            if (status === '400') {
                              errorMessage = 'Invalid file format or file too large';
                            } else if (status === '401') {
                              errorMessage = 'Authentication failed. Please check your upload settings';
                            } else if (status === '413') {
                              errorMessage = 'File is too large. Please choose a smaller image';
                            } else if (status === '415') {
                              errorMessage = 'Unsupported file type. Please use JPG, PNG, or GIF';
                            } else if ('message' in error && error.message) {
                              errorMessage = `Upload failed: ${error.message}`;
                            }
                          } else if (typeof error === 'string') {
                            errorMessage = `Upload failed: ${error}`;
                          }

                          setMessage(errorMessage);
                        }}
                      >
                        {({ open }) => (
                          <div className="space-y-3">
                            <button
                              type="button"
                              onClick={() => open()}
                              className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-indigo-500 hover:text-indigo-500 transition-all duration-200 flex items-center justify-center"
                            >
                              <FaImage className="w-5 h-5 mr-2" />
                              {formData.image ? 'Change Image' : 'Upload Image'}
                            </button>
                            {formData.image && (
                              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                                <Image
                                  src={formData.image}
                                  alt="Preview"
                                  width={64}
                                  height={64}
                                  className="w-16 h-16 object-cover rounded"
                                />
                                <div className="flex-1">
                                  <p className="text-sm text-gray-700">Image uploaded successfully</p>
                                  <p className="text-xs text-gray-500 truncate">{formData.image}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </CldUploadWidget>
                    </div>

                    <div className="group">
                      <label htmlFor="content" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                        <FaFileAlt className="w-4 h-4 mr-2 text-blue-950" />
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
                          <FaTag className="w-4 h-4 mr-2 text-blue-950" />
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
                            <FaPlus className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                            Creating...
                          </>
                        ) : (
                          <>
                            <FaPlus className="w-5 h-5 mr-2" />
                            {editingPost ? 'Update Blog Post' : 'Create Blog Post'}
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
                            <button
                              onClick={() => handleEditPost(post)}
                              className="bg-blue-950 hover:bg-blue-900 text-white px-3 py-1 rounded text-sm flex items-center"
                            >
                              <FaEdit className="mr-1" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeletePost(post._id)}
                              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm flex items-center"
                            >
                              <FaTrash className="mr-1" />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'comments' && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Manage Comments</h3>
                  <div className="space-y-4">
                    {comments.map((comment: any) => (
                      <div key={comment._id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <p className="text-gray-900 mb-2">{comment.content}</p>
                            <div className="text-sm text-gray-600">
                              <span>By {comment.author?.name || 'Unknown'} • {new Date(comment.createdAt).toLocaleDateString()}</span>
                              {comment.post && (
                                <span className="ml-4">On post: {comment.post.title || 'Unknown Post'}</span>
                              )}
                            </div>
                            <div className="flex items-center mt-2 space-x-2">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                comment.approved ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                              }`}>
                                {comment.approved ? 'Approved' : 'Pending'}
                              </span>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleDeleteComment(comment._id)}
                              className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm flex items-center"
                            >
                              <FaTrash className="mr-1" />
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                    {comments.length === 0 && (
                      <p className="text-gray-500 text-center py-8">No comments found.</p>
                    )}
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