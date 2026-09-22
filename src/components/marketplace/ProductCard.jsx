import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "../../hooks/useCart";

const formatPrice = (price) => {
  return `${new Intl.NumberFormat("fr-MA").format(price)} DH`;
};

const getInitials = (name = "") => {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [imageFailed, setImageFailed] = useState(false);
  const categoryName =
    typeof product.category === "object" ? product.category?.name : "Sans categorie";
  const inStock = product.stock > 0;
  const canShowImage = product.imageUrl && !imageFailed;

  return (
    <article className="product-card">
      <div className="product-card__media">
        {canShowImage ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            onError={() => setImageFailed(true)}
          />
        ) : (
          <span>{getInitials(product.name) || "P"}</span>
        )}
      </div>

      <div className="product-card__body">
        <div>
          <p className="product-card__category">{categoryName}</p>
          <h2>{product.name}</h2>
        </div>

        {product.description && (
          <p className="product-card__description">{product.description}</p>
        )}

        <div className="product-card__meta">
          <strong>{formatPrice(product.price)}</strong>
          <span className={inStock ? "is-available" : "is-empty"}>
            {inStock ? `${product.stock} en stock` : "Rupture"}
          </span>
        </div>

        <button type="button" onClick={() => addToCart(product)} disabled={!inStock}>
          <ShoppingCart size={18} />
          Ajouter
        </button>
      </div>
    </article>
  );
}
