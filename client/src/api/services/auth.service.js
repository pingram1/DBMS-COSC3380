import { api } from '../axios';
import API_CONFIG from '../config';

export const authService = {
  customerLogin: async (phoneNumber) => {
    try {
      return await api.post(
        API_CONFIG.ENDPOINTS.AUTH.CUSTOMER_LOGIN, 
        { phoneNumber }
      );
    } catch (error) {
      throw error;
    }
  },

  adminLogin: async (credentials) => {
    try {
      return await api.post(
        API_CONFIG.ENDPOINTS.AUTH.ADMIN_LOGIN, 
        credentials
      );
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