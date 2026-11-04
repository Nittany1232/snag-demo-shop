import { useState } from "react";
import { getSession } from "../session";
import { charge } from "./api";
import { formatUsd } from "../lib/money";

interface PayButtonProps {
  amount: number;
}

/**
 * Runs the pay flow. Returns true when a charge was attempted, false when
 * there is no active session (guards against getSession() returning null,
 * which otherwise throws "Cannot read properties of null (reading 'token')").
 */
export async function performPay(): Promise<boolean> {
  const session = getSession();
  if (!session) {
    console.error("Pay clicked without an active session.");
    return false;
  }
  await charge(session.token);
  return true;
}

export function PayButton({ amount }: PayButtonProps) {
  const [paid, setPaid] = useState(false);

  async function handlePay() {
    const didCharge = await performPay();
    if (!didCharge) {
      return;
    }
    setPaid(true);
    setTimeout(() => setPaid(false), 1500);
  }

  return (
    <button type="button" className="pay" onClick={handlePay}>
      {paid ? "Paid" : `Pay ${formatUsd(amount)}`}
    </button>
  );
}
