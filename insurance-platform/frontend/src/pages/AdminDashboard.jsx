import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ categories: 0, policies: 0, quotes: 0, contacts: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!storedUser || !token) {
      navigate('/admin/login');
      return;
    }

    setUser(JSON.parse(storedUser));
    loadStats();
  }, [navigate]);

  const loadStats = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      };

      const [catRes, polRes, quotRes, conRes] = await Promise.allSettled([
        axios.get(`${import.meta.env.VITE_API_URL}/categories`, config),
        axios.get(`${import.meta.env.VITE_API_URL}/policies`, config),
        axios.get(`${import.meta.env.VITE_API_URL}/quotes`, config),
        axios.get(`${import.meta.env.VITE_API_URL}/contacts`, config)
      ]);

      setStats({
        categories: catRes.status === 'fulfilled' ? catRes.value.data.value?.length || 0 : 0,
        policies: polRes.status === 'fulfilled' ? polRes.value.data.value?.length || 0 : 0,
        quotes: quotRes.status === 'fulfilled' ? quotRes.value.data.value?.length || 0 : 0,
        contacts: conRes.status === 'fulfilled' ? conRes.value.data.value?.length || 0 : 0
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success(t('admin.logoutSuccess'));
    navigate('/admin/login');
  };

  if (!user) return <div className="flex items-center justify-center min-h-screen">Loading...</div>;

  const statCards = [
    { label: t('admin.categories'), value: stats.categories, icon: '📂', path: '/admin/categories' },
    { label: t('admin.policies'), value: stats.policies, icon: '📋', path: '/admin/policies' },
    { label: t('admin.quotes'), value: stats.quotes, icon: '💰', path: '/admin/quotes' },
    { label: t('admin.contacts'), value: stats.contacts, icon: '📧', path: '/admin/contacts' }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-primary text-white p-6 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">{t('admin.dashboard')}</h1>
            <p className="text-accent">Welcome, {user.firstName} {user.lastName}</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-white text-primary px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            {t('admin.logout')}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-12">Loading statistics...</div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statCards.map((card, idx) => (
                <div
                  key={idx}
                  onClick={() => navigate(card.path)}
                  className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition"
                >
                  <div className="text-4xl mb-2">{card.icon}</div>
                  <p className="text-gray-600 text-sm">{card.label}</p>
                  <p className="text-3xl font-bold text-primary">{card.value}</p>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">{t('admin.quickActions')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button
                  onClick={() => navigate('/admin/policies')}
                  className="bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition"
                >
                  ➕ {t('admin.newPolicy')}
                </button>
                <button
                  onClick={() => navigate('/admin/contacts')}
                  className="bg-success text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
                >
                  📧 {t('admin.viewContacts')}
                </button>
                <button
                  onClick={() => navigate('/admin/quotes')}
                  className="bg-warning text-white py-2 px-4 rounded-lg hover:bg-yellow-600 transition"
                >
                  💰 {t('admin.viewQuotes')}
                </button>
                <button
                  onClick={loadStats}
                  className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition"
                >
                  🔄 {t('admin.refresh')}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
