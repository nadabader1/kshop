import { useQuery } from "@tanstack/react-query";
import authAxiosInstance from "../api/authAxiosInstance.js";
import { useAuthStore } from "../store/authStore";

export default function useCart() {
  const token = useAuthStore((state) => state.token);

  const getCart = async () => {
    const response = await authAxiosInstance.get("Carts");
    return response.data;
  };

  return useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
    enabled: !!token,
  });
}