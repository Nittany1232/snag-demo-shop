import { useEffect, useState } from "react";
import { PayButton } from "./checkout/PayButton";
import { PromoCode } from "./checkout/PromoCode";
import { Quantity } from "./checkout/Quantity";
import { expireSession, getSession, seedSession } from "./session";
import { formatMoney, type Currency } from "./lib/money";
import { SCENARIOS, type Scenario } from "./scenarios";

const PRICE_CENTS = 4900;

export function App() {
  const [scenario, setScenario] = useState<Scenario | "">(() => (getSession() ? "" : "expired-session"));
  const [currency, setCurrency] = useState<Currency>("usd");
  const [quantity, setQuantity] = useState(1);
  const [percentOff, setPercentOff] = useState(0);
  const [fired, setFired] = useState(false);

  // An uncaught error from a handler surfaces as an error event or an unhandled
  // rejection. Observe both (without swallowing them) so the page can say what
  // just happened.
  useEffect(() => {
    const onError = () => setFired(true);
    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onError);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onError);
    };
  }, []);

  function pickScenario(next: Scenario | "") {
    setScenario(next);
    setFired(false);
    setQuantity(1);
    setPercentOff(0);
    if (next === "expired-session") expireSession();
    else seedSession();
    setCurrency(next === "currency" ? "eur" : "usd");
  }

  const total = Math.round((PRICE_CENTS * quantity * (100 - percentOff)) / 100);
  const hint = SCENARIOS.find((s) => s.id === scenario)?.hint;

  return (
    <main className="stage">
      <section className="card" aria-label="Checkout">
        <p className="eyebrow">Checkout</p>
        <h1 className="product">Aurora Pro</h1>
        <p className="plan">Annual plan \u00b7 renews Jul 2027</p>
        <p className="price">{formatMoney(total, currency)}</p>
        {scenario === "quantity" && <Quantity value={quantity} onChange={setQuantity} />}
        {scenario === "promo-code" && <PromoCode onApplied={setPercentOff} />}
        <PayButton amount={total} currency={currency} />
        {fired && <p className="fired">\u2026nothing happened. That's the bug.</p>}
        <label className={scenario ? "toggle armed" : "toggle"}>
          <span>Introduce a bug</span>
          <select value={scenario} onChange={(e) => pickScenario(e.currentTarget.value as Scenario | "")}>
            <option value="">none</option>
            {SCENARIOS.map((s) => (
              <option key={s.id} value={s.id}>{s.label}</option>
            ))}
          </select>
        </label>
        {hint && <p className="hintline">{hint}</p>}
      </section>
      <footer className="hint">Click Report (bottom right) after the bug fires.</footer>
    </main>
  );
}
