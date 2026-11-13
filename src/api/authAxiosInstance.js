import axios from "axios";

const authAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
  headers: {
    "Accept-Language": "en",
  },
});

authAxiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default authAxiosInstance;