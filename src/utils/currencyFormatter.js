const currencyFormatter = new Intl.NumberFormat(undefined, {
  currency: "vnd",
  style: "currency",
  minimumFractionDigits: 0,
});
export default currencyFormatter;
