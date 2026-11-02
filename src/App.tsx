import { useEffect, useState } from "react";
import { PayButton } from "./checkout/PayButton";
import { expireSession, getSession } from "./session";
import { formatUsd } from "./lib/money";

const PRICE_CENTS = 4900;

export function App() {
  const [armed, setArmed] = useState(() => !getSession());
  const [fired, setFired] = useState(false);

  // An uncaught error from the Pay handler surfaces as an unhandled rejection.
  // Observe it (without swallowing it) so the page can say what just happened.
  useEffect(() => {
    const onRejection = () => setFired(true);
    window.addEventListener("unhandledrejection", onRejection);
    return () => window.removeEventListener("unhandledrejection", onRejection);
  }, []);

  function plantBug() {
    expireSession();
    setArmed(true);
  }

  return (
    <main className="stage">
      <section className="card" aria-label="Checkout">
        <p className="eyebrow">Checkout</p>
        <h1 className="product">Aurora Pro</h1>
        <p className="plan">Annual plan · renews Jul 2027</p>
        <p className="price">{formatUsd(PRICE_CENTS)}</p>
        <PayButton amount={PRICE_CENTS} />
        {fired && <p className="fired">…nothing happened. That's the bug.</p>}
        <label className={armed ? "toggle armed" : "toggle"}>
          <input type="checkbox" checked={armed} disabled={armed} onChange={plantBug} />
          {armed ? "Bug planted — now try to pay" : "Introduce a bug"}
        </label>
      </section>
      <footer className="hint">Click Report (bottom right) after the bug fires.</footer>
    </main>
  );
}
