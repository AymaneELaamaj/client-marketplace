import { PackageSearch } from "lucide-react";
import ProductCard from "./ProductCard";

export default function ProductGrid({ loading, products }) {
  if (loading) {
    return (
      <div className="product-grid" aria-label="Chargement des produits">
        {Array.from({ length: 8 }).map((_, index) => (
          <div className="product-card product-card--loading" key={index} />
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="marketplace-empty">
        <PackageSearch size={34} />
        <h2>Aucun produit trouve</h2>
        <p>Essaie de modifier la recherche, la categorie ou la fourchette de prix.</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
}
