import { describe, expect, it } from "vitest";
import { formatMoney, formatUsd } from "./money";

describe("formatUsd", () => {
  it("formats whole-dollar cents", () => {
    expect(formatUsd(4900)).toBe("$49.00");
  });

  it("formats zero", () => {
    expect(formatUsd(0)).toBe("$0.00");
  });

  it("refuses a non-integer amount", () => {
    expect(() => formatUsd(Number.NaN)).toThrow(RangeError);
  });
});

describe("formatMoney", () => {
  it("formats US dollars", () => {
    expect(formatMoney(9800, "usd")).toBe("$98.00");
  });
});
