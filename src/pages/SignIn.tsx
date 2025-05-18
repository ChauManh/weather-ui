import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function SignIn() {
  const [showForm, setShowForm] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const isFormValid = username.trim() !== '' && password.trim() !== '';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-700">
      <div className="w-full max-w-4xl flex flex-col md:flex-row bg-white/10 backdrop-blur-md rounded-xl overflow-hidden">
        {/* Left Section */}
        <div className="w-full md:w-1/2 p-8 md:p-10 text-white bg-gradient-to-b from-cyan-500 to-purple-700 flex flex-col justify-center items-center">
          <img src={logo} alt="Logo" className="w-50 h-50 mb-4 object-contain" />
          <h1 className="text-2xl md:text-3xl font-bold mb-4">WEATHER FORECAST</h1>
          <p className="text-xs md:text-sm text-center">
            Stay one step ahead with accurate, real-time weather forecasts tailored just for you.
          </p>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-center items-center bg-black/30 text-white">
          {!showForm ? (
            <>
              <button
                onClick={() => setShowForm(true)}
                className="w-full py-2 mb-4 rounded-md border border-white font-semibold hover:bg-yellow-500 transition cursor-pointer hover:text-black"
              >
                Log in
              </button>
              <Link
                to="/sign-up"
                className="w-full py-2 mb-4 flex items-center justify-center rounded-md border border-white hover:bg-yellow-400 hover:text-black transition font-semibold"
              >
                Create account
              </Link>
              <Link
                to="/"
                className="w-full py-2 mb-4 flex items-center justify-center rounded-md border border-white hover:bg-yellow-400 hover:text-black transition font-semibold"
              >
                Use as guest
              </Link>
            </>
          ) : (
            <form className="w-full flex flex-col gap-4" onSubmit={e => e.preventDefault()}>
              <h2 className="w-full text-2xl md:text-3xl font-bold text-yellow-400 mb-2 text-center">
                Log in
              </h2>

              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-white/20 placeholder-white/80 focus:outline-none"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-white/20 placeholder-white/80 focus:outline-none"
              />

              <div className="w-full text-right text-sm underline cursor-pointer">
                Forgot password?
              </div>

              <button
                type="button"
                className="w-full py-2 rounded-md border border-white bg-white text-black font-semibold hover:opacity-80 flex justify-center items-center gap-2 cursor-pointer"
              >
                <FcGoogle size={20} /> Continue with Google
              </button>

              <Link
                to="/"
                className="w-full py-2 mb-4 flex items-center justify-center rounded-md border border-white hover:bg-yellow-400 hover:text-black transition font-semibold"
              >
                Use as guest
              </Link>

              <div className="text-sm text-center">
                Don’t have an account?{' '}
                <Link to="/sign-up" className="underline text-yellow-400">
                  Create Account
                </Link>
              </div>

              <button
                type="submit"
                disabled={!isFormValid}
                className={`
                  w-full py-2 rounded-md font-semibold transition
                  ${
                    isFormValid
                      ? ' hover:bg-yellow-400 hover:text-black rounded-md border border-white text-white cursor-pointer'
                      : 'bg-gray-400 text-white cursor-not-allowed'
                  }
                `}
              >
                Log in
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
