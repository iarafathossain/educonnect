export const formatStripeAmount = (amount: number, current: string) => {
  const numberFormat = new Intl.NumberFormat(["en-BD"], {
    style: "currency",
    currency: current,
    currencyDisplay: "symbol",
  });

  const parts = numberFormat.formatToParts(amount);
  let zeroDecimal = true;

  for (const part of parts) {
    if (part.type === "decimal") {
      zeroDecimal = false;
      break;
    }
  }
  return zeroDecimal ? amount : Math.round(amount * 100);
};
