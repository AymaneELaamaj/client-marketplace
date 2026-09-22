import { Minus, Plus, Trash2 } from "lucide-react";
import { formatPrice } from "./cartUtils";

export default function CartItemRow({ item, onRemove, onUpdateQuantity }) {
  const subtotal = item.price * item.quantity;
  const canDecrease = item.quantity > 1;
  const canIncrease = item.quantity < item.stock;

  return (
    <article className="cart-item">
      <div className="cart-item__media">
        {item.imageUrl ? <img src={item.imageUrl} alt={item.name} /> : <span>{item.name[0]}</span>}
      </div>

      <div className="cart-item__info">
        <h2>{item.name}</h2>
        <p>{formatPrice(item.price)}</p>
        <span>{item.stock} en stock</span>
      </div>

      <div className="cart-quantity" aria-label={`Quantite ${item.name}`}>
        <button
          type="button"
          onClick={() => onUpdateQuantity(item.product, item.quantity - 1)}
          disabled={!canDecrease}
          aria-label="Diminuer la quantite"
        >
          <Minus size={16} />
        </button>
        <input
          type="number"
          min="1"
          max={item.stock}
          value={item.quantity}
          onChange={(event) => onUpdateQuantity(item.product, event.target.value)}
          aria-label="Quantite"
        />
        <button
          type="button"
          onClick={() => onUpdateQuantity(item.product, item.quantity + 1)}
          disabled={!canIncrease}
          aria-label="Augmenter la quantite"
        >
          <Plus size={16} />
        </button>
      </div>

      <strong className="cart-item__subtotal">{formatPrice(subtotal)}</strong>

      <button
        type="button"
        className="cart-item__remove"
        onClick={() => onRemove(item.product)}
        aria-label={`Retirer ${item.name}`}
      >
        <Trash2 size={18} />
      </button>
    </article>
  );
}
