import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function AdminCategories() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name_Ro: '',
    name_En: '',
    description_Ro: '',
    description_En: '',
    icon: '',
    order: ''
  });

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  };

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/admin/login');
      return;
    }
    loadCategories();
  }, [navigate]);

  const loadCategories = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/categories`, config);
      setCategories(res.data.value || []);
    } catch (error) {
      toast.error('Error loading categories');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (category) => {
    setFormData(category);
    setEditingId(category.id);
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Categories are typically read-only in this system
    toast.info('Categories are pre-defined in this system');
    setShowForm(false);
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">{t('admin.categories')}</h1>
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            ← Back
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(category => (
            <div
              key={category.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
            >
              <div className="text-5xl mb-4">{category.icon}</div>
              <h3 className="text-xl font-bold text-gray-800">{category.name_Ro}</h3>
              <p className="text-sm text-gray-600 mb-2">{category.name_En}</p>
              <p className="text-sm text-gray-700 mb-4">{category.description_Ro}</p>
              <div className="flex justify-between items-center pt-4 border-t">
                <span className="text-xs text-gray-500">ID: {category.id}</span>
                <button
                  onClick={() => handleEdit(category)}
                  className="px-3 py-1 bg-primary text-white rounded hover:bg-blue-700 text-sm"
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Detail Modal (read-only) */}
        {showForm && editingId && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-8 max-w-md w-full">
              <h2 className="text-2xl font-bold mb-6">Category Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Name (RO)</label>
                  <p className="px-4 py-2 bg-gray-100 rounded">{formData.name_Ro}</p>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Name (EN)</label>
                  <p className="px-4 py-2 bg-gray-100 rounded">{formData.name_En}</p>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Description (RO)</label>
                  <p className="px-4 py-2 bg-gray-100 rounded text-sm">{formData.description_Ro}</p>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Description (EN)</label>
                  <p className="px-4 py-2 bg-gray-100 rounded text-sm">{formData.description_En}</p>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Icon</label>
                  <p className="text-5xl">{formData.icon}</p>
                </div>
                <button
                  onClick={() => setShowForm(false)}
                  className="w-full px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
