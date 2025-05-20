import axiosInstance from './axiosInstance';
import type { ApiResponse } from '../types/api';
import type { CitySuggestion } from '../types/city/citySuggestion';

export const suggestCity = async (keyword: string): Promise<ApiResponse<CitySuggestion[]>> => {
  try {
    const res = await axiosInstance.get<ApiResponse<CitySuggestion[]>>('/city/suggest', {
      params: { keyword },
    });
    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response?.data) {
      return error.response.data as ApiResponse<CitySuggestion[]>;
    }
    throw error;
  }
};
