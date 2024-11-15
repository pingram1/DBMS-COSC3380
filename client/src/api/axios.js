import axios from 'axios';
import API_CONFIG from './config';

const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    headers: API_CONFIG.HEADERS.DEFAULT
  });

  // Request interceptor
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      console.error('Request error:', error);
      return Promise.reject(error);
    }
  );

  // Response interceptor
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      const { response } = error;

      if (response?.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        window.location.href = '/login';
      }

      return Promise.reject({
        status: response?.status,
        message: response?.data?.error || error.message,
        originalError: error
      });
    }
  );

  return instance;
};

export const api = createAxiosInstance();