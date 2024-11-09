import { api } from '../axios.js';
import API_CONFIG from '../config';

export const customerService = {
  getAccount: async () => {
    try {
      const response = await api.get(API_CONFIG.ENDPOINTS.CUSTOMER.ACCOUNT);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getOrders: async () => {
    try {
      const response = await api.get(API_CONFIG.ENDPOINTS.CUSTOMER.ORDERS);
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  }
};