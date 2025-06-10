import axiosInstance from './axiosInstance';
import type { ApiResponse } from '../types/api';
import type { CurrentWeather } from '../types/weather/currentWeather';
import type { HourlyForecast } from '../types/weather/hourlyForecastWeather';
import type { DailyForecast } from '../types/weather/dailyForecastWeather';
import type { HistoryWeather } from '../types/weather/historyWeather';

const getCurrentWeatherById = async (city_id: number): Promise<ApiResponse<CurrentWeather>> => {
  try {
    const res = await axiosInstance.get<ApiResponse<CurrentWeather>>('/weather', {
      params: { city_id },
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

const getDailyForecastWeatherById = async (
  city_id: number
): Promise<ApiResponse<DailyForecast[]>> => {
  try {
    const res = await axiosInstance.get('/weather/forecast/daily', {
      params: { city_id },
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

const getHistoryWeatherById = async (city_id: number): Promise<ApiResponse<HistoryWeather[]>> => {
  try {
    const res = await axiosInstance.get('/weather/history', {
      params: { city_id },
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

export {
  getCurrentWeatherById,
  getHourlyForecastWeatherById,
  getDailyForecastWeatherById,
  getHistoryWeatherById,
};
