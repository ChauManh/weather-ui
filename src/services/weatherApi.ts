import axiosInstance from './axiosInstance';
import type { ApiResponse } from '../types/api';
import type { CurrentWeather } from '../types/weather/currentWeather';
import type { HourlyForecast } from '../types/weather/hourlyForecastWeather';

const getCurrentWeatherById = async (city_id: number): Promise<ApiResponse<CurrentWeather>> => {
  try {
    const res = await axiosInstance.get<ApiResponse<CurrentWeather>>('/weather', {
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

const getHourlyForecastWeatherById = async (
  city_id: number,
  page: number,
  limit: number
): Promise<ApiResponse<{ data: HourlyForecast[]; total: number; page: number; limit: number }>> => {
  try {
    const res = await axiosInstance.get('/weather/forecast/hourly', {
      params: { city_id, page, limit },
    });
    return res.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.response?.data) {
      return error.response.data;
    }
    throw error;
  }
};

export { getCurrentWeatherById, getHourlyForecastWeatherById };
