import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalculator } from '@fortawesome/free-solid-svg-icons';

export default function Calculator() {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [policies, setPolicies] = useState([]);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await axios.get('/api/policies');
        setPolicies(response.data);
      } catch (error) {
        // Mock data
        setPolicies([
          { id: 1, name: 'Casco Complet', categoryId: 1, basePrice: 500 },
          { id: 2, name: 'RCA Standard', categoryId: 1, basePrice: 300 },
          { id: 3, name: 'Asigurare Locuință', categoryId: 2, basePrice: 400 },
        ]);
      }
    };
    fetchPolicies();
  }, []);

  const onSubmit = async (data) => {
    if (!selectedPolicy) {
      toast.error('Selectează o polită!');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/api/quotes/calculate', {
        policyId: selectedPolicy,
        personalData: data,
      });
      setResult(response.data);
      toast.success('Preț calculat cu succes!');
    } catch (error) {
      // Mock calculation
      const basePrice = policies.find(p => p.id === parseInt(selectedPolicy))?.basePrice || 300;
      setResult({
        basePrice: basePrice,
        calculatedPrice: basePrice * 1.1,
        discount: basePrice * 0.1,
      });
      toast.success('Preț calculat!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-accent text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">{t('calculator.title')}</h1>
          <p className="text-lg opacity-90">Calculează gratuit prețul tău în câteva secunde</p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold mb-6 text-primary">{t('calculator.enterDetails')}</h2>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Select Policy */}
                <div>
                  <label className="block font-bold mb-2">{t('calculator.selectProduct')}</label>
                  <select
                    value={selectedPolicy || ''}
                    onChange={(e) => setSelectedPolicy(e.target.value)}
                    className="w-full border-2 border-gray-300 rounded px-4 py-2"
                  >
                    <option value="">-- Selectează o polită --</option>
                    {policies.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.basePrice} RON)
                      </option>
                    ))}
                  </select>
                </div>

                {/* Email */}
                <div>
                  <label className="block font-bold mb-2">{t('contact.email')}</label>
                  <input
                    type="email"
                    {...register('email', { required: 'Email este obligatoriu' })}
                    className="w-full border-2 border-gray-300 rounded px-4 py-2"
                    placeholder="email@example.com"
                  />
                  {errors.email && <p className="text-danger text-sm mt-1">{errors.email.message}</p>}
                </div>

                {/* Full Name */}
                <div>
                  <label className="block font-bold mb-2">{t('contact.name')}</label>
                  <input
                    type="text"
                    {...register('fullName', { required: 'Numele este obligatoriu' })}
                    className="w-full border-2 border-gray-300 rounded px-4 py-2"
                    placeholder="Prenumele Nume"
                  />
                  {errors.fullName && <p className="text-danger text-sm mt-1">{errors.fullName.message}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block font-bold mb-2">{t('contact.phone')}</label>
                  <input
                    type="tel"
                    {...register('phone', { required: 'Telefonul este obligatoriu' })}
                    className="w-full border-2 border-gray-300 rounded px-4 py-2"
                    placeholder="+40 720 000 000"
                  />
                  {errors.phone && <p className="text-danger text-sm mt-1">{errors.phone.message}</p>}
                </div>

                {/* Additional Details */}
                <div>
                  <label className="block font-bold mb-2">Detalii Suplimentare</label>
                  <textarea
                    {...register('additionalInfo')}
                    className="w-full border-2 border-gray-300 rounded px-4 py-2 h-24"
                    placeholder="Ex: Vârstă, marca mașinii, etc."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-primary text-white py-3 rounded font-bold hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {loading ? 'Se calculează...' : t('calculator.calculate')}
                </button>
              </form>
            </div>

            {/* Result */}
            <div className="flex flex-col">
              {result ? (
                <div className="bg-white p-8 rounded-lg shadow-lg flex-1">
                  <h2 className="text-2xl font-bold mb-6 text-primary">{t('calculator.result')}</h2>
                  
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded">
                      <p className="text-gray-600 text-sm">Preț de bază</p>
                      <p className="text-2xl font-bold text-primary">{result.basePrice} RON</p>
                    </div>

                    <div className="bg-green-50 p-4 rounded border-2 border-success">
                      <p className="text-gray-600 text-sm">Reducere aplicată</p>
                      <p className="text-2xl font-bold text-success">{result.discount} RON</p>
                    </div>

                    <hr className="border-t-2 border-primary" />

                    <div className="bg-primary text-white p-4 rounded">
                      <p className="text-sm opacity-90">Preț final</p>
                      <p className="text-4xl font-bold">{result.calculatedPrice} RON</p>
                      <p className="text-sm mt-2">/an</p>
                    </div>

                    <button className="w-full bg-success text-white py-3 rounded font-bold hover:bg-green-600 transition">
                      Solicită Ofertă Completă
                    </button>

                    <p className="text-center text-gray-600 text-sm">
                      * Preț estimativ. Prețul final poate varia în funcție de detalii suplimentare.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="bg-white p-8 rounded-lg shadow-lg flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-4xl mb-4 text-primary"><FontAwesomeIcon icon={faCalculator} /></p>
                    <p className="text-gray-600">
                      Completează formularul și calculează prețul tău
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
