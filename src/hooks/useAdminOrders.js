import { useCallback, useEffect, useState } from "react";
import api from "../api/axios";

export function useAdminOrders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [error, setError] = useState("");

  const loadOrders = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.get("/orders/admin/validated");

      setOrders(response.data.orders || []);
    } catch (err) {
      setError(err.response?.data?.message || "Impossible de charger les commandes.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadOrders();
    }, 0);

    return () => {
      clearTimeout(timer);
    };
  }, [loadOrders]);

  const loadOrderDetails = async (orderId) => {
    setDetailsLoading(true);
    setError("");

    try {
      const response = await api.get(`/orders/admin/validated/${orderId}`);

      setSelectedOrder(response.data.order);
    } catch (err) {
      setError(err.response?.data?.message || "Impossible de charger le detail de la commande.");
    } finally {
      setDetailsLoading(false);
    }
  };

  return {
    detailsLoading,
    error,
    loadOrderDetails,
    loadOrders,
    loading,
    orders,
    selectedOrder,
  };
}
