import baseApi from '../../baseApi';

export const login = async (email, password) => {
  try {
    const response = await baseApi.post('/login', { email, password });
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      throw new Error('Credenciais inválidas. Por favor, verifique seu e-mail e senha.');
    } else {
      throw error;
    }
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
