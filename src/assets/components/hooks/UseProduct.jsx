import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function useProduct(id) {
  return useQuery({
    queryKey: ["product", id],
    enabled: Boolean(id),
    queryFn: async () => {
      const { data } = await axios.get(
        `https://knowledgeshop.runasp.net/api/Products/${id}`,
        { headers: { "Accept-Language": "en" } }
      );

      return data.response ?? null;
    },
    staleTime: 5 * 60 * 1000,
  });
}