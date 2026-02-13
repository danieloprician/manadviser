import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

export default function Products() {
  const { t, i18n } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [categories, setCategories] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || null);
  const [loading, setLoading] = useState(true);
  const [expandedPolicy, setExpandedPolicy] = useState(null);

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
          { id: 1, name_Ro: 'Asigurări Auto', name_En: 'Auto Insurance', icon: '🚗', order: 1 },
          { id: 2, name_Ro: 'Locuință', name_En: 'Home Insurance', icon: '🏠', order: 2 },
          { id: 3, name_Ro: 'Viață', name_En: 'Life Insurance', icon: '❤️', order: 3 },
          { id: 4, name_Ro: 'Sănătate', name_En: 'Health Insurance', icon: '⚕️', order: 4 },
          { id: 5, name_Ro: 'Călători', name_En: 'Travel Insurance', icon: '✈️', order: 5 },
          { id: 6, name_Ro: 'Afaceri', name_En: 'Business Insurance', icon: '💼', order: 6 },
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

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-accent text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">{t('products.title')}</h1>
          <p className="text-lg opacity-90">Găsește polita perfectă pentru nevoile tale</p>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          {/* Category Filter */}
          {!loading && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Filtrează după categorie</h2>
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
                    <div className="text-3xl mb-2">{cat.icon}</div>
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
                Disponibile: {filteredPolicies.length} polite
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPolicies.map((policy) => (
                  <div key={policy.id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition">
                    <h3 className="text-xl font-bold text-primary mb-2">{policy.name}</h3>
                    <p className="text-gray-600 mb-4">{policy.coverage}</p>
                    <p className="text-2xl font-bold text-primary mb-6">{policy.basePrice} RON/an</p>
                    
                    {/* Expandable Details */}
                    <button
                      onClick={() => setExpandedPolicy(expandedPolicy === policy.id ? null : policy.id)}
                      className="w-full text-primary font-bold mb-4 hover:underline"
                    >
                      {expandedPolicy === policy.id ? '▼ ' : '▶ '} {t('products.details')}
                    </button>
                    
                    {expandedPolicy === policy.id && (
                      <div className="bg-gray-50 p-4 rounded mb-4 text-sm text-gray-700 border-l-4 border-primary">
                        <p>Detalii extinse ale acestei polite...</p>
                      </div>
                    )}

                    <button className="w-full bg-primary text-white py-2 rounded font-bold hover:bg-blue-700 transition">
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
              <p className="mt-4 text-gray-600">Se încarcă...</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
