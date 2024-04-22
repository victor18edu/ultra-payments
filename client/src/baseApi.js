import axios from 'axios';

const baseURL = 'http://localhost:80/api';

const baseApi = axios.create({
  baseURL,
  headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': '*',
  },
});

baseApi.interceptors.request.use(
  (config) => {
    config.headers.Accept = 'application/json';
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
export default baseApi;
