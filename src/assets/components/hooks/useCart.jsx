
import { useQuery } from "@tanstack/react-query";
import authAxiosInstance from "../../../api/authAxiosInstance.js";

export default function useCart() {
  const getCart = async ({ signal }) => {
    const response = await authAxiosInstance.get("Carts", {
      signal,
    });

    return response.data.response ?? response.data;
  };

  return useQuery({
    queryKey: ["cart"],
    queryFn: getCart,
    enabled: Boolean(localStorage.getItem("token")),
  });
}
