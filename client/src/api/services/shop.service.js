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
  },

  createFlavor: async (flavorData) => {
    try {
      const response = await api.post(API_CONFIG.ENDPOINTS.SHOP.FLAVORS, flavorData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateFlavor: async (id, flavorData) => {
    try {
      const response = await api.put(`${API_CONFIG.ENDPOINTS.SHOP.FLAVORS}/${id}`, flavorData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteFlavor: async (id) => {
    try {
      const response = await api.delete(`${API_CONFIG.ENDPOINTS.SHOP.FLAVORS}/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateQuantity: async (id, quantity, userRole) => {
    try {
      const response = await api.put(`${API_CONFIG.ENDPOINTS.SHOP.FLAVORS}/${id}/quantity`, {
        quantity: parseInt(quantity),
        userRole
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  getInventoryLogs: async (startDate, endDate) => {
    try {
      const response = await api.get(`${API_CONFIG.ENDPOINTS.SHOP.INVENTORY_LOGS}`, {
        params: {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString()
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};