import axios from "axios";
import { useAuthStore } from "../store/authStore";

const authAxiosInstance = axios.create({
  baseURL: "https://knowledgeshop.runasp.net/api",
  headers: {
    "Accept-Language": "en",
  },
});

authAxiosInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default authAxiosInstance;