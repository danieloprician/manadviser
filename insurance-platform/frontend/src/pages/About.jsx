import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation();

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-accent text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">{t('about.title')}</h1>
          <p className="text-lg opacity-90">Cunoaște compania care-ți protejează viitorul</p>
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
                Misiunea noastră este de a oferi soluții de asigurare și reasigurare de cel mai înalt nivel, 
                adaptate nevoilor unice ale fiecărui client, cu integritate și profesionalism.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-primary mb-4">{t('about.vision')}</h3>
              <p className="text-gray-700 leading-relaxed">
                Să devenim liderul recunoscut în industria asigurărilor prin inovație, transparență și 
                dedicare neȘtirbă la satisfacția clienților.
              </p>
            </div>

            {/* Values */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-primary mb-4">{t('about.values')}</h3>
              <ul className="text-gray-700 space-y-2">
                <li>✓ Integritate și transparență</li>
                <li>✓ Excelenţă în servicii</li>
                <li>✓ Inovație continuă</li>
                <li>✓ Responsabilitate socială</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Povestea Noastră</h2>
          <div className="bg-white p-8 rounded-lg shadow">
            <p className="text-gray-700 leading-relaxed mb-4">
              Fondată în 2003, InsurePro a crescut de la o mică agenție locală la un lider regional 
              în asigurări și reasigurări. Cu peste 20 de ani de experiență, ne-am câștigat reputația 
              prin dedicare către inovație și satisfacția clienților.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Astazi, servim mii de clienți satisfăcuți și continuăm să expandez portofoliul nostru 
              de produse și servicii pentru a răspunde nevoilor în schimbare ale pieței.
            </p>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Certificări și Acreditări</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="p-6 border-2 border-primary rounded-lg">
              <div className="text-4xl mb-2">🏆</div>
              <p className="font-bold text-primary">ISO 9001</p>
              <p className="text-gray-600 text-sm">Quality Management</p>
            </div>
            <div className="p-6 border-2 border-primary rounded-lg">
              <div className="text-4xl mb-2">🛡️</div>
              <p className="font-bold text-primary">FSCS</p>
              <p className="text-gray-600 text-sm">Financial Services Protection</p>
            </div>
            <div className="p-6 border-2 border-primary rounded-lg">
              <div className="text-4xl mb-2">✅</div>
              <p className="font-bold text-primary">ASF</p>
              <p className="text-gray-600 text-sm">Insurance Supervisor Approved</p>
            </div>
            <div className="p-6 border-2 border-primary rounded-lg">
              <div className="text-4xl mb-2">⭐</div>
              <p className="font-bold text-primary">5 Stars</p>
              <p className="text-gray-600 text-sm">Customer Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Echipa Noastră</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: 'Ion Popescu', role: 'CEO & Founder' },
              { name: 'Maria Stancu', role: 'COO' },
              { name: 'Alexandru Mihai', role: 'Head of Operations' },
            ].map((member, i) => (
              <div key={i} className="bg-white p-6 rounded-lg text-center">
                <div className="w-24 h-24 bg-primary rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-primary font-medium">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
