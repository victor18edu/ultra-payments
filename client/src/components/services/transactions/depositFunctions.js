import baseApi from '../../../baseApi';

export const fetchDeposits = async () => {
  try {
    const response = await baseApi.get('/deposits');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createDeposit = async (depositData) => {
  try {
    const response = await baseApi.post('/deposits', depositData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
