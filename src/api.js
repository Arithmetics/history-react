import axios from "axios";

export const config = "https://brocktillotson.pagekite.me";
// export const config = "http://localhost:8080";

export const api = axios.create({
  baseURL: config,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Credentials": true,
  },
});
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
