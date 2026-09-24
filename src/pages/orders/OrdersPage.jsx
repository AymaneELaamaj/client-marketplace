import OrderCard from "../../components/orders/OrderCard";
import OrdersEmptyState from "../../components/orders/OrdersEmptyState";
import { useOrderHistory } from "../../hooks/useOrderHistory";

export default function OrdersPage() {
  const {
    downloadInvoice,
    error,
    invoiceLoadingId,
    loading,
    orders,
  } = useOrderHistory();

  return (
    <section className="orders-page">
      <div className="orders-heading">
        <div>
          <p className="orders-eyebrow">Historique</p>
          <h1>Mes commandes</h1>
        </div>
        <p>{orders.length} commande{orders.length > 1 ? "s" : ""}</p>
      </div>

      {error && <p className="orders-alert">{error}</p>}

      {loading ? (
        <p className="orders-muted">Chargement des commandes...</p>
      ) : orders.length ? (
        <div className="orders-list">
          {orders.map((order) => (
            <OrderCard
              invoiceLoading={invoiceLoadingId === order._id}
              key={order._id}
              onDownloadInvoice={downloadInvoice}
              order={order}
            />
          ))}
        </div>
      ) : (
        <OrdersEmptyState />
      )}
    </section>
  );
}
