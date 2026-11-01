import axios from "axios";
import { useQuery } from "@tanstack/react-query";

async function getCategories() {
  const { data } = await axios.get(
    "https://knowledgeshop.runasp.net/api/Categories",
    { headers: { "Accept-Language": "en" } }
  );

  const categories = data.response?.data ?? data.response;

  if (!Array.isArray(categories)) {
    throw new Error("Unexpected categories response.");
  }

  return categories;
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 5 * 60 * 1000,
  });
}