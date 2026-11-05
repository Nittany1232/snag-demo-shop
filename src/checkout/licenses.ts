export const QUANTITY_OPTIONS = [1, 2, 3, 5] as const;

/** "1 license", "2 licenses" \u2014 the option text doubles as its value. */
export function optionLabel(n: number): string {
  return `${n} license${n === 1 ? "" : "s"}`;
}

/** Reads the count back out of a selected option. */
export function parseQuantity(option: string): number {
  return Number(option);
}
