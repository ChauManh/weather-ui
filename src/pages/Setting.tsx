import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Setting() {
  const { handleLogout, user } = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    handleLogout();
    navigate('/sign-in');
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-purple-700/30 to-indigo-900/40 text-white">
      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-yellow-400">Settings</h1>

        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-white/80 mb-2">Account Info</h2>
            <div className="bg-black/20 p-4 rounded-md space-y-2">
              <div className="flex justify-between">
                <span className="text-white/70">Full Name:</span>
                <span>{user?.fullName || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Email:</span>
                <span>{user?.email || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Timezone:</span>
                <span>{user?.timezone || 'N/A'}</span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-white/80 mb-2">Preferences</h2>
            <div className="bg-black/20 p-4 rounded-md space-y-3">
              <div className="flex justify-between">
                <span className="text-white/70">Language:</span>
                <span>{user?.language || 'English'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/70">Measurement Type:</span>
                <span>{user?.measurementType || 'Metric'}</span>
              </div>
            </div>
          </div>

          {/* Placeholder for future settings */}
          <div>
            <h2 className="text-lg font-semibold text-white/80 mb-2">More Settings</h2>
            <div className="bg-black/20 p-4 rounded-md text-white/50 italic">
              Feature coming soon...
            </div>
          </div>
        </div>
        {/* Logout */}
        <button
          onClick={logout}
          className="w-full mt-8 py-2 rounded-md bg-red-500 hover:bg-red-600 transition font-semibold text-white cursor-pointer"
        >
          Log out
        </button>
      </div>
    </div>
  );
}
