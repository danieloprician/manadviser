import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faUser, faIdCard, faPhone, faEnvelope, faCalendar } from '@fortawesome/free-solid-svg-icons';

export default function RCAForm({ selectedPolicy, onSuccess, onCancel }) {
  const { t, i18n } = useTranslation();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const userType = watch('userType', 'personal');

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Folosim polița selectată sau căutăm una auto
      let autoPolicy = selectedPolicy;
      
      if (!autoPolicy) {
        const policiesRes = await axios.get('/api/policies');
        autoPolicy = policiesRes.data.value?.find(p => 
          p.categoryId === 1 || 
          p.name.toLowerCase().includes('rca') || 
          p.name.toLowerCase().includes('casco') ||
          p.type?.toLowerCase().includes('auto')
        );
      }

      if (!autoPolicy) {
        toast.error(i18n.language === 'ro' ? 'Polița auto nu a fost găsită' : 'Auto policy not found');
        setLoading(false);
        return;
      }

      // Creăm cotația
      const quoteData = {
        email: data.email,
        policyId: autoPolicy.id,
        personalData: {
          // Tip asigurare
          insuranceType: autoPolicy.name,
          
          // Date personale
          userType: data.userType,
          firstName: data.firstName,
          lastName: data.lastName,
          cnp: data.cnp,
          companyName: data.companyName,
          cui: data.cui,
          phone: data.phone,
          
          // Date vehicul
          plateNumber: data.plateNumber,
          vin: data.vin,
          brand: data.brand,
          model: data.model,
          year: data.year,
          engineCapacity: data.engineCapacity,
          fuelType: data.fuelType,
          
          // Experiență
          drivingExperience: data.drivingExperience,
          licenseDate: data.licenseDate,
          
          // Alte informații
          previousInsurance: data.previousInsurance,
          claimsHistory: data.claimsHistory
        }
      };

      await axios.post('/api/quotes', quoteData);
      toast.success(i18n.language === 'ro' 
        ? 'Cererea dumneavoastră a fost trimisă cu succes! Veți primi un email de confirmare.' 
        : 'Your request has been submitted successfully! You will receive a confirmation email.'
      );
      
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error submitting auto insurance form:', error);
      toast.error(i18n.language === 'ro' 
        ? 'A apărut o eroare. Vă rugăm să încercați din nou.' 
        : 'An error occurred. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-primary mb-2">
          <FontAwesomeIcon icon={faCar} className="mr-3" />
          {i18n.language === 'ro' ? 'Formular Asigurare Auto' : 'Auto Insurance Form'}
        </h2>
        <p className="text-gray-600">
          {i18n.language === 'ro' 
            ? 'Completați formularul pentru a primi o ofertă personalizată'
            : 'Complete the form to receive a personalized quote'}
        </p>
      </div>

      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                step >= s ? 'bg-primary text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {s}
              </div>
              {s < 3 && <div className={`flex-1 h-1 mx-2 ${step > s ? 'bg-primary' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>{i18n.language === 'ro' ? 'Date personale' : 'Personal data'}</span>
          <span>{i18n.language === 'ro' ? 'Date vehicul' : 'Vehicle data'}</span>
          <span>{i18n.language === 'ro' ? 'Confirmare' : 'Confirmation'}</span>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Step 1: Date personale */}
        {step === 1 && (
          <div className="space-y-6">
            {/* Insurance Type - Read Only (if selectedPolicy is provided) */}
            {selectedPolicy && (
              <div>
                <label className="block text-gray-700 font-bold mb-2">
                  {i18n.language === 'ro' ? 'Tip Asigurare' : 'Insurance Type'} *
                </label>
                <input
                  type="text"
                  value={selectedPolicy.name}
                  readOnly
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-700 font-semibold cursor-not-allowed"
                />
                <div className="mt-2 text-sm text-gray-600">
                  <p><strong>{i18n.language === 'ro' ? 'Acoperire' : 'Coverage'}:</strong> {selectedPolicy.coverage}</p>
                  <p><strong>{i18n.language === 'ro' ? 'Preț de bază' : 'Base price'}:</strong> {selectedPolicy.basePrice} RON/an</p>
                </div>
              </div>
            )}
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                {i18n.language === 'ro' ? 'Tip utilizator' : 'User type'}
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="personal"
                    {...register('userType', { required: true })}
                    className="mr-2"
                  />
                  {i18n.language === 'ro' ? 'Persoană fizică' : 'Individual'}
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="company"
                    {...register('userType', { required: true })}
                    className="mr-2"
                  />
                  {i18n.language === 'ro' ? 'Persoană juridică' : 'Company'}
                </label>
              </div>
            </div>

            {userType === 'personal' ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      {i18n.language === 'ro' ? 'Prenume *' : 'First Name *'}
                    </label>
                    <input
                      {...register('firstName', { required: true, minLength: 2 })}
                      className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-primary"
                      placeholder={i18n.language === 'ro' ? 'Introduceți prenumele' : 'Enter first name'}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">Acest câmp este obligatoriu</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      {i18n.language === 'ro' ? 'Nume *' : 'Last Name *'}
                    </label>
                    <input
                      {...register('lastName', { required: true, minLength: 2 })}
                      className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-primary"
                      placeholder={i18n.language === 'ro' ? 'Introduceți numele' : 'Enter last name'}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">Acest câmp este obligatoriu</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    <FontAwesomeIcon icon={faIdCard} className="mr-2" />
                    {i18n.language === 'ro' ? 'CNP *' : 'Personal ID *'}
                  </label>
                  <input
                    {...register('cnp', { 
                      required: true, 
                      pattern: /^[0-9]{13}$/
                    })}
                    className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-primary"
                    placeholder="1234567890123"
                    maxLength="13"
                  />
                  {errors.cnp && (
                    <p className="text-red-500 text-sm mt-1">CNP invalid (13 cifre)</p>
                  )}
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    {i18n.language === 'ro' ? 'Denumire companie *' : 'Company Name *'}
                  </label>
                  <input
                    {...register('companyName', { 
                      required: userType === 'company',
                      minLength: 3
                    })}
                    className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-primary"
                    placeholder={i18n.language === 'ro' ? 'Introduceți denumirea' : 'Enter company name'}
                  />
                  {errors.companyName && (
                    <p className="text-red-500 text-sm mt-1">Acest câmp este obligatoriu</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    <FontAwesomeIcon icon={faIdCard} className="mr-2" />
                    {i18n.language === 'ro' ? 'CUI *' : 'Tax ID *'}
                  </label>
                  <input
                    {...register('cui', { 
                      required: userType === 'company',
                      pattern: /^[0-9]{2,10}$/
                    })}
                    className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-primary"
                    placeholder="RO12345678"
                  />
                  {errors.cui && (
                    <p className="text-red-500 text-sm mt-1">CUI invalid</p>
                  )}
                </div>
              </>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                  Email *
                </label>
                <input
                  type="email"
                  {...register('email', { 
                    required: true,
                    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                  })}
                  className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-primary"
                  placeholder="exemplu@email.ro"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">Email invalid</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  <FontAwesomeIcon icon={faPhone} className="mr-2" />
                  {i18n.language === 'ro' ? 'Telefon *' : 'Phone *'}
                </label>
                <input
                  {...register('phone', { 
                    required: true,
                    pattern: /^[0-9]{10}$/
                  })}
                  className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-primary"
                  placeholder="0712345678"
                  maxLength="10"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">Telefon invalid (10 cifre)</p>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-3 bg-primary text-white rounded-lg font-bold hover:bg-blue-700 transition"
              >
                {i18n.language === 'ro' ? 'Următorul →' : 'Next →'}
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Date vehicul */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  <FontAwesomeIcon icon={faCar} className="mr-2" />
                  {i18n.language === 'ro' ? 'Număr înmatriculare *' : 'Plate Number *'}
                </label>
                <input
                  {...register('plateNumber', { 
                    required: true,
                    pattern: /^[A-Z0-9\s-]{3,10}$/i
                  })}
                  className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-primary"
                  placeholder="B 123 ABC"
                  style={{ textTransform: 'uppercase' }}
                />
                {errors.plateNumber && (
                  <p className="text-red-500 text-sm mt-1">Număr invalid</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  {i18n.language === 'ro' ? 'Serie șasiu (VIN)' : 'VIN Number'}
                </label>
                <input
                  {...register('vin', { pattern: /^[A-HJ-NPR-Z0-9]{17}$/i })}
                  className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-primary"
                  placeholder="WVWZZZ1JZYW123456"
                  maxLength="17"
                  style={{ textTransform: 'uppercase' }}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  {i18n.language === 'ro' ? 'Marcă *' : 'Brand *'}
                </label>
                <input
                  {...register('brand', { required: true })}
                  className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-primary"
                  placeholder="Dacia, Volkswagen, BMW..."
                />
                {errors.brand && (
                  <p className="text-red-500 text-sm mt-1">Acest câmp este obligatoriu</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  {i18n.language === 'ro' ? 'Model *' : 'Model *'}
                </label>
                <input
                  {...register('model', { required: true })}
                  className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-primary"
                  placeholder="Logan, Golf, X5..."
                />
                {errors.model && (
                  <p className="text-red-500 text-sm mt-1">Acest câmp este obligatoriu</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  <FontAwesomeIcon icon={faCalendar} className="mr-2" />
                  {i18n.language === 'ro' ? 'An fabricație *' : 'Year *'}
                </label>
                <input
                  type="number"
                  {...register('year', { 
                    required: true,
                    min: 1900,
                    max: new Date().getFullYear() + 1
                  })}
                  className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-primary"
                  placeholder="2020"
                />
                {errors.year && (
                  <p className="text-red-500 text-sm mt-1">An invalid</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  {i18n.language === 'ro' ? 'Capacitate motor (cm³)' : 'Engine Capacity (cm³)'}
                </label>
                <input
                  type="number"
                  {...register('engineCapacity', { min: 500, max: 10000 })}
                  className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-primary"
                  placeholder="1598"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  {i18n.language === 'ro' ? 'Combustibil' : 'Fuel Type'}
                </label>
                <select
                  {...register('fuelType')}
                  className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-primary"
                >
                  <option value="">Selectează</option>
                  <option value="gasoline">Benzină</option>
                  <option value="diesel">Diesel</option>
                  <option value="lpg">GPL</option>
                  <option value="electric">Electric</option>
                  <option value="hybrid">Hibrid</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  {i18n.language === 'ro' ? 'Experiență conducere (ani)' : 'Driving Experience (years)'}
                </label>
                <input
                  type="number"
                  {...register('drivingExperience', { min: 0, max: 70 })}
                  className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-primary"
                  placeholder="5"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  {i18n.language === 'ro' ? 'Data obținerii permisului' : 'License Date'}
                </label>
                <input
                  type="date"
                  {...register('licenseDate')}
                  className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  {...register('previousInsurance')}
                  className="mr-2"
                />
                {i18n.language === 'ro' 
                  ? 'Am avut asigurare RCA anterioară' 
                  : 'I had previous RCA insurance'}
              </label>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-3 bg-gray-500 text-white rounded-lg font-bold hover:bg-gray-600 transition"
              >
                ← {i18n.language === 'ro' ? 'Înapoi' : 'Back'}
              </button>
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-3 bg-primary text-white rounded-lg font-bold hover:bg-blue-700 transition"
              >
                {i18n.language === 'ro' ? 'Următorul →' : 'Next →'}
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Confirmare */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-primary mb-4">
                {i18n.language === 'ro' ? 'Verificați datele' : 'Review your data'}
              </h3>
              <div className="space-y-2 text-sm">
                <p><strong>{i18n.language === 'ro' ? 'Tip:' : 'Type:'}</strong> {userType === 'personal' ? 'Persoană fizică' : 'Persoană juridică'}</p>
                <p><strong>Email:</strong> {watch('email')}</p>
                <p><strong>{i18n.language === 'ro' ? 'Telefon:' : 'Phone:'}</strong> {watch('phone')}</p>
                <p><strong>{i18n.language === 'ro' ? 'Vehicul:' : 'Vehicle:'}</strong> {watch('brand')} {watch('model')} ({watch('year')})</p>
                <p><strong>{i18n.language === 'ro' ? 'Număr:' : 'Plate:'}</strong> {watch('plateNumber')}</p>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                {i18n.language === 'ro' ? 'Informații adiționale' : 'Additional Information'}
              </label>
              <textarea
                {...register('claimsHistory')}
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-primary"
                rows="4"
                placeholder={i18n.language === 'ro' 
                  ? 'Aveți daune în istoric? Alte mențiuni importante...' 
                  : 'Any claims history? Other important notes...'}
              />
            </div>

            <div className="bg-blue-50 border-l-4 border-primary p-4">
              <p className="text-sm text-gray-700">
                {i18n.language === 'ro' 
                  ? '✓ Prin trimiterea acestui formular, vă exprimați acordul pentru procesarea datelor personale conform GDPR.'
                  : '✓ By submitting this form, you agree to the processing of personal data according to GDPR.'}
              </p>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-3 bg-gray-500 text-white rounded-lg font-bold hover:bg-gray-600 transition"
              >
                ← {i18n.language === 'ro' ? 'Înapoi' : 'Back'}
              </button>
              <div className="flex gap-4">
                {onCancel && (
                  <button
                    type="button"
                    onClick={onCancel}
                    className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-400 transition"
                  >
                    {i18n.language === 'ro' ? 'Anulează' : 'Cancel'}
                  </button>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-700 transition disabled:bg-gray-400"
                >
                  {loading 
                    ? (i18n.language === 'ro' ? 'Se trimite...' : 'Submitting...') 
                    : (i18n.language === 'ro' ? 'Trimite cererea' : 'Submit Request')}
                </button>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
