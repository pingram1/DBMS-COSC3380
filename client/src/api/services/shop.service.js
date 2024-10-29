import { api } from '../axios.js';
import API_CONFIG from '../config';

export const shopService = {
  getAllFlavors: async () => {
    try {
      const response = await api.get(API_CONFIG.ENDPOINTS.SHOP.FLAVORS);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getFlavorById: async (id) => {
    try {
      const response = await api.get(`${API_CONFIG.ENDPOINTS.SHOP.FLAVORS}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};