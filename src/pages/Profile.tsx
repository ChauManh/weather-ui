import { useNavigate } from 'react-router-dom';
import { AiOutlineUser } from 'react-icons/ai';
import { useAuth } from '../contexts/AuthContext';

export default function Profile() {
  const navigate = useNavigate();
  const { user, setUser, handleLogout } = useAuth();

  const logout = () => {
    handleLogout();
    navigate('/sign-in');
  };

  const handleEditAvatar = () => {
    const newAvatar = prompt('Enter avatar image URL:', user?.avatar || '');
    if (newAvatar?.trim()) {
      setUser({ ...user!, avatar: newAvatar.trim() });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-800/40 to-black/30 backdrop-blur-md px-4">
      <div className="w-full max-w-xl bg-white/10 backdrop-blur-md rounded-2xl p-8 text-white shadow-lg">
        <h2 className="text-3xl font-bold text-white/90 mb-8 text-center">Your Profile</h2>

        {/* Avatar + Info */}
        <div className="flex items-center gap-6 mb-8 relative">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt="Avatar"
              className="w-20 h-20 rounded-full object-cover border-2 border-yellow-400"
            />
          ) : (
            <AiOutlineUser className="text-7xl text-yellow-400" />
          )}
          <div>
            <p className="text-xl font-semibold text-white/90">{user?.userName || 'Your name'}</p>
            <p className="text-sm text-white/70">ID: {user?.userId}</p>
          </div>

          {/* Avatar edit button */}
          <button
            onClick={handleEditAvatar}
            className="absolute top-0 left-0 bg-yellow-400 text-black text-xs font-semibold px-2 py-1 rounded-md hover:bg-yellow-300 cursor-pointer"
          >
            Edit
          </button>
        </div>

        {/* Detail Info */}
        <div className="space-y-5 text-white/90 text-base">
          {/* Full Name */}
          <div className="flex justify-between items-center border-b border-white/20 pb-2">
            <div>
              <span className="text-white/70">Full Name:</span>{' '}
              <span>{user?.fullName || 'N/A'}</span>
            </div>
            <button
              onClick={() => {
                const newName = prompt('Enter new name:', user?.fullName || '');
                if (newName?.trim()) {
                  setUser({ ...user!, fullName: newName.trim() });
                }
              }}
              className="text-sm text-yellow-400 hover:underline cursor-pointer"
            >
              Edit
            </button>
          </div>

          {/* Email */}
          <div className="flex justify-between items-center border-b border-white/20 pb-2">
            <div>
              <span className="text-white/70">Email:</span> <span>{user?.email}</span>
            </div>
          </div>

          {/* Current City */}
          <div className="flex justify-between items-center border-b border-white/20 pb-2">
            <div>
              <span className="text-white/70">Current City:</span>{' '}
              <span>{user?.currentCity || 'N/A'}</span>
            </div>
            <button
              onClick={() => {
                const newCity = prompt('Enter your city:', user?.currentCity || '');
                if (newCity?.trim()) {
                  setUser({ ...user!, currentCity: newCity.trim() });
                }
              }}
              className="text-sm text-yellow-400 hover:underline cursor-pointer"
            >
              Edit
            </button>
          </div>

          {/* Language */}
          <div className="flex justify-between items-center border-b border-white/20 pb-2">
            <div>
              <span className="text-white/70">Language:</span> <span>{user?.language}</span>
            </div>
          </div>

          {/* Measurement Type */}
          <div className="flex justify-between items-center border-b border-white/20 pb-2">
            <div>
              <span className="text-white/70">Measurement Type:</span>{' '}
              <span>{user?.measurementType}</span>
            </div>
          </div>

          {/* Timezone */}
          <div className="flex justify-between items-center">
            <div>
              <span className="text-white/70">Timezone:</span> <span>{user?.timezone}</span>
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
