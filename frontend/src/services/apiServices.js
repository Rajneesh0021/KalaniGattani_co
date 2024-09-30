import axios from 'axios';

// Base configuration for Axios
const api = axios.create({
  baseURL: 'http://localhost:5000/api',  // Update with your backend API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add an interceptor to include token in requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');  // Fetch the token from 
  if (token) {
    config.headers['Authorization'] = `${token}`;  // Add token to Authorization header
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Fetch data (GET)
export const fetchData = async (url) => {
  try {
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// Post data (POST)
export const postData = async (url, data) => {
  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

// Update data (PUT)
export const updateData = async (url, data) => {
  try {
    const response = await api.put(url, data);
    return response.data;
  } catch (error) {
    console.error('Error updating data:', error);
    throw error;
  }
};

// Delete data (DELETE)
export const deleteData = async (url) => {
  try {
    const response = await api.delete(url);
    return response.data;
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
};
