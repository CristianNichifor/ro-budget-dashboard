import { Decimal } from "decimal.js";
import type { DecimalValue } from "./salary";

export const INTENSITY_COLORS = [
  "#dbeafe",
  "#bfdbfe",
  "#93c5fd",
  "#60a5fa",
  "#2563eb",
] as const;

export type IntensityColor = (typeof INTENSITY_COLORS)[number];

/**
 * Maps an amount onto the blue intensity palette index, relative to the
 * min/max range. Pure — Decimal inside, index is display-only.
 */
export function pickIntensityIndex(
  amount: DecimalValue,
  min: DecimalValue,
  max: DecimalValue
): number {
  const range = new Decimal(max).minus(min);
  if (range.isZero()) {
    return 0;
  }
  const ratio = new Decimal(amount)
    .minus(min)
    .div(range)
    .clampedTo(0, 1)
    .toNumber();
  return Math.min(
    INTENSITY_COLORS.length - 1,
    Math.floor(ratio * INTENSITY_COLORS.length)
  );
}

export function pickIntensityColor(
  amount: DecimalValue,
  min: DecimalValue,
  max: DecimalValue
): IntensityColor {
  return (
    INTENSITY_COLORS[pickIntensityIndex(amount, min, max)] ??
    INTENSITY_COLORS[0]
  );
}
