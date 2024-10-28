import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling 
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API endpoints
const authAPI = {
  customerLogin: (phoneNumber) => 
    api.post('/api/auth/customer/login', { phoneNumber }),
  
  adminLogin: (credentials) => 
    api.post('/api/auth/admin/login', credentials),
    
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
  }
};

// Shop API endpoints
const shopAPI = {
  getAllFlavors: () => 
    api.get('/api/shop/all-flavors'),
  
  getFlavorById: (id) => 
    api.get(`/api/shop/all-flavors/${id}`)
};

// Employee API endpoints (for admin)
// TBD
const employeeAPI = {
  getAllEmployees: () => 
    api.get('/api/employee'),
  
  getEmployeeById: (id) => 
    api.get(`/api/employee/${id}`),
  
  createEmployee: (employeeData) => 
    api.post('/api/employee', employeeData),
  
  updateEmployee: (id, employeeData) => 
    api.put(`/api/employee/${id}`, employeeData),
  
  deleteEmployee: (id) => 
    api.delete(`/api/employee/${id}`)
};

export {
  api as default,
  authAPI,
  shopAPI,
  employeeAPI
};