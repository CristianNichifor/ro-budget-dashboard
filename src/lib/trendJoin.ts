import { Decimal } from "decimal.js";
import type { YearAmount } from "../data/budget2026";
import type { InsMetricPoint } from "../data/insStats";

export interface DualTrendPoint {
  year: number;
  /** Health spending, in milliarde EUR (display-ready). */
  budgetMilliardeEur: number;
  /** INS indicator value, or null when the year is missing. */
  ins: number | null;
}

export interface TrendInsight {
  budgetChangePercent: number;
  insChangePercent: number;
}

const THOUSAND = 1000;

/**
 * Inner-joins a health-spending time series with an INS metric on year.
 * The BFF serves amounts in millions EUR; this converts to milliarde EUR.
 * Pure function — Decimal for the money math, numbers only at the boundary.
 */
export function joinBudgetWithIns(
  budget: YearAmount[],
  ins: InsMetricPoint[]
): DualTrendPoint[] {
  const insByYear = new Map(ins.map((point) => [point.year, point.value]));

  return budget.map((point) => ({
    year: point.year,
    budgetMilliardeEur: new Decimal(point.amount).div(THOUSAND).toNumber(),
    ins: insByYear.get(point.year) ?? null,
  }));
}

/**
 * Percentage change between the first and last data points of each series.
 * Returns null when either series has fewer than two points.
 */
export function computeTrendInsight(
  budget: YearAmount[],
  ins: InsMetricPoint[]
): TrendInsight | null {
  const budgetFirst = budget.at(0);
  const budgetLast = budget.at(-1);
  const insFirst = ins.at(0);
  const insLast = ins.at(-1);

  if (
    budgetFirst === undefined ||
    budgetLast === undefined ||
    insFirst === undefined ||
    insLast === undefined
  ) {
    return null;
  }

  const firstAmount = new Decimal(budgetFirst.amount);
  const lastAmount = new Decimal(budgetLast.amount);
  if (firstAmount.isZero()) {
    return null;
  }

  return {
    budgetChangePercent: lastAmount
      .minus(firstAmount)
      .div(firstAmount)
      .mul(100)
      .toNumber(),
    insChangePercent:
      insFirst.value === 0
        ? 0
        : ((insLast.value - insFirst.value) / insFirst.value) * 100,
  };
}
