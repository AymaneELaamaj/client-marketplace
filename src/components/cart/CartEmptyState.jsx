import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

export default function CartEmptyState() {
  return (
    <div className="cart-empty">
      <ShoppingCart size={38} />
      <h2>Panier vide</h2>
      <p>Ajoute des produits depuis la marketplace pour preparer ta commande.</p>
      <Link to="/">Voir les produits</Link>
    </div>
  );
}
