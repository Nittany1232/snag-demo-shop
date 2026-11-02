import { describe, expect, it } from "vitest";
import { formatUsd } from "./money";

describe("formatUsd", () => {
  it("formats whole-dollar cents", () => {
    expect(formatUsd(4900)).toBe("$49.00");
  });

  it("formats zero", () => {
    expect(formatUsd(0)).toBe("$0.00");
  });
});
