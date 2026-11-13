import { useMutation, useQueryClient } from "@tanstack/react-query";
import authAxiosInstance from "../../../api/authAxiosInstance.js";

export default function useRemoveItemCart() {
  const queryClient = useQueryClient();

  const removeItem = async (itemId) => {
    const response = await authAxiosInstance.delete(
      `Carts/${encodeURIComponent(itemId)}`
    );

    return response.data;
  };

  return useMutation({
    mutationFn: removeItem,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });
}