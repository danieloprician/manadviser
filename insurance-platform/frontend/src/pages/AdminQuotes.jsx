import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function AdminQuotes() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [quotes, setQuotes] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

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
      const [quotesRes, policiesRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/quotes`, config),
        axios.get(`${import.meta.env.VITE_API_URL}/policies`, config)
      ]);

      setQuotes(quotesRes.data.value || []);
      setPolicies(policiesRes.data.value || []);
    } catch (error) {
      toast.error('Error loading data');
    } finally {
      setLoading(false);
    }
  };

  const updateQuoteStatus = async (id, newStatus) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/quotes/${id}/status`,
        { status: newStatus },
        config
      );
      toast.success(`Quote marked as ${newStatus}`);
      loadData();
      setSelectedQuote(null);
    } catch (error) {
      toast.error('Error updating quote');
    }
  };

  const getPolicyName = (id) => {
    const policy = policies.find(p => p.id === id);
    return policy ? policy.name : `Policy #${id}`;
  };

  const filteredQuotes = quotes.filter(quote => {
    if (filterStatus === 'all') return true;
    return quote.status?.toLowerCase() === filterStatus.toLowerCase();
  });

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  const stats = {
    total: quotes.length,
    pending: quotes.filter(q => q.status === 'Pending').length,
    accepted: quotes.filter(q => q.status === 'Accepted').length,
    rejected: quotes.filter(q => q.status === 'Rejected').length
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">{t('admin.quotes')}</h1>
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            ← Back
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-4 shadow-md">
            <p className="text-gray-600 text-sm">Total</p>
            <p className="text-3xl font-bold text-primary">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md">
            <p className="text-gray-600 text-sm">Pending</p>
            <p className="text-3xl font-bold text-warning">{stats.pending}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md">
            <p className="text-gray-600 text-sm">Accepted</p>
            <p className="text-3xl font-bold text-success">{stats.accepted}</p>
          </div>
          <div className="bg-white rounded-lg p-4 shadow-md">
            <p className="text-gray-600 text-sm">Rejected</p>
            <p className="text-3xl font-bold text-danger">{stats.rejected}</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-6 flex gap-4">
          {['all', 'Pending', 'Accepted', 'Rejected'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded transition ${
                filterStatus === status
                  ? 'bg-primary text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quotes List */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="max-h-96 overflow-y-auto">
              {filteredQuotes.length === 0 ? (
                <div className="p-8 text-center text-gray-500">No quotes found</div>
              ) : (
                filteredQuotes.map(quote => (
                  <div
                    key={quote.id}
                    onClick={() => setSelectedQuote(quote)}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition ${
                      selectedQuote?.id === quote.id ? 'bg-blue-100' : ''
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">{quote.email}</p>
                        <p className="text-sm text-gray-600">{getPolicyName(quote.policyId)}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(quote.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-primary">₹{quote.calculatedPrice?.toFixed(2)}</p>
                        <span
                          className={`inline-block px-2 py-1 rounded text-xs font-semibold ${
                            quote.status === 'Pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : quote.status === 'Accepted'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {quote.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quote Details */}
          {selectedQuote ? (
            <div className="bg-white rounded-lg shadow-md p-6 h-fit">
              <h2 className="text-xl font-bold mb-4">Quote Details</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600 text-sm">Quote ID</p>
                  <p className="font-semibold">#{selectedQuote.id}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Email</p>
                  <a
                    href={`mailto:${selectedQuote.email}`}
                    className="text-primary hover:underline"
                  >
                    {selectedQuote.email}
                  </a>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Policy</p>
                  <p className="font-semibold">{getPolicyName(selectedQuote.policyId)}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Date Submitted</p>
                  <p className="text-sm">
                    {new Date(selectedQuote.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="border-t pt-4">
                  <p className="text-gray-600 text-sm mb-2">Price Breakdown</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Base Price:</span>
                      <span className="font-semibold">₹{selectedQuote.calculatedPrice?.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 p-3 rounded">
                  <p className="text-gray-600 text-sm mb-1">Status</p>
                  <p className="font-semibold text-lg">{selectedQuote.status}</p>
                </div>
                {selectedQuote.status === 'Pending' && (
                  <div className="space-y-2 pt-4">
                    <button
                      onClick={() => updateQuoteStatus(selectedQuote.id, 'Accepted')}
                      className="w-full px-4 py-2 bg-success text-white rounded hover:bg-green-600"
                    >
                      Accept Quote
                    </button>
                    <button
                      onClick={() => updateQuoteStatus(selectedQuote.id, 'Rejected')}
                      className="w-full px-4 py-2 bg-danger text-white rounded hover:bg-red-700"
                    >
                      Reject Quote
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6 h-fit text-center text-gray-500">
              Select a quote to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
