import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faHome, faHeart, faBriefcaseMedical, faPlaneUp, faBriefcase, faCheck, faChartLine, faClock, faRocket, faStar } from '@fortawesome/free-solid-svg-icons';

const categoryIcons = {
  1: faCar,
  2: faHome,
  3: faHeart,
  4: faBriefcaseMedical,
  5: faPlaneUp,
  6: faBriefcase
};

export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch categories from API
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.log('Using mock data for categories');
        // Mock data for development
        setCategories([
          { id: 1, name_Ro: t('home.categories.auto'), name_En: 'Auto Insurance' },
          { id: 2, name_Ro: t('home.categories.home'), name_En: 'Home Insurance' },
          { id: 3, name_Ro: t('home.categories.life'), name_En: 'Life Insurance' },
          { id: 4, name_Ro: t('home.categories.health'), name_En: 'Health Insurance' },
          { id: 5, name_Ro: t('home.categories.travel'), name_En: 'Travel Insurance' },
          { id: 6, name_Ro: t('home.categories.business'), name_En: 'Business Insurance' },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [t]);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-accent text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t('home.hero.title')}
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90">
            {t('home.hero.subtitle')}
          </p>         
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t('home.features.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl mb-4 text-primary"><FontAwesomeIcon icon={faCheck} /></div>
              <h3 className="text-xl font-bold text-primary mb-2">{t('home.features.trust')}</h3>
              <p className="text-gray-600">{t('home.features.trustDesc')}</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl mb-4 text-primary"><FontAwesomeIcon icon={faChartLine} /></div>
              <h3 className="text-xl font-bold text-primary mb-2">{t('home.features.experience')}</h3>
              <p className="text-gray-600">{t('home.features.experienceDesc')}</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl mb-4 text-primary"><FontAwesomeIcon icon={faClock} /></div>
              <h3 className="text-xl font-bold text-primary mb-2">{t('home.features.support')}</h3>
              <p className="text-gray-600">{t('home.features.supportDesc')}</p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl mb-4 text-primary"><FontAwesomeIcon icon={faRocket} /></div>
              <h3 className="text-xl font-bold text-primary mb-2">{t('home.features.innovation')}</h3>
              <p className="text-gray-600">{t('home.features.innovationDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Preview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t('home.categories.title')}</h2>
          {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((cat) => (
                <div 
                  key={cat.id} 
                  onClick={() => navigate('/products')}
                  className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition cursor-pointer"
                >
                  <div className="text-4xl mb-3 text-primary"><FontAwesomeIcon icon={categoryIcons[cat.id]} /></div>
                  <h3 className="text-xl font-bold text-primary mb-2">{cat.name_Ro}</h3>
                  <p className="text-gray-600">{cat.name_En}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t('home.testimonials.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, j) => (
                  <FontAwesomeIcon key={j} icon={faStar} className="text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "{t('home.testimonials.quote1')}"
              </p>
              <p className="font-bold text-primary">{t('home.testimonials.client1')}</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, j) => (
                  <FontAwesomeIcon key={j} icon={faStar} className="text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "{t('home.testimonials.quote2')}"
              </p>
              <p className="font-bold text-primary">{t('home.testimonials.client2')}</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, j) => (
                  <FontAwesomeIcon key={j} icon={faStar} className="text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-4">
                "{t('home.testimonials.quote3')}"
              </p>
              <p className="font-bold text-primary">{t('home.testimonials.client3')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">{t('home.cta.title')}</h2>
          <p className="text-lg mb-8">{t('home.cta.subtitle')}</p>
          <button 
            onClick={() => navigate('/products')}
            className="bg-white text-primary px-8 py-3 rounded font-bold hover:bg-gray-100 transition"
          >
            {t('home.cta.button')}
          </button>
        </div>
      </section>
    </div>
  );
}
