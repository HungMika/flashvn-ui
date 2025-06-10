'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Social {
  _id?: string;
  title: string;
  link: string;
  imageUrl?: string;
}

export default function SocialManager() {
  const [socials, setSocials] = useState<Social[]>([]);
  const [form, setForm] = useState<Social>({ title: '', link: '', imageUrl: '' });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const api = axios.create({
    baseURL: 'http://localhost:5000/api',
  });

  const fetchSocials = async () => {
    setIsLoading(true);
    try {
      const res = await api.get('/socials');
      setSocials(res.data);
    } catch (error) {
      console.error('Error fetching socials:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSocials();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('link', form.link);
      if (imageFile) formData.append('image', imageFile);

      if (editingId) {
        await api.put(`/socials/${editingId}`, formData);
      } else {
        await api.post('/socials', formData);
      }

      resetForm();
      await fetchSocials();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setForm({ title: '', link: '', imageUrl: '' });
    setImageFile(null);
    setEditingId(null);
  };

  const handleEdit = (social: Social) => {
    setForm({ title: social.title, link: social.link, imageUrl: social.imageUrl || '' });
    setEditingId(social._id || null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this social link?')) {
      setIsLoading(true);
      try {
        await api.delete(`/socials/${id}`);
        await fetchSocials();
      } catch (error) {
        console.error('Error deleting social:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Social Links Manager
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            Manage your social media links and icons
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white shadow-xl rounded-lg p-6 mb-10 transition-all duration-300 hover:shadow-2xl">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            {editingId ? 'Edit Social Link' : 'Add New Social Link'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Platform Name
              </label>
              <input
                type="text"
                id="title"
                placeholder="e.g. Facebook, Twitter"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              />
            </div>
            
            <div>
              <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-1">
                Profile URL
              </label>
              <input
                type="url"
                id="link"
                placeholder="https://example.com/yourprofile"
                value={form.link}
                onChange={(e) => setForm({ ...form, link: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              />
            </div>
            
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                Custom Icon (optional)
              </label>
              <div className="flex items-center space-x-4">
                <label className="flex flex-col items-center px-4 py-3 bg-white rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50 transition-colors">
                  <span className="text-sm text-gray-600">
                    {imageFile ? imageFile.name : 'Choose an image...'}
                  </span>
                  <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    className="hidden"
                  />
                </label>
                {form.imageUrl && !imageFile && (
                  <img src={form.imageUrl} alt="Current icon" className="h-12 w-12 rounded-md object-cover" />
                )}
              </div>
            </div>
            
            <div className="flex space-x-4 pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className={`px-6 py-3 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {editingId ? 'Updating...' : 'Adding...'}
                  </span>
                ) : (
                  editingId ? 'Update Link' : 'Add Link'
                )}
              </button>
              
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={isLoading}
                  className="px-6 py-3 rounded-lg font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Social Links List */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Social Links</h2>
          
          {isLoading && !socials.length ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : socials.length === 0 ? (
            <div className="bg-white shadow rounded-lg p-8 text-center">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <h3 className="mt-2 text-lg font-medium text-gray-900">No social links yet</h3>
              <p className="mt-1 text-gray-500">Get started by adding your first social link above.</p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2">
              {socials.map((item) => (
                <div key={item._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="p-6">
                    <div className="flex items-start">
                      {item.imageUrl && (
                        <div className="flex-shrink-0 mr-4">
                          <img src={item.imageUrl} alt={item.title} className="h-12 w-12 rounded-md object-cover" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 truncate">{item.title}</h3>
                        <a 
                          href={item.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm truncate block"
                        >
                          {item.link}
                        </a>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex space-x-3">
                      <button
                        onClick={() => handleEdit(item)}
                        className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                      >
                        <svg className="-ml-0.5 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item._id!)}
                        className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                      >
                        <svg className="-ml-0.5 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}