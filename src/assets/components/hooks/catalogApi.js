import axios from "axios";

export const catalogApi = axios.create({
  baseURL: "https://knowledgeshop.runasp.net/api/",
  headers: {
    "Accept-Language": "en",
  },
});

export async function getList(path, signal) {
  const { data } = await catalogApi.get(path, { signal });
  const list = data.response?.data ?? data.response;

  if (!Array.isArray(list)) {
    throw new Error("Unexpected list response.");
  }

  return list;
}
