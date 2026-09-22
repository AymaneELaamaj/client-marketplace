import { useState } from "react";
import api from "../api/axios";

const toOrderPayload = (items) => ({
  items: items.map((item) => ({
    product: item.product,
    quantity: item.quantity,
  })),
});

const downloadBlob = (blob, filename) => {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;
  link.click();

  URL.revokeObjectURL(url);
};

export function useOrderCheckout() {
  const [createdOrder, setCreatedOrder] = useState(null);
  const [checkoutError, setCheckoutError] = useState("");
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [invoiceLoading, setInvoiceLoading] = useState(false);

  const createOrder = async (items) => {
    setCheckoutLoading(true);
    setCheckoutError("");
    setCreatedOrder(null);

    try {
      const response = await api.post("/orders", toOrderPayload(items));
      const order = response.data.order;

      setCreatedOrder(order);
      return order;
    } catch (err) {
      setCheckoutError(err.response?.data?.message || "Impossible de valider la commande.");
      return null;
    } finally {
      setCheckoutLoading(false);
    }
  };

  const downloadInvoice = async (orderId) => {
    setInvoiceLoading(true);
    setCheckoutError("");

    try {
      const response = await api.get(`/orders/${orderId}/invoice`, {
        responseType: "blob",
      });

      downloadBlob(response.data, `commande-${orderId}.pdf`);
    } catch (err) {
      setCheckoutError(err.response?.data?.message || "Impossible de telecharger la facture.");
    } finally {
      setInvoiceLoading(false);
    }
  };

  return {
    checkoutError,
    checkoutLoading,
    createdOrder,
    createOrder,
    downloadInvoice,
    invoiceLoading,
  };
}
