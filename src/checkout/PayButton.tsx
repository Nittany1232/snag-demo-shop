import { useState } from "react";
import { getSession } from "../session";
import { charge } from "./api";
import { formatMoney, type Currency } from "../lib/money";

interface PayButtonProps {
  amount: number;
  currency: Currency;
}

export function PayButton({ amount, currency }: PayButtonProps) {
  const [paid, setPaid] = useState(false);

  async function handlePay() {
    const session = getSession();
    const token = session.token;
    await charge(token);
    setPaid(true);
    setTimeout(() => setPaid(false), 1500);
  }

  return (
    <button type="button" className="pay" onClick={handlePay}>
      {paid ? "Paid" : `Pay ${formatMoney(amount, currency)}`}
    </button>
  );
}
