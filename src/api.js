import axios from 'axios';

export const config =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080'
    : 'https://brocktillotson.pagekite.me';

export const api = axios.create({
  baseURL: config,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': true,
  },
});
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
