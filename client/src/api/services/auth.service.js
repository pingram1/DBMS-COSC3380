import { api } from '../axios.js';
import API_CONFIG from '../config';

export const authService = {
  customerLogin: async (phoneNumber) => {
    try {
      const response = await api.post(
        API_CONFIG.ENDPOINTS.AUTH.CUSTOMER_LOGIN, 
        { phoneNumber }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  adminLogin: async (credentials) => {
    try {
      const response = await api.post(
        API_CONFIG.ENDPOINTS.AUTH.ADMIN_LOGIN, 
        credentials
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    window.location.href = '/login';
  }
};