import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User } from '../types/user';
import { getProfileUser } from '../services/userApi';
import { login, logout } from '../services/authApi';
import type { ApiResponse } from '../types/api';

interface AuthContextProps {
  user: User | null;
  setUser: (user: User) => void;
  isAuthenticated: boolean;
  handleLogout: () => void;
  loading: boolean;
  handleLogin: (username: string, password: string) => Promise<ApiResponse<User>>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getProfileUser();
        console.log('getProfileUser response:', response);
        if (response.statusCode === 200) {
          setUser(response.result);
          setIsAuthenticated(true);
        }
      } catch (error: unknown) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const err = error as { message?: string };
      } finally {
        setLoading(false); // Đảm bảo luôn chạy
      }
    };
    if (document.cookie.includes('access_token') || window.location.pathname !== '/sign-in') {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = async (username: string, password: string): Promise<ApiResponse<User>> => {
    const response = await login(username, password);
    if (response.statusCode === 200) {
      setUser(response.result);
      setIsAuthenticated(true);
    }
    return response;
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, handleLogout, handleLogin, isAuthenticated, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
