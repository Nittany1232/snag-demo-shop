/**
 * Demo scenarios. Each one puts the checkout into a state a real user could
 * reach, and that state trips a defect somewhere in the app's own code. The
 * picker in App.tsx arms one at a time; nothing here is the bug itself.
 */
export type Scenario = "expired-session" | "currency" | "promo-code" | "quantity";

export interface ScenarioInfo {
  id: Scenario;
  label: string;
  hint: string;
}

export const SCENARIOS: readonly ScenarioInfo[] = [
  { id: "expired-session", label: "Expired session", hint: "Session expired \u2014 now click Pay." },
  { id: "currency", label: "Euro pricing", hint: "Prices switch to euros." },
  { id: "promo-code", label: "Promo code", hint: "Enter LAUNCH10 and click Apply." },
  { id: "quantity", label: "More licenses", hint: "Pick a quantity." },
];
