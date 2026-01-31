export function formatUSD(centsOrDollars) {
  const n = Number(centsOrDollars);
  const dollars = n > 9999 ? n / 100 : n; // supports cents if you pass big numbers
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(dollars);
}
