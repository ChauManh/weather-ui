// src/pages/Profile.tsx
import { useNavigate, Navigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
import { AiOutlineUser } from 'react-icons/ai';

export default function Profile() {
  //   const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  // Trong khi đang load user
  //   if (loading) {
  //     return (
  //       <div className="flex-1 flex items-center justify-center text-white">
  //         Loading…
  //       </div>
  //     );
  //   }

  // Nếu chưa login, chuyển về SignIn
  //   if (!user) {
  //     return <Navigate to="/sign-in" replace />;
  //   }

  const handleLogout = async () => {
    navigate('/sign-in');
  };

  return (
    <div className="flex justify-center p-6">
      <div className="w-full max-w-md bg-black/20 backdrop-blur-md rounded-2xl p-8 text-white">
        <h2 className="text-2xl font-semibold mb-6">Your Profile</h2>

        {/* Avatar */}
        <div className="flex items-center gap-4 mb-6">
          <AiOutlineUser className="text-6xl text-yellow-400" />
          <div>
            <p className="font-medium">Châu Đức Mạnh</p>
            <p className="text-sm text-white/80">ID: 22520846</p>
          </div>
        </div>

        {/* Thông tin */}
        <div className="space-y-4 mb-6">
          <div>
            <span className="font-medium">Email:</span>{' '}
            <span className="text-white/90">chaumanh1108@gmail.com</span>
          </div>
          {/* Nếu bạn có thêm fields khác, ví dụ joinedAt */}
          {/* {user.joinedAt && (
            <div>
              <span className="font-medium">Joined:</span>{' '}
              <span className="text-white/90">{new Date(user.joinedAt).toLocaleDateString()}</span>
            </div>
          )} */}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full py-2 rounded-md bg-red-500 hover:bg-red-600 transition font-semibold"
        >
          Log out
        </button>
      </div>
    </div>
  );
}
