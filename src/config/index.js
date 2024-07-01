export const ENVIRONMENT = import.meta.env.VITE_NODE_ENV || "development";
export const X_API_KEY = process.env.VITE_X_API_KEY_SECRET || "ddapi";
export const API_URL =
  `${import.meta.env.VITE_API_URL}/v1/api` || "http://localhost:8080/v1/api";
