import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center px-4">
        <div className="text-8xl font-bold text-primary mb-4">404</div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Pagina nu a fost gasita</h1>
        <p className="text-gray-600 text-lg mb-8">
          Sorry, pagina pe care o cauți nu există sau a fost mutată.
        </p>
        <Link
          to="/"
          className="inline-block bg-primary text-white px-8 py-3 rounded font-bold hover:bg-blue-700 transition"
        >
          Gaseste Acasă
        </Link>
      </div>
    </div>
  );
}
