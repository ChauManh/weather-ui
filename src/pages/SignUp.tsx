import { useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineExclamationCircle } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { createAccount } from '../services/userApi';
import { useLoading } from '../contexts/LoadingContext';
import { useAlert } from '../contexts/AlertContext';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const usernameRegex = /^[a-zA-Z0-9_]+$/;

export default function SignUp() {
  const { showLoading, hideLoading } = useLoading();
  const { showAlert } = useAlert();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');

  const navigate = useNavigate();

  // Debounce mỗi trường trong 1s
  useEffect(() => {
    const timer = setTimeout(() => {
      if (username && !usernameRegex.test(username)) {
        setUsernameError('Username cannot contain spaces or special characters');
      } else {
        setUsernameError('');
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [username]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (email && !emailRegex.test(email)) {
        setEmailError('Invalid email');
      } else {
        setEmailError('');
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [email]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (password && password.length < 6) {
        setPasswordError('Password must be 6 characters or longer');
      } else {
        setPasswordError('');
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [password]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (confirm && confirm !== password) {
        setConfirmError('Confirmation password does not match');
      } else {
        setConfirmError('');
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [confirm, password]);

  const isFormValid =
    username &&
    email &&
    password &&
    confirm &&
    !usernameError &&
    !emailError &&
    !passwordError &&
    !confirmError;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    showLoading();
    const result = await createAccount(username, email, password);
    if (result.statusCode === 200) {
      showAlert('success', result.message);
      navigate('/sign-in');
    } else {
      showAlert('error', result.message);
    }
    hideLoading();
  };

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
          <h2 className="w-full text-2xl md:text-3xl font-bold text-yellow-400 mb-6 text-center">
            Create Account
          </h2>

          <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
            {/* Username */}
            <div className="relative">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className={`w-full px-4 py-2 rounded-md bg-white/20 placeholder-white/80 focus:outline-none ${
                  usernameError ? 'border border-red-400 pr-10' : ''
                }`}
              />
              {usernameError && (
                <AiOutlineExclamationCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400 text-xl" />
              )}
            </div>
            {usernameError && <p className="text-sm text-red-400">{usernameError}</p>}

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className={`w-full px-4 py-2 rounded-md bg-white/20 placeholder-white/80 focus:outline-none ${
                  emailError ? 'border border-red-400 pr-10' : ''
                }`}
              />
              {emailError && (
                <AiOutlineExclamationCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400 text-xl" />
              )}
            </div>
            {emailError && <p className="text-sm text-red-400">{emailError}</p>}

            {/* Password */}
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className={`w-full px-4 py-2 rounded-md bg-white/20 placeholder-white/80 focus:outline-none ${
                  passwordError ? 'border border-red-400 pr-10' : ''
                }`}
              />
              {passwordError && (
                <AiOutlineExclamationCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400 text-xl" />
              )}
            </div>
            {passwordError && <p className="text-sm text-red-400">{passwordError}</p>}

            {/* Confirm Password */}
            <div className="relative">
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                className={`w-full px-4 py-2 rounded-md bg-white/20 placeholder-white/80 focus:outline-none ${
                  confirmError ? 'border border-red-400 pr-10' : ''
                }`}
              />
              {confirmError && (
                <AiOutlineExclamationCircle className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400 text-xl" />
              )}
            </div>
            {confirmError && <p className="text-sm text-red-400">{confirmError}</p>}

            {/* Google */}
            <button
              type="button"
              className="w-full py-2 rounded-md border border-white bg-white text-black font-semibold hover:opacity-80 cursor-pointer flex justify-center items-center gap-2"
            >
              <FcGoogle size={20} /> Sign up with Google
            </button>

            {/* Submit */}
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full py-2 rounded-md font-semibold transition ${
                isFormValid
                  ? 'hover:bg-yellow-400 hover:text-black border border-white text-white cursor-pointer'
                  : 'bg-gray-400 text-white cursor-not-allowed'
              }`}
            >
              Sign up
            </button>
          </form>

          <p className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link to="/sign-in" className="underline text-yellow-400">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
