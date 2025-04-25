// API configuration based on environment
const isDevelopment = import.meta.env.MODE === 'development';

// Base URLs for different environments
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ||
  (isDevelopment ? 'http://localhost:8080/api/v1' : 'https://your-backend-api-url.com/api/v1');

// Individual API endpoints
export const API_ENDPOINTS = {
  USER_API: `${API_BASE_URL}/user`,
  COURSE_API: `${API_BASE_URL}/course`,
  PURCHASE_API: `${API_BASE_URL}/purchase`,
  MEDIA_API: `${API_BASE_URL}/media`,
};

export default API_ENDPOINTS;
