import axios from 'axios';
// import { refreshToken } from './authApi';
const API_URL = import.meta.env.VITE_API_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// axiosInstance.interceptors.response.use(
//   response => response,
//   async error => {
//     if (error.response.status === 401) {
//       const res = await refreshToken();
//       if (res.EC === 0) {
//         localStorage.setItem('access_token', res.result.access_token);
//         error.config.headers['Authorization'] = `Bearer ${res.result.access_token}`;
//         return axiosInstance(error.config); // Thực hiện lại request với token mới
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
