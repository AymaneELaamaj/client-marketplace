import {
  formatOrderDate,
  formatOrderPrice,
  getOrderItemsCount,
} from "../orders/orderUtils";

const getClientName = (user) => {
  return user?.name || "Client inconnu";
};

const getClientEmail = (user) => {
  return user?.email || "Email non disponible";
};

export default function AdminOrderDetails({ loading, order }) {
  if (loading) {
    return (
      <aside className="admin-order-details">
        <p className="admin-muted">Chargement du detail...</p>
      </aside>
    );
  }

  if (!order) {
    return (
      <aside className="admin-order-details admin-order-details--empty">
        <h2>Details commande</h2>
        <p>Selectionne une commande pour voir le client, les produits et le total.</p>
      </aside>
    );
  }

  const itemsCount = getOrderItemsCount(order);

  return (
    <aside className="admin-order-details">
      <div className="admin-order-details__header">
        <div>
          <p>Commande #{order._id.slice(-6)}</p>
          <h2>{getClientName(order.user)}</h2>
          <span>{getClientEmail(order.user)}</span>
        </div>
        <span className="admin-order-status">Validee</span>
      </div>

      <dl className="admin-order-summary">
        <div>
          <dt>Date</dt>
          <dd>{formatOrderDate(order.createdAt)}</dd>
        </div>
        <div>
          <dt>Articles</dt>
          <dd>{itemsCount}</dd>
        </div>
        <div>
          <dt>Total</dt>
          <dd>{formatOrderPrice(order.total)}</dd>
        </div>
      </dl>

      <div className="admin-order-items">
        {order.items.map((item) => (
          <div
            className="admin-order-item"
            key={`${order._id}-${item.product?._id || item.product || item.name}`}
          >
            <div>
              <strong>{item.name}</strong>
              <span>
                {formatOrderPrice(item.price)} x {item.quantity}
              </span>
            </div>
            <strong>{formatOrderPrice(item.subtotal)}</strong>
          </div>
        ))}
      </div>
    </aside>
  );
}
