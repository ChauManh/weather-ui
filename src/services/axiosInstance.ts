import axios from 'axios';
import { refreshToken } from './authApi';

const API_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Rất quan trọng để gửi cookie (access_token)
});

// Request interceptor (không cần gắn Authorization nếu dùng cookie)
axiosInstance.interceptors.request.use(
  config => {
    // Bạn có thể log config nếu muốn debug
    return config;
  },
  error => Promise.reject(error)
);

// Response interceptor – auto refresh nếu gặp lỗi 401
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // Đường dẫn KHÔNG nên auto-refresh
    const noRefreshRoutes = ['/auth/login', '/auth/refresh'];

    const shouldSkip = noRefreshRoutes.some(route => originalRequest.url?.includes(route));

    if (error.response?.status === 401 && !originalRequest._retry && !shouldSkip) {
      originalRequest._retry = true;

      try {
        const res = await refreshToken();
        if (res?.statusCode === 200) {
          return axiosInstance(originalRequest);
        }
      } catch (refreshErr) {
        window.location.href = '/sign-in';
        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
