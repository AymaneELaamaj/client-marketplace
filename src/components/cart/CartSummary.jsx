import { Link } from "react-router-dom";
import { CheckCircle2, Trash2 } from "lucide-react";
import { formatPrice } from "./cartUtils";

export default function CartSummary({
  checkoutLoading,
  onCheckout,
  onClear,
  totalItems,
  totalPrice,
}) {
  return (
    <aside className="cart-summary">
      <h2>Resume</h2>

      <div className="cart-summary__line">
        <span>Articles</span>
        <strong>{totalItems}</strong>
      </div>

      <div className="cart-summary__line cart-summary__total">
        <span>Total</span>
        <strong>{formatPrice(totalPrice)}</strong>
      </div>

      <button
        type="button"
        className="cart-summary__checkout"
        onClick={onCheckout}
        disabled={checkoutLoading}
      >
        <CheckCircle2 size={18} />
        {checkoutLoading ? "Validation..." : "Valider la commande"}
      </button>

      <button type="button" className="cart-summary__clear" onClick={onClear}>
        <Trash2 size={18} />
        Vider le panier
      </button>

      <Link to="/" className="cart-summary__link">
        Continuer mes achats
      </Link>
    </aside>
  );
}
