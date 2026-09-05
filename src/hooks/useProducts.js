import { useEffect, useState } from "react";
import { getProducts } from "../api/products";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadProducts() {
      try {
        setLoading(true);
        setError("");

        const data = await getProducts();

        if (isMounted) {
          setProducts(data);
        }
      } catch (err) {
        if (isMounted) {
          setError("Unable to load products. Please try again.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    products,
    loading,
    error,
  };
}