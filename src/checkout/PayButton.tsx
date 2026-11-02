import { useState } from "react";
import { getSession } from "../session";
import { charge } from "./api";
import { formatUsd } from "../lib/money";

interface PayButtonProps {
  amount: number;
}

export function PayButton({ amount }: PayButtonProps) {
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
      {paid ? "Paid" : `Pay ${formatUsd(amount)}`}
    </button>
  );
}
