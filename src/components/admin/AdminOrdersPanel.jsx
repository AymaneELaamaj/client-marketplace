import { RotateCcw } from "lucide-react";
import { useAdminOrders } from "../../hooks/useAdminOrders";
import AdminOrderDetails from "./AdminOrderDetails";
import AdminOrderList from "./AdminOrderList";

export default function AdminOrdersPanel() {
  const {
    detailsLoading,
    error,
    loadOrderDetails,
    loadOrders,
    loading,
    orders,
    selectedOrder,
  } = useAdminOrders();

  return (
    <div className="admin-orders-panel">
      <div className="admin-table-panel">
        <div className="admin-section-heading">
          <div>
            <h2>Commandes validees</h2>
            <p>{orders.length} commande{orders.length > 1 ? "s" : ""}</p>
          </div>
          <button type="button" onClick={loadOrders} disabled={loading}>
            <RotateCcw size={16} />
            Actualiser
          </button>
        </div>

        {error && <p className="admin-alert admin-alert--error">{error}</p>}

        <AdminOrderList
          detailsLoading={detailsLoading}
          loading={loading}
          onSelectOrder={loadOrderDetails}
          orders={orders}
          selectedOrderId={selectedOrder?._id}
        />
      </div>

      <AdminOrderDetails loading={detailsLoading} order={selectedOrder} />
    </div>
  );
}
