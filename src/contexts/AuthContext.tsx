import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User } from '../types/user';
import { getProfileUser } from '../services/userApi';
import { login, logout } from '../services/authApi';
import type { ApiResponse } from '../types/api';

interface AuthContextProps {
  user: User | null;
  setUser: (user: User) => void;
  handleLogout: () => void;
  handleLogin: (username: string, password: string) => Promise<ApiResponse<User>>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const Authenticate = async () => {
      try {
        const response = await getProfileUser();
        if (response.statusCode === 200 && response.result) {
          setUser(response.result);
        }
      } catch (error: unknown) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const err = error as { message?: string };
        throw new Error(err.message || 'Failed to fetch user profile');
      }
    };
    if (!['/sign-in', '/sign-up'].includes(window.location.pathname)) {
      Authenticate();
    }
  }, []);

  const handleLogin = async (username: string, password: string): Promise<ApiResponse<User>> => {
    const response = await login(username, password);
    if (response.statusCode === 200) {
      setUser(response.result);
    }
    return response;
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, handleLogout, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
