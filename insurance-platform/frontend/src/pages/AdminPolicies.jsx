import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function AdminPolicies() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [policies, setPolicies] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description_Ro: '',
    description_En: '',
    basePrice: '',
    coverage: '',
    categoryId: '',
    details_Ro: '',
    details_En: ''
  });

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  };

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/admin/login');
      return;
    }
    loadData();
  }, [navigate]);

  const loadData = async () => {
    try {
      const [policiesRes, categoriesRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/policies`, config),
        axios.get(`${import.meta.env.VITE_API_URL}/categories`, config)
      ]);

      setPolicies(policiesRes.data.value || []);
      setCategories(categoriesRes.data.value || []);
    } catch (error) {
      toast.error('Error loading data');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/policies/${editingId}`,
          { ...formData, basePrice: parseFloat(formData.basePrice) },
          config
        );
        toast.success('Policy updated successfully');
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/policies`,
          { ...formData, basePrice: parseFloat(formData.basePrice) },
          config
        );
        toast.success('Policy created successfully');
      }

      setFormData({
        name: '',
        type: '',
        description_Ro: '',
        description_En: '',
        basePrice: '',
        coverage: '',
        categoryId: '',
        details_Ro: '',
        details_En: ''
      });
      setEditingId(null);
      setShowForm(false);
      loadData();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error saving policy');
    }
  };

  const handleEdit = (policy) => {
    setFormData(policy);
    setEditingId(policy.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/policies/${id}`, config);
      toast.success('Policy deleted successfully');
      loadData();
    } catch (error) {
      toast.error('Error deleting policy');
    }
  };

  const getCategoryName = (id) => {
    const cat = categories.find(c => c.id === id);
    return cat ? cat.name_Ro : 'Unknown';
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">{t('admin.policies')}</h1>
          <div className="space-x-4">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              ← Back
            </button>
            <button
              onClick={() => {
                setShowForm(!showForm);
                setEditingId(null);
              }}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-blue-700"
            >
              {showForm ? 'Cancel' : '+ New Policy'}
            </button>
          </div>
        </div>

        {showForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">
              {editingId ? 'Edit Policy' : 'New Policy'}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Policy Name"
                value={formData.name}
                onChange={handleChange}
                required
                className="col-span-1 px-4 py-2 border rounded focus:outline-none focus:border-primary"
              />
              <input
                type="text"
                name="type"
                placeholder="Type"
                value={formData.type}
                onChange={handleChange}
                className="px-4 py-2 border rounded focus:outline-none focus:border-primary"
              />
              <textarea
                name="description_Ro"
                placeholder="Description (RO)"
                value={formData.description_Ro}
                onChange={handleChange}
                className="px-4 py-2 border rounded focus:outline-none focus:border-primary"
              />
              <textarea
                name="description_En"
                placeholder="Description (EN)"
                value={formData.description_En}
                onChange={handleChange}
                className="px-4 py-2 border rounded focus:outline-none focus:border-primary"
              />
              <input
                type="number"
                step="0.01"
                name="basePrice"
                placeholder="Base Price"
                value={formData.basePrice}
                onChange={handleChange}
                required
                className="px-4 py-2 border rounded focus:outline-none focus:border-primary"
              />
              <input
                type="text"
                name="coverage"
                placeholder="Coverage"
                value={formData.coverage}
                onChange={handleChange}
                className="px-4 py-2 border rounded focus:outline-none focus:border-primary"
              />
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                required
                className="px-4 py-2 border rounded focus:outline-none focus:border-primary"
              >
                <option value="">Select Category</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name_Ro}
                  </option>
                ))}
              </select>
              <textarea
                name="details_Ro"
                placeholder="Details (RO)"
                value={formData.details_Ro}
                onChange={handleChange}
                className="md:col-span-2 px-4 py-2 border rounded focus:outline-none focus:border-primary"
              />
              <textarea
                name="details_En"
                placeholder="Details (EN)"
                value={formData.details_En}
                onChange={handleChange}
                className="md:col-span-2 px-4 py-2 border rounded focus:outline-none focus:border-primary"
              />
              <button
                type="submit"
                className="md:col-span-2 px-4 py-2 bg-success text-white rounded hover:bg-green-600"
              >
                {editingId ? 'Update' : 'Create'} Policy
              </button>
            </form>
          </div>
        )}

        {/* Policies Table */}
        <div className="bg-white rounded-lg shadow-md overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Category</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Coverage</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {policies.map(policy => (
                <tr key={policy.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{policy.id}</td>
                  <td className="px-4 py-3 font-medium">{policy.name}</td>
                  <td className="px-4 py-3">{getCategoryName(policy.categoryId)}</td>
                  <td className="px-4 py-3">₹{policy.basePrice}</td>
                  <td className="px-4 py-3 text-sm">{policy.coverage}</td>
                  <td className="px-4 py-3 text-center space-x-2">
                    <button
                      onClick={() => handleEdit(policy)}
                      className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(policy.id)}
                      className="px-3 py-1 bg-danger text-white rounded hover:bg-red-700 text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
