import axios from 'axios';

const baseURL = 'http://localhost:80/api';

const baseApi = axios.create({
  baseURL,
});

baseApi.interceptors.request.use(
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

export default baseApi;
