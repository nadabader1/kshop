import { useQuery } from "@tanstack/react-query";
import { getList } from "./catalogApi.js";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: ({ signal }) => getList("Categories", signal),
    staleTime: 5 * 60 * 1000,
  });
}