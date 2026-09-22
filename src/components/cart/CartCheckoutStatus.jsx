import { FileDown } from "lucide-react";
import { formatPrice } from "./cartUtils";

export default function CartCheckoutStatus({
  error,
  invoiceLoading,
  onDownloadInvoice,
  order,
}) {
  if (error) {
    return <p className="cart-alert cart-alert--error">{error}</p>;
  }

  if (!order) {
    return null;
  }

  return (
    <div className="cart-alert cart-alert--success">
      <div>
        <strong>Commande validee avec succes.</strong>
        <span>Total a payer: {formatPrice(order.total)}</span>
      </div>
      <button type="button" onClick={() => onDownloadInvoice(order._id)} disabled={invoiceLoading}>
        <FileDown size={18} />
        {invoiceLoading ? "Generation..." : "Telecharger PDF"}
      </button>
    </div>
  );
}
