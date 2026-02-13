import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function AdminContacts() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [filter, setFilter] = useState('all'); // all, unread, read

  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  };

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/admin/login');
      return;
    }
    loadContacts();
  }, [navigate]);

  const loadContacts = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/contacts`, config);
      setContacts(res.data.value || []);
    } catch (error) {
      toast.error('Error loading contacts');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/contacts/${id}/read`,
        {},
        config
      );
      loadContacts();
      toast.success('Marked as read');
    } catch (error) {
      toast.error('Error updating contact');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this contact permanently?')) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/contacts/${id}`, config);
      toast.success('Contact deleted');
      setSelectedContact(null);
      loadContacts();
    } catch (error) {
      toast.error('Error deleting contact');
    }
  };

  const filteredContacts = contacts.filter(contact => {
    if (filter === 'unread') return !contact.isRead;
    if (filter === 'read') return contact.isRead;
    return true;
  });

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">{t('admin.contacts')}</h1>
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            ← Back
          </button>
        </div>

        {/* Filter */}
        <div className="mb-6 flex gap-4">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded ${filter === 'all' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}
          >
            All ({contacts.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-4 py-2 rounded ${filter === 'unread' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}
          >
            Unread ({contacts.filter(c => !c.isRead).length})
          </button>
          <button
            onClick={() => setFilter('read')}
            className={`px-4 py-2 rounded ${filter === 'read' ? 'bg-primary text-white' : 'bg-white text-gray-700'}`}
          >
            Read ({contacts.filter(c => c.isRead).length})
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contacts List */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md overflow-hidden">
            <div className="max-h-96 overflow-y-auto">
              {filteredContacts.length === 0 ? (
                <div className="p-8 text-center text-gray-500">No contacts found</div>
              ) : (
                filteredContacts.map(contact => (
                  <div
                    key={contact.id}
                    onClick={() => setSelectedContact(contact)}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition ${
                      !contact.isRead ? 'bg-blue-50 border-l-4 border-l-primary' : ''
                    } ${selectedContact?.id === contact.id ? 'bg-blue-100' : ''}`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">{contact.fullName}</p>
                        <p className="text-sm text-gray-600">{contact.subject}</p>
                        <p className="text-xs text-gray-500">{contact.email}</p>
                      </div>
                      {!contact.isRead && (
                        <span className="inline-block w-3 h-3 bg-primary rounded-full"></span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Contact Details */}
          {selectedContact ? (
            <div className="bg-white rounded-lg shadow-md p-6 h-fit">
              <h2 className="text-xl font-bold mb-4">Contact Details</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600 text-sm">From</p>
                  <p className="font-semibold">{selectedContact.fullName}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Email</p>
                  <a
                    href={`mailto:${selectedContact.email}`}
                    className="text-primary hover:underline"
                  >
                    {selectedContact.email}
                  </a>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Phone</p>
                  <a href={`tel:${selectedContact.phone}`} className="text-primary hover:underline">
                    {selectedContact.phone}
                  </a>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Subject</p>
                  <p className="font-semibold">{selectedContact.subject}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Date</p>
                  <p className="text-sm">
                    {new Date(selectedContact.createdAt).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-2">Message</p>
                  <p className="text-gray-700 whitespace-pre-wrap text-sm">
                    {selectedContact.message}
                  </p>
                </div>
                <div className="pt-4 space-y-2">
                  {!selectedContact.isRead && (
                    <button
                      onClick={() => markAsRead(selectedContact.id)}
                      className="w-full px-4 py-2 bg-success text-white rounded hover:bg-green-600"
                    >
                      Mark as Read
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(selectedContact.id)}
                    className="w-full px-4 py-2 bg-danger text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6 h-fit text-center text-gray-500">
              Select a contact to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
