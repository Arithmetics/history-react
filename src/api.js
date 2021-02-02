import axios from 'axios';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';

export const config =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? 'http://localhost:8080'
    : 'https://brocktillotson.pagekite.me';

export function isJSONTokenExpired(token) {
  const cleanToken = token.replace('Bearer ', '');
  const expireTimeStamp = jwt_decode(cleanToken).exp * 1000;
  const nowTimeStamp = Date.now();
  if (expireTimeStamp - nowTimeStamp < 0) {
    return true;
  }
  return false;
}

export const api = axios.create({
  baseURL: config,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': true,
  },
});
api.interceptors.request.use(
  (interceptedConfig) => {
    const edittedConfig = { ...interceptedConfig };
    const token = localStorage.getItem('token');

    if (token) {
      if (isJSONTokenExpired(token)) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location = '/login';
        throw new Error('JWT Expired');
      }

      edittedConfig.headers.Authorization = `${token}`;
    }
    return interceptedConfig;
  },
  (error) => Promise.reject(error),
);
