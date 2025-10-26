export const formatPrice = (price: number) =>
  Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: "BDT",
  }).format(price);
