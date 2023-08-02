import axios from 'axios';

export const API = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
});

export const setAuthToken = (token) => {
  if (token) {
    API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete API.defaults.headers.common['Authorization'];
  }
};