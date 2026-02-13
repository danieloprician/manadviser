import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import RCAForm from '../components/RCAForm';

export default function RCAFormPage() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  const handleSuccess = () => {
    // După trimiterea cu succes, redirecționează către pagina de produse
    navigate('/products');
  };

  const handleCancel = () => {
    // La anulare, înapoi la produse
    navigate('/products');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <RCAForm onSuccess={handleSuccess} onCancel={handleCancel} />
      </div>
    </div>
  );
}
