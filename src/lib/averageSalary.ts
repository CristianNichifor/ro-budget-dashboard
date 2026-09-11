import { Decimal } from "decimal.js";
import type { FxSeries, WageContext } from "../api/client";
import { calculateSalaryBreakdown } from "./salary";

/**
 * Estimates the current average net salary (lei/month) from the latest
 * Structure of Earnings Survey mean gross annual earnings (Eurostat, every
 * 4 years) and the latest ECB EUR/RON rate, run through the same 2026 tax
 * model as the calculator. Pure function — Decimal only.
 */
export function estimateAverageNetSalary(
  anchors: WageContext["sesAnchors"],
  fx: FxSeries["series"]
): Decimal | null {
  const latestAnchor = [...anchors].sort((a, b) =>
    b.year.localeCompare(a.year)
  )[0];
  const latestFx = [...fx].sort((a, b) => b.date.localeCompare(a.date))[0];

  if (latestAnchor === undefined || latestFx === undefined) {
    return null;
  }

  const grossMonthlyLei = new Decimal(latestAnchor.meanGrossEur)
    .div(12)
    .mul(latestFx.eurRon)
    .toDecimalPlaces(0);

  return calculateSalaryBreakdown(grossMonthlyLei)?.net ?? null;
}
