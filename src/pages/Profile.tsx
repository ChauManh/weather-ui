import { useEffect, useRef, useState } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { useAuth } from '../contexts/AuthContext';
import { getProfileUser, updateUserAvatar, updateUserFullname } from '../services/userApi';
import { useAlert } from '../contexts/AlertContext';
import { useLoading } from '../contexts/LoadingContext';
import type { User } from '../types/user';

export default function Profile() {
  const [userProfile, setUserProfile] = useState<User | null>(null);
  const { setUser } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showAlert } = useAlert();
  const { showLoading, hideLoading } = useLoading();

  const [isEditingName, setIsEditingName] = useState(false);
  const [editedName, setEditedName] = useState(userProfile?.fullName || '');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getProfileUser();
        if (response.statusCode === 200 && response.result) {
          setUserProfile(response.result);
        }
      } catch (error: unknown) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const err = error as { message?: string };
        throw new Error(err.message || 'Failed to fetch user profile');
      }
    };
    fetchUserProfile();
  }, []);

  const handleEditAvatar = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      showLoading('Avatar uploading...');
      const res = await updateUserAvatar(file);
      if (res.statusCode === 200 && res.result) {
        setUserProfile(res.result);
        setUser(res.result);
        showAlert('success', res.message);
      } else showAlert('error', res.message);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      showAlert('error', 'Has an error');
    } finally {
      hideLoading();
    }
  };

  const handleSaveName = async () => {
    const trimmedName = editedName.trim();
    if (!trimmedName || !userProfile) return;
    try {
      showLoading('Updating name...');
      const res = await updateUserFullname(trimmedName);
      if (res.statusCode === 200 && res.result) {
        setUserProfile(res.result); // cập nhật UI local
        setUser(res.result); // cập nhật context
        showAlert('success', 'Name updated successfully!');
        setIsEditingName(false); // thoát chế độ edit
      } else {
        showAlert('error', res.message || 'Failed to update name');
      }
    } catch (err) {
      showAlert('error', err?.message);
    } finally {
      hideLoading();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-800/40 to-black/30 backdrop-blur-md px-4">
      <div className="w-full max-w-xl bg-white/10 backdrop-blur-md rounded-2xl p-8 text-white shadow-lg">
        <h2 className="text-3xl font-bold text-white/90 mb-8 text-center">Your Profile</h2>

        {/* Avatar + Info */}
        <div className="flex items-center gap-6 mb-8 relative">
          {userProfile?.avatar ? (
            <img
              src={userProfile.avatar}
              alt="Avatar"
              className="w-20 h-20 rounded-full object-cover border-2 border-yellow-400"
            />
          ) : (
            <AiOutlineUser className="text-7xl text-yellow-400" />
          )}
          <div>
            <p className="text-xl font-semibold text-white/90">
              {userProfile?.userName || 'Your name'}
            </p>
            <p className="text-sm text-white/70">ID: {userProfile?.userId}</p>
          </div>

          {/* Avatar edit button */}
          <button
            onClick={handleEditAvatar}
            className="absolute top-0 left-0 bg-yellow-400 text-black text-xs font-semibold px-2 py-1 rounded-md hover:bg-yellow-300 cursor-pointer"
          >
            Edit
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>

        {/* Detail Info */}
        <div className="space-y-5 text-white/90 text-base">
          {/* Full Name */}
          <div className="flex justify-between items-center border-b border-white/20 pb-2">
            <div className="flex-grow">
              <span className="text-white/70">Full Name:</span>{' '}
              {isEditingName ? (
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={editedName}
                    onChange={e => setEditedName(e.target.value)}
                    className="bg-transparent border-b border-yellow-300 text-white outline-none ml-2"
                  />
                  <button
                    onClick={handleSaveName}
                    className="text-sm text-yellow-400 hover:underline cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <span>{userProfile?.fullName || 'N/A'}</span>
              )}
            </div>
            {!isEditingName && (
              <button
                onClick={() => setIsEditingName(true)}
                className="text-sm text-yellow-400 hover:underline cursor-pointer"
              >
                Edit
              </button>
            )}
          </div>

          {/* Email */}
          <div className="flex justify-between items-center border-b border-white/20 pb-2">
            <div>
              <span className="text-white/70">Email:</span> <span>{userProfile?.email}</span>
            </div>
          </div>

          {/* Current City */}
          <div className="flex justify-between items-center border-b border-white/20 pb-2">
            <div>
              <span className="text-white/70">Current City:</span>{' '}
              <span>{userProfile?.currentCity || 'N/A'}</span>
            </div>
            {/* Tạm thời chưa xử lý */}
            <button
              className="text-sm text-yellow-400 hover:underline cursor-not-allowed opacity-60"
              disabled
            >
              Edit
            </button>
          </div>

          {/* Language */}
          <div className="flex justify-between items-center border-b border-white/20 pb-2">
            <div>
              <span className="text-white/70">Language:</span> <span>{userProfile?.language}</span>
            </div>
          </div>

          {/* Measurement Type */}
          <div className="flex justify-between items-center border-b border-white/20 pb-2">
            <div>
              <span className="text-white/70">Measurement Type:</span>{' '}
              <span>{userProfile?.measurementType}</span>
            </div>
          </div>

          {/* Timezone */}
          <div className="flex justify-between items-center">
            <div>
              <span className="text-white/70">Timezone:</span> <span>{userProfile?.timezone}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
