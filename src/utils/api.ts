import axios from "axios";

export const api = axios.create({
  baseURL: `${import.meta.env.APP_API_URL}`,
  headers: {
    "Content-type": "application/json",
    "X-UID": localStorage.__X_UID__,
    "X-LANG": localStorage.__LANGUAGE__,
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  const timestamp = Date.now().toString();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  config.headers["X-TIMESTAMP"] = timestamp;
  config.headers["X-API-KEY"] = "dqKFrLz!q#tKG3";
  return config;
});
