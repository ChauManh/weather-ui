import { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const isFormValid =
    username.trim() !== '' && email.trim() !== '' && password.trim() !== '' && password === confirm;

  //   const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    // TODO: gọi API đăng ký
    // navigate('/sign-in');
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
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-white/20 placeholder-white/80 focus:outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-white/20 placeholder-white/80 focus:outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-white/20 placeholder-white/80 focus:outline-none"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-white/20 placeholder-white/80 focus:outline-none"
            />

            <button
              type="button"
              className="w-full py-2 rounded-md border border-white bg-white text-black font-semibold hover:opacity-80 cursor-pointer flex justify-center items-center gap-2"
            >
              <FcGoogle size={20} /> Sign up with Google
            </button>

            <button
              type="submit"
              disabled={!isFormValid}
              className={`
                w-full py-2 rounded-md font-semibold transition
                ${
                  isFormValid
                    ? 'hover:bg-yellow-400 hover:text-black rounded-md border border-white text-white cursor-pointer'
                    : 'bg-gray-400 text-white cursor-not-allowed'
                }
              `}
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
