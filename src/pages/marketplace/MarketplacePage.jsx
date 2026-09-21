import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function MarketplacePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await api.get("/products");

        setProducts(response.data.products);
      } catch (error) {
        console.error("Failed to load products", error);
      }
    };

    loadProducts();
  }, []);

  return (
    <div>
      <h1>Marketplace</h1>

      {products.map((product) => (
        <div key={product._id}>
          <h2>{product.name}</h2>
          <p>{product.price} DH</p>
        </div>
      ))}
    </div>
  );
}