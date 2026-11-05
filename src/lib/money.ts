export type Currency = "usd" | "eur";

/** ISO 4217 codes for the currencies the shop prices in. */
const CURRENCY_CODES: Record<Currency, string> = { usd: "USD", eur: "EURO" };

/** Formats an integer amount of cents in the given currency, e.g. 4900 usd -> "$49.00". */
export function formatMoney(cents: number, currency: Currency): string {
  if (!Number.isInteger(cents)) {
    throw new RangeError(`formatMoney: expected an integer number of cents, got ${cents}`);
  }
  return new Intl.NumberFormat("en-US", { style: "currency", currency: CURRENCY_CODES[currency] }).format(cents / 100);
}

/** Formats an integer amount of US cents as a dollar string, e.g. 4900 -> "$49.00". */
export function formatUsd(cents: number): string {
  return formatMoney(cents, "usd");
}
