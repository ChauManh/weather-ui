import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 via-cyan-300 to-purple-700 text-white p-6">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-lg mb-6">Page not found</p>
      <Link
        to="/"
        className="px-6 py-3 hover:bg-yellow-400 hover:text-black rounded-md border border-white text-white cursor-pointer"
      >
        Back to Home
      </Link>
    </div>
  );
}
