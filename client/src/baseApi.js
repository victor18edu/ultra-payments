import axios from 'axios';

const baseURL = 'http://localhost:80/api';

const baseApi = axios.create({
  baseURL,
});

export default baseApi;
