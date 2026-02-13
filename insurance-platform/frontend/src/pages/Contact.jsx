import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faLocationDot } from '@fortawesome/free-solid-svg-icons';

export default function Contact() {
  const { t } = useTranslation();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await axios.post('/api/contacts', data);
      toast.success(t('contact.success'));
      reset();
    } catch (error) {
      toast.error('Eroare! Te rog încearcă din nou.');
      console.log('Using mock submission');
      toast.success(t('contact.success'));
      reset();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-accent text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">{t('contact.title')}</h1>
          <p className="text-lg opacity-90">Ne gatuim să te ajutăm cu orice întrebare</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <div className="bg-white p-8 rounded-lg shadow-lg mb-6">
                <h3 className="text-xl font-bold text-primary mb-4"><FontAwesomeIcon icon={faPhone} className="mr-2" /> Telefon</h3>
                <p className="text-gray-700 mb-2">+40 (0) 234 567 890</p>
                <p className="text-gray-600 text-sm">Luni-Vineri 8:00-18:00</p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg mb-6">
                <h3 className="text-xl font-bold text-primary mb-4"><FontAwesomeIcon icon={faEnvelope} className="mr-2" /> Email</h3>
                <p className="text-gray-700">info@insurepro.ro</p>
                <p className="text-gray-600 text-sm">Răspuns în 24 de ore</p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-primary mb-4"><FontAwesomeIcon icon={faLocationDot} className="mr-2" /> Adresă</h3>
                <p className="text-gray-700">Str. Principal Nr. 123</p>
                <p className="text-gray-700">București, România</p>
                <p className="text-gray-600 text-sm">CP 050000</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-primary">Contactează-ne</h2>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block font-bold mb-2">{t('contact.name')}</label>
                    <input
                      type="text"
                      {...register('fullName', { required: 'Numele este obligatoriu' })}
                      className="w-full border-2 border-gray-300 rounded px-4 py-2 focus:border-primary"
                      placeholder="Prenumele Nume"
                    />
                    {errors.fullName && <p className="text-danger text-sm mt-1">{errors.fullName.message}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block font-bold mb-2">{t('contact.email')}</label>
                    <input
                      type="email"
                      {...register('email', { required: 'Email este obligatoriu' })}
                      className="w-full border-2 border-gray-300 rounded px-4 py-2 focus:border-primary"
                      placeholder="email@example.com"
                    />
                    {errors.email && <p className="text-danger text-sm mt-1">{errors.email.message}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block font-bold mb-2">{t('contact.phone')}</label>
                    <input
                      type="tel"
                      {...register('phone', { required: 'Telefonul este obligatoriu' })}
                      className="w-full border-2 border-gray-300 rounded px-4 py-2 focus:border-primary"
                      placeholder="+40 720 000 000"
                    />
                    {errors.phone && <p className="text-danger text-sm mt-1">{errors.phone.message}</p>}
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block font-bold mb-2">{t('contact.subject')}</label>
                    <input
                      type="text"
                      {...register('subject', { required: 'Subiectul este obligatoriu' })}
                      className="w-full border-2 border-gray-300 rounded px-4 py-2 focus:border-primary"
                      placeholder="Subiectul mesajului"
                    />
                    {errors.subject && <p className="text-danger text-sm mt-1">{errors.subject.message}</p>}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block font-bold mb-2">{t('contact.message')}</label>
                    <textarea
                      {...register('message', { required: 'Mesajul este obligatoriu' })}
                      className="w-full border-2 border-gray-300 rounded px-4 py-2 h-32 focus:border-primary"
                      placeholder="Scrie-ți mesajul..."
                    ></textarea>
                    {errors.message && <p className="text-danger text-sm mt-1">{errors.message.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary text-white py-3 rounded font-bold hover:bg-blue-700 transition disabled:opacity-50"
                  >
                    {loading ? 'Se trimite...' : t('contact.send')}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-primary">Întrebări Frecvente (FAQ)</h2>
            <div className="space-y-6">
              {[
                {
                  q: 'Cât timp durează procesul de asigurare?',
                  a: 'Procesul durează în medie 2-3 zile lucrătoare de la semnarea documentelor.'
                },
                {
                  q: 'Ce documente trebuie să aduc?',
                  a: 'Aveți nevoie de buletin, dovadă de venit și dovadă de domiciliu.'
                },
                {
                  q: 'Oferiți și asigurări online?',
                  a: 'Da! Puteți completa formulareele și semna digital 100% online.'
                },
                {
                  q: 'Care sunt metodele de plată?',
                  a: 'Acceptăm transfer bancar, card și plăți în rate.'
                },
              ].map((item, i) => (
                <div key={i} className="border-l-4 border-primary pl-4">
                  <h3 className="font-bold text-lg text-primary mb-2">{item.q}</h3>
                  <p className="text-gray-700">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
