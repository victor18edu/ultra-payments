// authApi.js
import baseApi from '../../../baseApi';


export const login = async (credentials) => {
    try {
      const response = await baseApi.post('/login', credentials);
      const { token } = response.data;
      return token;
    } catch (error) {
      throw new Error('Failed to login');
    }
  };

export const signup = async (userData) => {
  try {
    const response = await baseApi.post('/register', userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
