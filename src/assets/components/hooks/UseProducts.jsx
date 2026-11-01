import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const UseProducts = () => {
  const getProducts = async () => {
    const response = await axios.get(
      "https://knowledgeshop.runasp.net/api/Products",
      {
        headers: {
          "Accept-Language": "en",
        },
      }
    );

    return response.data.response.data;
  };

return useQuery({
  queryKey: ["product", id],
  queryFn: getProductDetails,
  staleTime: 1000 * 60 * 5,
});}