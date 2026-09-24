import { Link } from "react-router-dom";
import { PackageSearch } from "lucide-react";

export default function OrdersEmptyState() {
  return (
    <div className="orders-empty">
      <PackageSearch size={38} />
      <h2>Aucune commande</h2>
      <p>Ton historique apparaitra ici apres ta premiere commande validee.</p>
      <Link to="/">Voir les produits</Link>
    </div>
  );
}
