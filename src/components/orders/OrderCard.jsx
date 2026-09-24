import { FileDown } from "lucide-react";
import { formatOrderDate, formatOrderPrice, getOrderItemsCount } from "./orderUtils";

const statusLabels = {
  VALIDATED: "Validee",
  CANCELLED: "Annulee",
};

export default function OrderCard({ invoiceLoading, onDownloadInvoice, order }) {
  const itemsCount = getOrderItemsCount(order);

  return (
    <article className="order-card">
      <div className="order-card__header">
        <div>
          <p>Commande #{order._id.slice(-6)}</p>
          <h2>{formatOrderDate(order.createdAt)}</h2>
        </div>
        <span className={`order-status order-status--${order.status.toLowerCase()}`}>
          {statusLabels[order.status] || order.status}
        </span>
      </div>

      <div className="order-card__items">
        {order.items.map((item) => (
          <div className="order-line" key={`${order._id}-${item.product}`}>
            <span>
              {item.name} x{item.quantity}
            </span>
            <strong>{formatOrderPrice(item.subtotal)}</strong>
          </div>
        ))}
      </div>

      <div className="order-card__footer">
        <div>
          <span>{itemsCount} article{itemsCount > 1 ? "s" : ""}</span>
          <strong>{formatOrderPrice(order.total)}</strong>
        </div>
        <button
          type="button"
          onClick={() => onDownloadInvoice(order._id)}
          disabled={invoiceLoading}
        >
          <FileDown size={18} />
          {invoiceLoading ? "Generation..." : "Facture PDF"}
        </button>
      </div>
    </article>
  );
}
