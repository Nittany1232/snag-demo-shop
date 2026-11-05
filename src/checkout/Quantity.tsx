import { QUANTITY_OPTIONS, optionLabel, parseQuantity } from "./licenses";

interface QuantityProps {
  value: number;
  onChange: (quantity: number) => void;
}

export function Quantity({ value, onChange }: QuantityProps) {
  return (
    <label className="field">
      <span>Licenses</span>
      <select value={optionLabel(value)} onChange={(e) => onChange(parseQuantity(e.currentTarget.value))}>
        {QUANTITY_OPTIONS.map((n) => (
          <option key={n} value={optionLabel(n)}>{optionLabel(n)}</option>
        ))}
      </select>
    </label>
  );
}
