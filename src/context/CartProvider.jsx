import { useCallback, useMemo, useState } from "react";
import { CartContext } from "./CartContext";

const CART_STORAGE_KEY = "cartItems";

const getStoredCart = () => {
  const storedCart = localStorage.getItem(CART_STORAGE_KEY);

  try {
    return storedCart ? JSON.parse(storedCart) : [];
  } catch {
    return [];
  }
};

const saveCart = (items) => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
};

const toCartItem = (product) => ({
  product: product._id,
  name: product.name,
  price: product.price,
  imageUrl: product.imageUrl || "",
  stock: product.stock,
  quantity: 1,
});

export function CartProvider({ children }) {
  const [items, setItems] = useState(getStoredCart);

  const updateCart = useCallback((updater) => {
    setItems((current) => {
      const nextItems = updater(current);
      saveCart(nextItems);
      return nextItems;
    });
  }, []);

  const addToCart = useCallback((product) => {
    updateCart((current) => {
      const existingItem = current.find((item) => item.product === product._id);

      if (!existingItem) {
        return [...current, toCartItem(product)];
      }

      return current.map((item) =>
        item.product === product._id
          ? {
              ...item,
              stock: product.stock,
              quantity: Math.min(item.quantity + 1, product.stock),
            }
          : item
      );
    });
  }, [updateCart]);

  const updateQuantity = useCallback((productId, quantity) => {
    updateCart((current) =>
      current.map((item) =>
        item.product === productId
          ? {
              ...item,
              quantity: Math.min(Math.max(Number(quantity), 1), item.stock),
            }
          : item
      )
    );
  }, [updateCart]);

  const removeFromCart = useCallback((productId) => {
    updateCart((current) => current.filter((item) => item.product !== productId));
  }, [updateCart]);

  const clearCart = useCallback(() => {
    updateCart(() => []);
  }, [updateCart]);

  const value = useMemo(() => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return {
      items,
      totalItems,
      totalPrice,
      addToCart,
      clearCart,
      removeFromCart,
      updateQuantity,
    };
  }, [addToCart, clearCart, items, removeFromCart, updateQuantity]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
