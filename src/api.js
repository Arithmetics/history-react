import axios from 'axios';

export const baseURLConfig =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080'
    : 'https://brocktillotson.pagekite.me';

export const api = axios.create({
  baseURL: baseURLConfig,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': true,
  },
});
api.interceptors.request.use(
  (config) => {
    const edittedConfig = { ...config };
    const token = localStorage.getItem('token');
    if (token) {
      // eslint-disable-next-line dot-notation
      edittedConfig.headers['Authorization'] = `${token}`;
    }
    return edittedConfig;
  },
  (error) => Promise.reject(error),
);
