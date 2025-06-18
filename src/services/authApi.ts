import axios from 'axios';
import axiosInstance from './axiosInstance';
import type { ApiResponse } from '../types/api';
import type { User } from '../types/user';

const login = async (username: string, password: string): Promise<ApiResponse<User>> => {
  try {
    const res = await axiosInstance.post<ApiResponse<User>>('/auth/login', { username, password });
    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response?.data) {
      return error.response.data as ApiResponse<User>;
    }
    throw error;
  }
};

const logout = async () => {
  try {
    const res = await axiosInstance.post<ApiResponse>('/auth/logout');
    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response?.data) {
      return error.response.data as ApiResponse;
    }
    throw error;
  }
};

const refreshToken = async () => {
  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/auth/refresh`,
    {},
    { withCredentials: true }
  );
  return res.data;
};

export { login, logout, refreshToken };
