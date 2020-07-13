import axios from 'axios';
import { AsyncStorage } from 'react-native';

import { config } from '../../config';
import { getToken } from '../services/auth';

const api = axios.create({
  baseURL: config.url
});

api.interceptors.request.use(async (config) => {
  try {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  } catch (error) {
    console.log(error);
  }
});

export default api;