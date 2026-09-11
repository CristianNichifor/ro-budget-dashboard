import { z } from "zod";
import {
  BUDGET_DESTINATIONS,
  BUDGET_SUMMARY,
  type BudgetDestination,
} from "../data/budget2026";
import { BNR_INFLATION_SERIES } from "../data/bnrInflation";
import { buildRealWageSeries, type RealWagePoint } from "../lib/realWage";
import { calculateSalaryBreakdown, type SalaryBreakdown } from "../lib/salary";

/**
 * Typed API client.
 * P0: resolves from local demo data (small artificial latency, no network).
 * P2: replace the bodies with fetch() calls against the BFF
 * (hack-for-facts-eb-server GraphQL/REST) — the schemas stay the contract.
 * Monetary amounts cross this boundary as STRINGS, per the no-floats rule.
 */

export const budgetSummarySchema = z.object({
  year: z.number().int(),
  revenue: z.string(),
  expenditure: z.string(),
  deficit: z.string(),
  deficitPercentGdp: z.string(),
});

export type BudgetSummary = z.infer<typeof budgetSummarySchema>;

export const budgetSubDestinationSchema = z.object({
  id: z.string(),
  name: z.string(),
  amount: z.string(),
});

export const budgetDestinationSchema = budgetSubDestinationSchema.extend({
  percentOfTotal: z.string(),
  subDestinations: z.array(budgetSubDestinationSchema).optional(),
});

const DEMO_LATENCY_MS = 120;

function simulateNetwork<T>(data: T): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), DEMO_LATENCY_MS);
  });
}

export function fetchBudgetSummary(): Promise<BudgetSummary> {
  return simulateNetwork(budgetSummarySchema.parse(BUDGET_SUMMARY));
}

export function fetchDestinations(): Promise<BudgetDestination[]> {
  const schema = z.array(budgetDestinationSchema);
  return simulateNetwork(schema.parse(BUDGET_DESTINATIONS));
}

export function fetchSalaryBreakdown(
  gross: number
): Promise<SalaryBreakdown | null> {
  return simulateNetwork(calculateSalaryBreakdown(gross));
}

export function fetchRealWageSeries(): Promise<RealWagePoint[]> {
  return simulateNetwork(buildRealWageSeries(BNR_INFLATION_SERIES));
}
