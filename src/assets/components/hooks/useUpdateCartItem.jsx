import { useMutation, useQueryClient } from "@tanstack/react-query";
import authAxiosInstance from "../../../api/authAxiosInstance.js";

export default function useUpdateCartItem() {
  const queryClient = useQueryClient();

  const updateCartItem = async ({ productId, count }) => {
    const response = await authAxiosInstance.put(
      `Carts/${encodeURIComponent(productId)}`,
      {
        Count: count,
      }
    );

    return response.data;
  };

  return useMutation({
    mutationFn: updateCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });
}