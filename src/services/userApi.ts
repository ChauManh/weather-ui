import axiosInstance from './axiosInstance';
import type { ApiResponse } from '../types/api';
import type { User } from '../types/user';

const createAccount = async (
  username: string,
  email: string,
  password: string
): Promise<ApiResponse<User>> => {
  try {
    const res = await axiosInstance.post<ApiResponse<User>>('/user', { username, email, password });
    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response?.data) {
      return error.response.data as ApiResponse<User>;
    }
    throw error;
  }
};

export { createAccount };
