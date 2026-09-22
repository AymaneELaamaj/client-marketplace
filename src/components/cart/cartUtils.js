export const formatPrice = (price) => {
  return `${new Intl.NumberFormat("fr-MA").format(price)} DH`;
};
