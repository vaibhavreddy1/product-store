import axios from "axios";

const API_URL = "https://dummyjson.com/products";

export async function getProducts() {
  const response = await axios.get(API_URL);

  return response.data.products;
}

export async function getProductById(id) {
  const response = await axios.get(`${API_URL}/${id}`);

  return response.data;
}

export async function createProduct(product) {
  const response = await axios.post(
    `${API_URL}/add`,
    product
  );

  return response.data;
}