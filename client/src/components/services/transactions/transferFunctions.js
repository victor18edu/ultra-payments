import baseApi from '../../../baseApi';

export const fetchTransfers = async () => {
  try {
    const response = await baseApi.get('/transfers');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createTransfer = async (depositData) => {
  try {
    const response = await baseApi.post('/transfer', depositData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
