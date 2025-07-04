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

const getProfileUser = async (): Promise<ApiResponse<User>> => {
  try {
    const res = await axiosInstance.get<ApiResponse<User>>('/user');
    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response?.data) {
      return error.response.data as ApiResponse<User>;
    }
    throw error;
  }
};

const updateUserAvatar = async (file: File): Promise<ApiResponse<User>> => {
  try {
    const formData = new FormData();
    formData.append('avatar', file);
    const res = await axiosInstance.patch<ApiResponse<User>>('/user/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response?.data) {
      return error.response.data as ApiResponse<User>;
    }
    throw error;
  }
};

const updateUserFullname = async (fullname: string): Promise<ApiResponse<User>> => {
  try {
    const res = await axiosInstance.patch<ApiResponse<User>>('/user/fullname', {
      fullname,
    });
    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response?.data) {
      return error.response.data as ApiResponse<User>;
    }
    throw error;
  }
};

export { createAccount, getProfileUser, updateUserAvatar, updateUserFullname };
