export const formatOrderDate = (date) => {
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
};

export const formatOrderPrice = (price) => {
  return `${new Intl.NumberFormat("fr-MA").format(price)} DH`;
};

export const getOrderItemsCount = (order) => {
  return order.items.reduce((sum, item) => sum + item.quantity, 0);
};
