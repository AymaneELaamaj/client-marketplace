import { useNavigate } from "react-router-dom";
import CartCheckoutStatus from "../../components/cart/CartCheckoutStatus";
import CartEmptyState from "../../components/cart/CartEmptyState";
import CartItemRow from "../../components/cart/CartItemRow";
import CartSummary from "../../components/cart/CartSummary";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";
import { useOrderCheckout } from "../../hooks/useOrderCheckout";

export default function CartPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const {
    clearCart,
    items,
    removeFromCart,
    totalItems,
    totalPrice,
    updateQuantity,
  } = useCart();
  const {
    checkoutError,
    checkoutLoading,
    createdOrder,
    createOrder,
    downloadInvoice,
    invoiceLoading,
  } = useOrderCheckout();

  const handleCheckout = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const order = await createOrder(items);

    if (order) {
      clearCart();
    }
  };

  if (!items.length && !createdOrder) {
    return (
      <section className="cart-page">
        <div className="cart-heading">
          <p className="cart-eyebrow">Commande</p>
          <h1>Mon panier</h1>
        </div>
        <CartEmptyState />
      </section>
    );
  }

  return (
    <section className="cart-page">
      <div className="cart-heading">
        <div>
          <p className="cart-eyebrow">Commande</p>
          <h1>Mon panier</h1>
        </div>
        <p>{totalItems} article{totalItems > 1 ? "s" : ""}</p>
      </div>

      <CartCheckoutStatus
        error={checkoutError}
        invoiceLoading={invoiceLoading}
        onDownloadInvoice={downloadInvoice}
        order={createdOrder}
      />

      {items.length > 0 && (
        <div className="cart-layout">
          <div className="cart-list">
            {items.map((item) => (
              <CartItemRow
                item={item}
                key={item.product}
                onRemove={removeFromCart}
                onUpdateQuantity={updateQuantity}
              />
            ))}
          </div>

          <CartSummary
            checkoutLoading={checkoutLoading}
            totalItems={totalItems}
            totalPrice={totalPrice}
            onCheckout={handleCheckout}
            onClear={clearCart}
          />
        </div>
      )}
    </section>
  );
}
