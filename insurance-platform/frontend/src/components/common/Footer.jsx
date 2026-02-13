import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold text-primary mb-4">InsurePro</h3>
            <p className="text-gray-400">
              Professional insurance and reinsurance solutions for your peace of mind.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-4">{t('nav.products')}</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white">{t('home.categories.auto')}</a></li>
              <li><a href="#" className="hover:text-white">{t('home.categories.home')}</a></li>
              <li><a href="#" className="hover:text-white">{t('home.categories.life')}</a></li>
              <li><a href="#" className="hover:text-white">{t('home.categories.health')}</a></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-bold mb-4">Companie</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/about" className="hover:text-white">{t('nav.about')}</Link></li>
              <li><a href="#" className="hover:text-white">Blog</a></li>
              <li><a href="#" className="hover:text-white">Certificări</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold mb-4">{t('contact.title')}</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Tel: +40 (0) 234 567 890</li>
              <li>Email: info@insurepro.ro</li>
              <li>Adresă: Str. Principal 123, București</li>
              <li>Ore: 8:00 - 18:00 (Luni-Vineri)</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400">
              &copy; {currentYear} InsurePro. All rights reserved.
            </p>
            <div className="flex space-x-6 text-gray-400 mt-4 md:mt-0">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <a href="#" className="hover:text-white">Terms of Service</a>
              <a href="#" className="hover:text-white">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
