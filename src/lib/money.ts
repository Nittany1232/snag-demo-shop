/** Formats an integer amount of US cents as a dollar string, e.g. 4900 -> "$49.00". */
export function formatUsd(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}
