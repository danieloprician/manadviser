import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import logo from '../../assets/logo.png';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'ro' ? 'en' : 'ro';
    i18n.changeLanguage(newLang);
    localStorage.setItem('language', newLang);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const getLinkClass = (path) => {
    return isActive(path)
      ? 'text-primary font-bold border-b-2 border-primary'
      : 'hover:text-primary font-medium';
  };

  const getMobileLinkClass = (path) => {
    return isActive(path)
      ? 'block py-2 text-primary font-bold border-l-4 border-primary pl-4'
      : 'block py-2 text-gray-700 hover:text-primary';
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md border-b-4 border-primary">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img src={logo} alt="InsurePro Logo" className="h-20 w-auto" />
          </Link>
          
          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-8 text-gray-700">
            <li><Link to="/" className={getLinkClass('/')}>{t('nav.home')}</Link></li>
            <li><Link to="/about" className={getLinkClass('/about')}>{t('nav.about')}</Link></li>
            <li><Link to="/products" className={getLinkClass('/products')}>{t('nav.products')}</Link></li>
            <li><Link to="/contact" className={getLinkClass('/contact')}>{t('nav.contact')}</Link></li>
            {localStorage.getItem('token') && (
              <li><Link to="/admin/dashboard" className={location.pathname.startsWith('/admin') ? 'text-primary font-bold border-b-2 border-primary' : 'hover:text-primary font-medium text-secondary'}>{t('nav.admin')}</Link></li>
            )}
          </ul>

          {/* Language & Admin Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {!localStorage.getItem('token') && (
              <Link to="/admin/login" className="px-3 py-2 text-primary font-medium border-2 border-primary rounded hover:bg-primary hover:text-white transition">
                {t('nav.admin')}
              </Link>
            )}
            <button 
              onClick={toggleLanguage}
              className="px-4 py-2 bg-primary text-white rounded hover:bg-blue-700 font-medium transition"
            >
              {i18n.language === 'ro' ? 'EN' : 'RO'}
            </button>
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center space-x-2">
            <button 
              onClick={toggleLanguage}
              className="px-2 py-1 text-sm bg-primary text-white rounded font-medium"
            >
              {i18n.language === 'ro' ? 'EN' : 'RO'}
            </button>
            <button 
              className="text-primary"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden mt-4 pb-4 border-t">
            <Link to="/" className={getMobileLinkClass('/')}>{t('nav.home')}</Link>
            <Link to="/about" className={getMobileLinkClass('/about')}>{t('nav.about')}</Link>
            <Link to="/products" className={getMobileLinkClass('/products')}>{t('nav.products')}</Link>
            <Link to="/calculator" className={getMobileLinkClass('/calculator')}>{t('nav.calculator')}</Link>
            <Link to="/contact" className={getMobileLinkClass('/contact')}>{t('nav.contact')}</Link>
            {!localStorage.getItem('token') && (
              <Link to="/admin/login" className="block py-2 text-secondary font-medium hover:text-primary">{t('nav.admin')}</Link>
            )}
            {localStorage.getItem('token') && (
              <Link to="/admin/dashboard" className={location.pathname.startsWith('/admin') ? 'block py-2 text-primary font-bold border-l-4 border-primary pl-4' : 'block py-2 text-secondary font-medium hover:text-primary'}>{t('nav.admin')}</Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
