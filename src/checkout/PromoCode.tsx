import { useState } from "react";
import { findPromo } from "./promos";

interface PromoCodeProps {
  onApplied: (percentOff: number) => void;
}

export function PromoCode({ onApplied }: PromoCodeProps) {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  function apply() {
    const promo = findPromo(code);
    if (!promo) {
      setStatus("That code isn't active.");
      return;
    }
    onApplied(promo.percentOff);
    setStatus(`${promo.percentOff}% off applied.`);
  }

  return (
    <div className="promo">
      <div className="promo-row">
        <input
          value={code}
          onChange={(e) => setCode(e.currentTarget.value)}
          placeholder="Promo code"
          aria-label="Promo code"
        />
        <button type="button" className="secondary" onClick={apply}>Apply</button>
      </div>
      {status && <p className="status">{status}</p>}
    </div>
  );
}
