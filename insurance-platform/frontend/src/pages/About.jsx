import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrophy, faShield, faCheckCircle, faStar, faUserTie, faUser } from '@fortawesome/free-solid-svg-icons';

export default function About() {
  const { t } = useTranslation();

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-accent text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">{t('about.title')}</h1>
          <p className="text-lg opacity-90">{t('about.subtitle')}</p>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Mission */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-primary mb-4">{t('about.mission')}</h3>
              <p className="text-gray-700 leading-relaxed">
                {t('about.missionText')}
              </p>
            </div>

            {/* Vision */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-primary mb-4">{t('about.vision')}</h3>
              <p className="text-gray-700 leading-relaxed">
                {t('about.visionText')}
              </p>
            </div>

            {/* Values */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-primary mb-4">{t('about.values')}</h3>
              <ul className="text-gray-700 space-y-2">
                <li><FontAwesomeIcon icon={faCheck} className="text-primary mr-2" /> {t('about.value1')}</li>
                <li><FontAwesomeIcon icon={faCheck} className="text-primary mr-2" /> {t('about.value2')}</li>
                <li><FontAwesomeIcon icon={faCheck} className="text-primary mr-2" /> {t('about.value3')}</li>
                <li><FontAwesomeIcon icon={faCheck} className="text-primary mr-2" /> {t('about.value4')}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">{t('about.history')}</h2>
          <div className="bg-white p-8 rounded-lg shadow">
            <p className="text-gray-700 leading-relaxed mb-4">
              {t('about.historyText1')}
            </p>
            <p className="text-gray-700 leading-relaxed">
              {t('about.historyText2')}
            </p>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">{t('about.certifications')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 border-2 border-primary rounded-lg">
              <div className="text-4xl mb-2 text-primary"><FontAwesomeIcon icon={faTrophy} /></div>
              <p className="font-bold text-primary">ISO 9001</p>
              <p className="text-gray-600 text-sm">Quality Management</p>
            </div>
            <div className="p-6 border-2 border-primary rounded-lg">
              <div className="text-4xl mb-2 text-primary"><FontAwesomeIcon icon={faShield} /></div>
              <p className="font-bold text-primary">FSCS</p>
              <p className="text-gray-600 text-sm">Financial Services Protection</p>
            </div>
            <div className="p-6 border-2 border-primary rounded-lg">
              <div className="text-4xl mb-2 text-primary"><FontAwesomeIcon icon={faCheckCircle} /></div>
              <p className="font-bold text-primary">ASF</p>
              <p className="text-gray-600 text-sm">Insurance Supervisor Approved</p>
            </div>
            <div className="p-6 border-2 border-primary rounded-lg">
              <div className="text-4xl mb-2 text-primary"><FontAwesomeIcon icon={faStar} /></div>
              <p className="font-bold text-primary">5 Stars</p>
              <p className="text-gray-600 text-sm">Customer Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">{t('about.team')}</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            {t('about.teamSubtitle')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Andreea Mandrea - Female */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 bg-gradient-to-br from-pink-100 to-purple-100 rounded-full flex items-center justify-center mb-6 shadow-md">
                  <FontAwesomeIcon icon={faUser} className="text-6xl text-pink-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{t('about.teamMember1Name')}</h3>
                <p className="text-primary font-semibold text-lg mb-3">{t('about.teamMember1Role')}</p>
                <div className="w-16 h-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded mb-4"></div>
                <p className="text-gray-600 text-center text-sm leading-relaxed">
                  {t('about.teamMember1Desc')}
                </p>
              </div>
            </div>

            {/* Marius Nica - Male */}
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex flex-col items-center">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mb-6 shadow-md">
                  <FontAwesomeIcon icon={faUserTie} className="text-6xl text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{t('about.teamMember2Name')}</h3>
                <p className="text-primary font-semibold text-lg mb-3">{t('about.teamMember2Role')}</p>
                <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded mb-4"></div>
                <p className="text-gray-600 text-center text-sm leading-relaxed">
                  {t('about.teamMember2Desc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
