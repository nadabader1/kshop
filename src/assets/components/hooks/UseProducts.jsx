import axios from "axios";
import { useQuery } from "@tanstack/react-query";

async function getProducts() {
  const { data } = await axios.get(
    "https://knowledgeshop.runasp.net/api/Products",
    { headers: { "Accept-Language": "en" } }
  );

  const products = data.response?.data;

  if (!Array.isArray(products)) {
    throw new Error("Unexpected products response.");
  }

  return products;
}

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 5 * 60 * 1000,
  });
}