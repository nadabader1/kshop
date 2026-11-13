import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../api/axiosInstance.js";

export default function useProduct(id) {
  const getProductDetails = async ({ signal }) => {
    const response = await axiosInstance.get(
      `Products/${encodeURIComponent(id)}`,
      { signal }
    );

    return response.data.response ?? null;
  };

  return useQuery({
    queryKey: ["product", id],
    queryFn: getProductDetails,
    enabled: Boolean(id),
    staleTime: 5 * 60 * 1000,
  });
}