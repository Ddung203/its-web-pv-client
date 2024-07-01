import axios from "axios";
import { API_URL } from "../config";

const http = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-type": "application/json",
  },
  timeout: 10000, // Timeout after 10 seconds
  withCredentials: true, // Allow sending cookies when cross-origin requests
});

// Function to add token to request header
const addTokenToRequest = (config) => {
  const token = JSON.parse(localStorage.getItem("user"))?.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

// Interceptor to add token to each request
http.interceptors.request.use(addTokenToRequest);

// Function to refresh token
const refreshToken = async () => {
  const refreshToken = JSON.parse(localStorage.getItem("user"))?.refreshToken;
  try {
    const response = await axios.post(`${API_URL}/refresh-token`, {
      refreshToken,
    });
    const newToken = response.data.accessToken;

    // Update token in localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    user.accessToken = newToken;
    localStorage.setItem("user", JSON.stringify(user));

    return newToken;
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error;
  }
};

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

http.interceptors.response.use(
  (response) => {
    // Handle successful responses before returning data
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = `Bearer ${token}`;
            return http(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise(async (resolve, reject) => {
        try {
          const newToken = await refreshToken();
          http.defaults.headers.common["Authorization"] = "Bearer " + newToken;
          originalRequest.headers["Authorization"] = "Bearer " + newToken;
          processQueue(null, newToken);
          resolve(http(originalRequest));
        } catch (err) {
          processQueue(err, null);
          reject(err);
        } finally {
          isRefreshing = false;
        }
      });
    }

    return Promise.reject(error); // Let the next interceptor handle it
  }
);

const HTTP = {
  get: (url, config = {}) => http.get(url, config),
  post: (url, data, config = {}) => http.post(url, data, config),
  put: (url, data, config = {}) => http.put(url, data, config),
  delete: (url, config = {}) => http.delete(url, config),
};

export default HTTP;
