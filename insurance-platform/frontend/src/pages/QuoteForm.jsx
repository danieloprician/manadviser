import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import api from '../services/api';
import axios from 'axios';

export default function QuoteForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const policyId = searchParams.get('policy');
  
  const [policy, setPolicy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    age: '',
    address: '',
    additionalInfo: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const fetchPolicy = async () => {
      if (!policyId) {
        navigate('/products');
        return;
      }

      try {
        const response = await axios.get(`/api/policies/${policyId}`);
        setPolicy(response.data);
      } catch (error) {
        console.log('Using mock data for policy');
        // Mock data fallback
        const mockPolicies = [
          { id: 1, name: 'Casco Complet', categoryId: 1, basePrice: 500, coverage: 'Acoperire completă', isActive: true },
          { id: 2, name: 'RCA Standard', categoryId: 1, basePrice: 300, coverage: 'Răspundere civilă', isActive: true },
          { id: 3, name: 'Asigurare Locuință', categoryId: 2, basePrice: 400, coverage: 'Incendiu și furt', isActive: true },
        ];
        const foundPolicy = mockPolicies.find(p => p.id === parseInt(policyId));
        if (foundPolicy) {
          setPolicy(foundPolicy);
        } else {
          navigate('/products');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPolicy();
  }, [policyId, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitMessage({ type: '', text: '' });

    try {
      const quoteData = {
        email: formData.email,
        policyId: parseInt(policyId),
        personalData: {
          fullName: formData.fullName,
          phone: formData.phone,
          age: formData.age,
          address: formData.address,
          additionalInfo: formData.additionalInfo,
          policyName: policy.name
        }
      };

      await api.post('/quotes', quoteData);
      
      setSubmitMessage({ 
        type: 'success', 
        text: t('products.quoteForm.success') 
      });

      // Redirect to products page after 2 seconds
      setTimeout(() => {
        navigate('/products');
      }, 2000);
    } catch (error) {
      console.error('Error submitting quote:', error);
      setSubmitMessage({ 
        type: 'error', 
        text: t('products.quoteForm.error') 
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto"></div>
          <p className="mt-4 text-gray-600">Se încarcă...</p>
        </div>
      </div>
    );
  }

  if (!policy) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-accent text-white py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">
            {t('products.quoteForm.title')} {policy.name}
          </h1>
          <p className="text-lg opacity-90">{policy.coverage}</p>
          <p className="text-2xl font-bold mt-4">{policy.basePrice} RON/an</p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Full Name */}
                <div>
                  <label className="block text-gray-700 font-bold mb-2">
                    {t('products.quoteForm.fullName')} *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder={t('products.quoteForm.fullName')}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-gray-700 font-bold mb-2">
                    {t('products.quoteForm.email')} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="exemplu@email.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-gray-700 font-bold mb-2">
                    {t('products.quoteForm.phone')} *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="+40 XXX XXX XXX"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Age */}
                  <div>
                    <label className="block text-gray-700 font-bold mb-2">
                      {t('products.quoteForm.age')}
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleInputChange}
                      min="18"
                      max="100"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="25"
                    />
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-gray-700 font-bold mb-2">
                      {t('products.quoteForm.address')}
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder={t('products.quoteForm.address')}
                    />
                  </div>
                </div>

                {/* Additional Info */}
                <div>
                  <label className="block text-gray-700 font-bold mb-2">
                    {t('products.quoteForm.additionalInfo')}
                  </label>
                  <textarea
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleInputChange}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    placeholder={t('products.quoteForm.additionalInfo')}
                  />
                </div>

                {/* Submit Message */}
                {submitMessage.text && (
                  <div className={`p-4 rounded-lg ${
                    submitMessage.type === 'success' 
                      ? 'bg-green-100 text-green-700 border border-green-300' 
                      : 'bg-red-100 text-red-700 border border-red-300'
                  }`}>
                    {submitMessage.text}
                  </div>
                )}

                {/* Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => navigate('/products')}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-300 transition"
                    disabled={submitting}
                  >
                    {t('products.quoteForm.cancel')}
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-primary text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={submitting}
                  >
                    {submitting ? 'Se trimite...' : t('products.quoteForm.submit')}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
