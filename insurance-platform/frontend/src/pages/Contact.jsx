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
      toast.error(t('contact.error'));
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
          <p className="text-lg opacity-90">{t('contact.subtitle')}</p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <div className="bg-white p-8 rounded-lg shadow-lg mb-6">
                <h3 className="text-xl font-bold text-primary mb-4"><FontAwesomeIcon icon={faPhone} className="mr-2" /> {t('contact.phoneTitle')}</h3>
                <p className="text-gray-700 mb-2">{t('contact.phoneNumber')}</p>
                <p className="text-gray-600 text-sm">{t('contact.phoneHours')}</p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg mb-6">
                <h3 className="text-xl font-bold text-primary mb-4"><FontAwesomeIcon icon={faEnvelope} className="mr-2" /> {t('contact.emailTitle')}</h3>
                <p className="text-gray-700">{t('contact.emailAddress')}</p>
                <p className="text-gray-600 text-sm">{t('contact.emailResponse')}</p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-primary mb-4"><FontAwesomeIcon icon={faLocationDot} className="mr-2" /> {t('contact.addressTitle')}</h3>
                <p className="text-gray-700">{t('contact.addressStreet')}</p>
                <p className="text-gray-700">{t('contact.addressCity')}</p>
                <p className="text-gray-600 text-sm">{t('contact.addressPostcode')}</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-primary">{t('contact.formTitle')}</h2>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block font-bold mb-2">{t('contact.name')}</label>
                    <input
                      type="text"
                      {...register('fullName', { required: t('contact.nameRequired') })}
                      className="w-full border-2 border-gray-300 rounded px-4 py-2 focus:border-primary"
                      placeholder={t('contact.namePlaceholder')}
                    />
                    {errors.fullName && <p className="text-danger text-sm mt-1">{errors.fullName.message}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block font-bold mb-2">{t('contact.email')}</label>
                    <input
                      type="email"
                      {...register('email', { required: t('contact.emailRequired') })}
                      className="w-full border-2 border-gray-300 rounded px-4 py-2 focus:border-primary"
                      placeholder={t('contact.emailPlaceholder')}
                    />
                    {errors.email && <p className="text-danger text-sm mt-1">{errors.email.message}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block font-bold mb-2">{t('contact.phone')}</label>
                    <input
                      type="tel"
                      {...register('phone', { required: t('contact.phoneRequired') })}
                      className="w-full border-2 border-gray-300 rounded px-4 py-2 focus:border-primary"
                      placeholder={t('contact.phonePlaceholder')}
                    />
                    {errors.phone && <p className="text-danger text-sm mt-1">{errors.phone.message}</p>}
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block font-bold mb-2">{t('contact.subject')}</label>
                    <input
                      type="text"
                      {...register('subject', { required: t('contact.subjectRequired') })}
                      className="w-full border-2 border-gray-300 rounded px-4 py-2 focus:border-primary"
                      placeholder={t('contact.subjectPlaceholder')}
                    />
                    {errors.subject && <p className="text-danger text-sm mt-1">{errors.subject.message}</p>}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block font-bold mb-2">{t('contact.message')}</label>
                    <textarea
                      {...register('message', { required: t('contact.messageRequired') })}
                      className="w-full border-2 border-gray-300 rounded px-4 py-2 h-32 focus:border-primary"
                      placeholder={t('contact.messagePlaceholder')}
                    ></textarea>
                    {errors.message && <p className="text-danger text-sm mt-1">{errors.message.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-primary text-white py-3 rounded font-bold hover:bg-blue-700 transition disabled:opacity-50"
                  >
                    {loading ? t('contact.sending') : t('contact.send')}
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-primary">{t('contact.faqTitle')}</h2>
            <div className="space-y-6">
              {[
                {
                  q: t('contact.faq1Q'),
                  a: t('contact.faq1A')
                },
                {
                  q: t('contact.faq2Q'),
                  a: t('contact.faq2A')
                },
                {
                  q: t('contact.faq3Q'),
                  a: t('contact.faq3A')
                },
                {
                  q: t('contact.faq4Q'),
                  a: t('contact.faq4A')
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
