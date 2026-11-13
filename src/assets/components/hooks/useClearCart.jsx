import { useMutation, useQueryClient } from "@tanstack/react-query";
import authAxiosInstance from "../api/authAxiosInstance";

export default function useClearCart() {
  const queryClient = useQueryClient();

  const clearCart = async () => {
    await authAxiosInstance.delete("Carts/clear");
  };

  return useMutation({
    mutationFn: clearCart,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["cart"] }),
  });
}