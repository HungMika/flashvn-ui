'use client';

import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import CustomCKEditor from '@/features/dashboard/Page/components/CustomCKEditor';
import { PostType } from '@/features/dashboard/Page/types/post';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_BASE_URL || '';

const AdminPosts = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<PostType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [postData, setPostData] = useState<Omit<PostType, '_id' | 'createdAt' | 'updatedAt'>>({
    title: '',
    content: '',
    category: 'educator',
    bool: false,
    eventDate: '',
    imageUrl: '',
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    let filtered = posts;
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((post) => post.category === selectedCategory);
    }
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredPosts(filtered);
  }, [selectedCategory, posts, searchTerm]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/posts`);
      setPosts(res.data);
    } catch (error) {
      console.error('Fetch posts error:', error);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    if (name === 'bool' && type === 'checkbox') {
      if (checked) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === editingId ? { ...post, bool: true } : { ...post, bool: false }
          )
        );
        setPostData((prev) => ({ ...prev, bool: true }));
      } else {
        setPostData((prev) => ({ ...prev, bool: false }));
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === editingId ? { ...post, bool: false } : post
          )
        );
      }
    } else if (name === 'eventDate') {
      setPostData((prev) => ({ ...prev, eventDate: value }));
    } else if (type === 'checkbox') {
      setPostData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setPostData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
      setPostData((prev) => ({ ...prev, imageUrl: '' }));
    }
  };

  const handleEdit = (post: PostType) => {
    setEditingId(post._id || null);
    setPostData({
      title: post.title,
      content: post.content,
      category: post.category,
      bool: post.bool,
      eventDate: post.eventDate ? new Date(post.eventDate).toISOString().substring(0, 10) : '',
      imageUrl: post.imageUrl || '',
    });
    setImageFile(null);
    setImagePreview(post.imageUrl || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setPostData({
      title: '',
      content: '',
      category: 'educator',
      bool: false,
      eventDate: '',
      imageUrl: '',
    });
    setImageFile(null);
    setImagePreview(null);
    setEditingId(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (imageFile) {
        const formData = new FormData();
        formData.append('title', postData.title);
        formData.append('content', postData.content);
        formData.append('category', postData.category);
        formData.append('bool', String(postData.bool));
        formData.append('eventDate', postData.eventDate);
        formData.append('image', imageFile);
        if (editingId) {
          await axios.put(`${BACKEND_URL}/posts/${editingId}`, formData);
        } else {
          await axios.post(`${BACKEND_URL}/posts`, formData);
        }
      } else {
        const payload = { ...postData };
        if (editingId) {
          await axios.put(`${BACKEND_URL}/posts/${editingId}`, payload);
        } else {
          await axios.post(`${BACKEND_URL}/posts`, payload);
        }
      }
      resetForm();
      fetchPosts();
    } catch (error) {
      console.error('Save post error:', error);
      alert('Error saving post. Please check console for details.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    setIsLoading(true);
    try {
      await axios.delete(`${BACKEND_URL}/posts/${id}`);
      fetchPosts();
    } catch (error) {
      console.error('Delete post error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="container mx-auto px-4 text-black py-8 max-w-6xl">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-800">Post Management</h1>
          <p className="text-gray-600 mt-1">Manage all posts in the system</p>
        </div>

        {/* Form Section */}
        <div className="p-6 bg-gray-50 border-b border-gray-200">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">{editingId ? 'Edit Post' : 'Create New Post'}</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="title">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={postData.title}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="content">
                  Content
                </label>
                <CustomCKEditor
                  data={postData.content}
                  onChange={(data) => setPostData((prev) => ({ ...prev, content: data }))}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="category">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={postData.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="educator">Educator</option>
                    <option value="youth">Youth</option>
                    <option value="digcomp">DigComp</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="eventDate">
                    Event Date (if applicable)
                  </label>
                  <input
                    type="date"
                    id="eventDate"
                    name="eventDate"
                    value={postData.eventDate}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="bool"
                  name="bool"
                  checked={postData.bool}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="bool" className="ml-2 block text-sm text-gray-700">
                  Featured Post
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="image">
                  Featured Image
                </label>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
                {imagePreview && (
                  <div className="mt-2">
                    <img
                      src={imagePreview.startsWith('blob:') ? imagePreview : `${imagePreview}`}
                      alt="Preview"
                      className="max-w-xs h-auto rounded border border-gray-200"
                    />
                  </div>
                )}
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      {editingId ? 'Updating...' : 'Creating...'}
                    </span>
                  ) : editingId ? (
                    'Update Post'
                  ) : (
                    'Create Post'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

        {/* Posts List Section */}
        <div className="p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-xl font-semibold text-gray-800">All Posts</h2>
            <div className="flex items-center space-x-2">
              <label htmlFor="category-filter" className="text-sm font-medium text-gray-700">
                Filter by:
              </label>
              <select
                id="category-filter"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
                <option value="all">All Categories</option>
                <option value="educator">Educator</option>
                <option value="youth">Youth</option>
                <option value="digcomp">DigComp</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {isLoading && filteredPosts.length === 0 ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No posts</h3>
              <p className="mt-1 text-sm text-gray-500">
                {selectedCategory === 'all'
                  ? 'Get started by creating a new post.'
                  : `No posts found in the ${selectedCategory} category.`}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Event Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Featured
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Image
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPosts.map((post) => (
                    <tr key={post._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{post.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800 capitalize">
                          {post.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {post.eventDate ? new Date(post.eventDate).toLocaleDateString() : '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        {post.bool ? (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Yes
                          </span>
                        ) : (
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                            No
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {post.imageUrl && (
                          <img
                            src={`${post.imageUrl}`}
                            alt="Thumbnail"
                            className="w-16 h-auto rounded border border-gray-200"
                          />
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-4">
                          <button onClick={() => handleEdit(post)} className="text-blue-600 hover:text-blue-900">
                            Edit
                          </button>
                          <button onClick={() => handleDelete(post._id!)} className="text-red-600 hover:text-red-900">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPosts;
