/** Charges the order. There is no backend on static hosting, so this 404s. */
export function charge(token: string): Promise<Response> {
  return fetch("/api/checkout/charge", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token, product: "aurora-pro", amount: 4900 }),
  });
}
