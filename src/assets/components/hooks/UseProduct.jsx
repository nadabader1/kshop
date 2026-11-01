import { useQuery } from "@tanstack/react-query";
import { catalogApi } from "./catalogApi.js";

export default function useProduct(id) {
  return useQuery({
    queryKey: ["product", id],
    enabled: Boolean(id),
    queryFn: async ({ signal }) => {
      const { data } = await catalogApi.get(
        `Products/${encodeURIComponent(id)}`,
        { signal }
      );

      return data.response ?? null;
    },
    staleTime: 5 * 60 * 1000,
  });
}