export const formatPrice = (price, currencySymbol, language) => {
  const formatter = new Intl.NumberFormat(language, {
    style: "currency",
    currency: currencySymbol
  });
  return formatter.format(price);
};
