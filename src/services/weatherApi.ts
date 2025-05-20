import axiosInstance from './axiosInstance';
import type { ApiResponse } from '../types/api';
import type { CurrentWeather } from '../types/currentWeather';

const getCurrentWeatherById = async (city_id: number): Promise<ApiResponse<CurrentWeather>> => {
  try {
    const res = await axiosInstance.get<ApiResponse<CurrentWeather>>('/weather/by-id', {
      params: { city_id: city_id },
    });
    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response?.data) {
      return error.response.data as ApiResponse<CurrentWeather>;
    }
    throw error;
  }
};

export { getCurrentWeatherById };
