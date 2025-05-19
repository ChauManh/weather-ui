import axiosInstance from './axiosInstance';
import type { ApiResponse } from '../types/api';

const login = async (username: string, password: string): Promise<ApiResponse> => {
  try {
    const res = await axiosInstance.post<ApiResponse>('/auth/login', { username, password });
    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response?.data) {
      return error.response.data as ApiResponse;
    }
    throw error;
  }
};

export { login };
