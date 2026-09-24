import { useEffect, useState } from "react";
import api from "../api/axios";
import { downloadBlob } from "../utils/downloadBlob";

export function useOrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [invoiceLoadingId, setInvoiceLoadingId] = useState("");

  useEffect(() => {
    let ignore = false;
    const controller = new AbortController();

    const loadOrders = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await api.get("/orders/my-orders", {
          signal: controller.signal,
        });

        if (!ignore) {
          setOrders(response.data.orders || []);
        }
      } catch (err) {
        if (!ignore && err.code !== "ERR_CANCELED") {
          setError(err.response?.data?.message || "Impossible de charger les commandes.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadOrders();

    return () => {
      ignore = true;
      controller.abort();
    };
  }, []);

  const downloadInvoice = async (orderId) => {
    setInvoiceLoadingId(orderId);
    setError("");

    try {
      const response = await api.get(`/orders/${orderId}/invoice`, {
        responseType: "blob",
      });

      downloadBlob(response.data, `commande-${orderId}.pdf`);
    } catch (err) {
      setError(err.response?.data?.message || "Impossible de telecharger la facture.");
    } finally {
      setInvoiceLoadingId("");
    }
  };

  return {
    downloadInvoice,
    error,
    invoiceLoadingId,
    loading,
    orders,
  };
}
