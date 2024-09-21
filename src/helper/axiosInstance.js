import axios from "axios";
import { API_URL, X_API_KEY } from "../config";

const http = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json",
  },
  timeout: 10000,
  withCredentials: true, // Cho phép gửi cookie khi yêu cầu cross-origin
});

const addTokenToRequest = (config) => {
  const accessToken = JSON.parse(localStorage.getItem("accessToken"));
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
    config.headers["x-api-key"] = X_API_KEY;
  }
  return config;
};

http.interceptors.request.use(addTokenToRequest);

http.interceptors.response.use(
  (response) => response.data,
  (err) => {
    // console.log("HTTP Interceptor error: ", err);
    // console.log("HTTP Interceptor error response: ", err.response.data);

    if (err.response.data.error.name === "TokenExpiredError") {
      localStorage.clear();
    }
    return Promise.reject(err?.response?.data);
  }
);

const HTTP = {
  get: (url, config = {}) => http.get(url, config),
  post: (url, data, config = {}) => http.post(url, data, config),
  put: (url, data, config = {}) => http.put(url, data, config),
  delete: (url, config = {}) => http.delete(url, config),
};

export default HTTP;
