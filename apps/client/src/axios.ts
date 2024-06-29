import axios from "axios";
import { useStore } from "./store";

const BASE_URL = "http://localhost:3000/api";

export const guestAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const authAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

authAxios.interceptors.request.use(
  (config) => {
    const token = useStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

authAxios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { refreshAuthToken, clearToken, navigate } = useStore.getState();

    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshAuthToken();
        authAxios.defaults.headers.common["Authorization"] =
          `Bearer ${newToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return authAxios(originalRequest);
      } catch (refreshError) {
        clearToken();
        if (navigate)
          navigate("/login", { state: { from: originalRequest.url } });
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
