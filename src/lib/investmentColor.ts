import { Decimal } from "decimal.js";
import type { DecimalValue } from "./salary";

const INTENSITY_COLORS = [
  "#dbeafe",
  "#bfdbfe",
  "#93c5fd",
  "#60a5fa",
  "#2563eb",
] as const;

export type IntensityColor = (typeof INTENSITY_COLORS)[number];

/**
 * Maps an amount onto the blue intensity palette, relative to the
 * min/max range. Pure — Decimal inside, color index is display-only.
 */
export function pickIntensityColor(
  amount: DecimalValue,
  min: DecimalValue,
  max: DecimalValue
): IntensityColor {
  const range = new Decimal(max).minus(min);
  if (range.isZero()) {
    return INTENSITY_COLORS[0];
  }
  const ratio = new Decimal(amount)
    .minus(min)
    .div(range)
    .clampedTo(0, 1)
    .toNumber();
  const index = Math.min(
    INTENSITY_COLORS.length - 1,
    Math.floor(ratio * INTENSITY_COLORS.length)
  );
  return INTENSITY_COLORS[index] ?? INTENSITY_COLORS[0];
}
