import { Eye } from "lucide-react";
import {
  formatOrderDate,
  formatOrderPrice,
  getOrderItemsCount,
} from "../orders/orderUtils";

const getClientName = (user) => {
  return user?.name || user?.email || "Client inconnu";
};

export default function AdminOrderList({
  detailsLoading,
  loading,
  onSelectOrder,
  orders,
  selectedOrderId,
}) {
  if (loading) {
    return <p className="admin-muted">Chargement des commandes...</p>;
  }

  if (!orders.length) {
    return <p className="admin-muted">Aucune commande valide.</p>;
  }

  return (
    <div className="admin-orders-list">
      {orders.map((order) => {
        const itemsCount = getOrderItemsCount(order);

        return (
          <article
            className={`admin-order-card ${
              selectedOrderId === order._id ? "is-selected" : ""
            }`}
            key={order._id}
          >
            <div>
              <p>Commande #{order._id.slice(-6)}</p>
              <h3>{getClientName(order.user)}</h3>
              <span>{formatOrderDate(order.createdAt)}</span>
            </div>

            <div className="admin-order-card__meta">
              <strong>{formatOrderPrice(order.total)}</strong>
              <span>
                {itemsCount} article{itemsCount > 1 ? "s" : ""}
              </span>
            </div>

            <button
              type="button"
              onClick={() => onSelectOrder(order._id)}
              disabled={detailsLoading && selectedOrderId === order._id}
            >
              <Eye size={16} />
              Details
            </button>
          </article>
        );
      })}
    </div>
  );
}
