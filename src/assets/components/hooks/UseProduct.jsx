import axios from "axios";
import React from "react";

export default function UseProduct() {
  const getProductDetails = async (id) => {
    const response = await axios.get(
      `https://knowledgeshop.runasp.net/api/Products/${id}`,
      {
        headers: {
          "Accept-Language": "en",
        },
      }
    );

    return response.data.response;
  };

  return <div>UseProduct</div>;
}