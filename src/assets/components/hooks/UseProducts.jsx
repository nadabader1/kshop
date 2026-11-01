import { useQuery } from "@tanstack/react-query";
import { getList } from "./catalogApi.js";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: ({ signal }) => getList("Products", signal),
    staleTime: 5 * 60 * 1000,
  });
}