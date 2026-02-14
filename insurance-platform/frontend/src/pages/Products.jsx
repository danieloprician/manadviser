import { useTranslation } from 'react-i18next';
import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faHome, faHeart, faBriefcaseMedical, faPlaneUp, faBriefcase, faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import RCAForm from '../components/RCAForm';
import api from '../services/api';

const categoryIcons = {
  1: faCar,
  2: faHome,
  3: faHeart,
  4: faBriefcaseMedical,
  5: faPlaneUp,
  6: faBriefcase
};

export default function Products() {
  const { t, i18n } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || null);
  const [loading, setLoading] = useState(true);
  const [expandedPolicy, setExpandedPolicy] = useState(null);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [showQuoteForm, setShowQuoteForm] = useState(false);
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
  const formRef = useRef(null);

  const categoryMap = {
    'auto': 1,
    'home': 2,
    'life': 3,
    'health': 4,
    'travel': 5,
    'business': 6,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, policiesRes] = await Promise.all([
          axios.get('/api/categories'),
          axios.get('/api/policies'),
        ]);
        setCategories(categoriesRes.data);
        setPolicies(policiesRes.data);
      } catch (error) {
        console.log('Using mock data');
        // Mock data
        setCategories([
          { id: 1, name_Ro: 'Asigurări Auto', name_En: 'Auto Insurance', order: 1 },
          { id: 2, name_Ro: 'Locuință', name_En: 'Home Insurance', order: 2 },
          { id: 3, name_Ro: 'Viață', name_En: 'Life Insurance', order: 3 },
          { id: 4, name_Ro: 'Sănătate', name_En: 'Health Insurance', order: 4 },
          { id: 5, name_Ro: 'Călători', name_En: 'Travel Insurance', order: 5 },
          { id: 6, name_Ro: 'Afaceri', name_En: 'Business Insurance', order: 6 },
        ]);
        setPolicies([
          { id: 1, name: 'Casco Complet', categoryId: 1, basePrice: 500, coverage: 'Acoperire completă', isActive: true },
          { id: 2, name: 'RCA Standard', categoryId: 1, basePrice: 300, coverage: 'Răspundere civila', isActive: true },
          { id: 3, name: 'Asigurare Locuință', categoryId: 2, basePrice: 400, coverage: 'Incendiu și furt', isActive: true },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredPolicies = selectedCategory 
    ? policies.filter(p => p.categoryId === parseInt(selectedCategory))
    : policies;

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId.toString());
    setSearchParams({ category: Object.keys(categoryMap)[categoryId - 1] });
  };

  const handleRequestQuote = (policy) => {
    setSelectedPolicy(policy);
    setShowQuoteForm(true);
    setSubmitMessage({ type: '', text: '' });
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      age: '',
      address: '',
      additionalInfo: ''
    });
    
    // Scroll la formular după un delay scurt pentru a permite rendering-ul
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleCancelQuote = () => {
    setShowQuoteForm(false);
    setSelectedPolicy(null);
    setSubmitMessage({ type: '', text: '' });
  };

  const handleRCAFormSuccess = () => {
    setShowQuoteForm(false);
    setSelectedPolicy(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitQuote = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitMessage({ type: '', text: '' });

    try {
      const quoteData = {
        email: formData.email,
        policyId: selectedPolicy.id,
        personalData: {
          fullName: formData.fullName,
          phone: formData.phone,
          age: formData.age,
          address: formData.address,
          additionalInfo: formData.additionalInfo,
          policyName: selectedPolicy.name
        }
      };

      await api.post('/quotes', quoteData);
      
      setSubmitMessage({ 
        type: 'success', 
        text: t('products.quoteForm.success') 
      });

      // Reset form after 2 seconds
      setTimeout(() => {
        handleCancelQuote();
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

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-accent text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">{t('products.title')}</h1>
          <p className="text-lg opacity-90">{t('products.subtitle')}</p>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Category Filter */}
          {!loading && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">{t('products.filterByCategory')}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`p-4 rounded-lg transition ${
                      selectedCategory === cat.id.toString()
                        ? 'bg-primary text-white'
                        : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-primary'
                    }`}
                  >
                    <div className="text-3xl mb-2"><FontAwesomeIcon icon={categoryIcons[cat.id]} /></div>
                    <p className="text-sm font-bold">{i18n.language === 'ro' ? cat.name_Ro : cat.name_En}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Policies Grid */}
          {!loading && (
            <div>
              <h3 className="text-2xl font-bold mb-6">
                {t(filteredPolicies.length === 1 ? 'products.availableSingular' : 'products.available', { count: filteredPolicies.length })}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPolicies.map((policy) => (
                  <div key={policy.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
                    <h3 className="text-xl font-bold text-primary mb-2">{policy.name}</h3>
                    <p className="text-gray-600 mb-4">{policy.coverage}</p>
                    <p className="text-2xl font-bold text-primary mb-6">{policy.basePrice} {t('products.perYear')}</p>
                    
                    {/* Expandable Details */}
                    <button
                      onClick={() => setExpandedPolicy(expandedPolicy === policy.id ? null : policy.id)}
                      className="w-full text-primary font-bold mb-4 hover:underline"
                    >
                      <FontAwesomeIcon icon={expandedPolicy === policy.id ? faChevronDown : faChevronRight} className="mr-2" />
                      {t('products.details')}
                    </button>
                    
                    {expandedPolicy === policy.id && (
                      <div className="bg-gray-50 p-4 rounded mb-4 text-sm text-gray-700 border-l-4 border-primary">
                        <p>{t('products.detailsExtended')}</p>
                      </div>
                    )}

                    <button 
                      onClick={() => handleRequestQuote(policy)}
                      className="w-full bg-primary text-white py-2 rounded font-bold hover:bg-blue-700 transition"
                    >
                      {t('products.requestQuote')}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {loading && (
            <div className="text-center">
              <div className="spinner mx-auto"></div>
              <p className="mt-4 text-gray-600">{t('products.loading')}</p>
            </div>
          )}
        </div>
      </section>

      {/* Quote Form Section - Hidden until a product is selected */}
      {showQuoteForm && selectedPolicy && (
        <section ref={formRef} className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4">
            {selectedPolicy.categoryId === 1 ? (
              // RCA Form pentru produse auto
              <RCAForm 
                selectedPolicy={selectedPolicy}
                onSuccess={handleRCAFormSuccess}
                onCancel={handleCancelQuote}
              />
            ) : (
              // Formular generic pentru alte produse
              <div className="bg-white rounded-lg shadow-lg p-8">
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-primary mb-2">
                    {t('products.quoteForm.title')}
                  </h2>
                  <p className="text-gray-600">{t('products.quoteForm.formDescription')}</p>
                </div>

                <form onSubmit={handleSubmitQuote}>
                  <div className="space-y-6">
                    {/* Insurance Type - Read Only */}
                    <div>
                      <label className="block text-gray-700 font-bold mb-2">
                        {t('products.quoteForm.insuranceType')} *
                      </label>
                      <input
                        type="text"
                        name="insuranceType"
                        value={selectedPolicy.name}
                        readOnly
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 font-semibold cursor-not-allowed"
                      />
                      <div className="mt-2 text-sm text-gray-600">
                        <p><strong>{t('products.coverageLabel')}</strong> {selectedPolicy.coverage}</p>
                        <p><strong>{t('products.basePriceLabel')}</strong> {selectedPolicy.basePrice} {t('products.perYear')}</p>
                      </div>
                    </div>

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
                        onClick={handleCancelQuote}
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
                        {submitting ? t('products.quoteForm.submitting') : t('products.quoteForm.submit')}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}