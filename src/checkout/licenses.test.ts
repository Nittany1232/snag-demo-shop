import { describe, expect, it } from "vitest";
import { optionLabel } from "./licenses";

describe("optionLabel", () => {
  it("pluralises", () => {
    expect(optionLabel(1)).toBe("1 license");
    expect(optionLabel(3)).toBe("3 licenses");
  });
});
