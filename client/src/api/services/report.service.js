import API_CONFIG from '../config';
import { api } from '../axios';

export const reportService = {
  getMonthlySales: async (flavor, startDate, endDate) => {
    try {
      const response = await api.get(API_CONFIG.ENDPOINTS.REPORTS.MONTHLY_SALES, {
        params: { flavor, startDate, endDate },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching monthly sales report:', error);
      throw error;
    }
  },
  
  getMonthlyToppingSales: async (topping, startDate, endDate) => {
    try {
      const response = await api.get(API_CONFIG.ENDPOINTS.REPORTS.MONTHLY_TOPPING_SALES, {
        params: { topping, startDate, endDate },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching monthly topping sales report:', error);
      throw error;
    }
  },

  getItemAggregate: async (itemType, startDate, endDate) => {
    try {
      const response = await api.get(API_CONFIG.ENDPOINTS.REPORTS.ITEM_AGGREGATE, {
        params: { itemType, startDate, endDate },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching item aggregate report:', error);
      throw error;
    }
  },

  getAllFlavors: async () => {
    try {
      const response = await api.get(API_CONFIG.ENDPOINTS.REPORTS.FLAVORS);
      return response.data;
    } catch (error) {
      console.error('Error fetching all flavors:', error);
      throw error;
    }
  },

  getAllToppings: async () => {
    console.log("topping test");
    try {
      const response = await api.get(API_CONFIG.ENDPOINTS.REPORTS.TOPPINGS);
      return response.data;
    } catch (error) {
      console.error('Error fetching all toppings:', error);
      throw error;
    }
  },

  getAggregateFlavorSales: async (startDate, endDate) => {
    const response = await api.get(API_CONFIG.ENDPOINTS.REPORTS.AGGREGATE_FLAVOR_SALES, {
        params: { startDate, endDate },
    });
    return response.data;
  },

  getAggregateToppingSales: async (startDate, endDate) => {
    const response = await api.get(API_CONFIG.ENDPOINTS.REPORTS.AGGREGATE_TOPPING_SALES, {
        params: { startDate, endDate },
    });
    return response.data;
  },

  getFlavorToppingHeatmap: async (startDate, endDate) => {
    const response = await api.get(API_CONFIG.ENDPOINTS.REPORTS.FLAVOR_TOPPING_HEATMAP, {
        params: { startDate, endDate },
    });
    return response.data;
  },
};
