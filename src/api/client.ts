import { Decimal } from "decimal.js";
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
 * P2: calls the BFF (ro-budget-dashboard-bff); falls back to local demo
 * data when the BFF is unreachable, so the demo always renders.
 * Monetary amounts cross this boundary as STRINGS, per the no-floats rule.
 */

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";
const REQUEST_TIMEOUT_MS = 2500;

async function request<T>(
  path: string,
  schema: z.ZodType<T>
): Promise<T | null> {
  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return schema.parse(await response.json());
  } catch (error) {
    console.warn(`[api] BFF unreachable for ${path}, using local data`, error);
    return null;
  }
}

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

const salaryResponseSchema = z.object({
  gross: z.string(),
  cas: z.string(),
  cass: z.string(),
  incomeTax: z.string(),
  employerContribution: z.string(),
  estimatedVat: z.string(),
  net: z.string(),
  employerCost: z.string(),
  stateShare: z.string(),
  statePercent: z.string(),
  entries: z.array(
    z.object({
      labelKey: z.string(),
      amount: z.string(),
    })
  ),
});

type SalaryResponse = z.infer<typeof salaryResponseSchema>;

const monetarySchema = z.object({
  inflation: z.object({
    current: z.number(),
    target: z.number(),
  }),
  realWage: z.array(
    z.object({
      year: z.number().int(),
      nominal: z.number(),
      real: z.number(),
    })
  ),
  debt: z.object({
    total: z.string(),
    interestPayment: z.string(),
    averageRate: z.number(),
    debtServiceRatio: z.string(),
  }),
});

function toSalaryBreakdown(response: SalaryResponse): SalaryBreakdown {
  return {
    gross: new Decimal(response.gross),
    cas: new Decimal(response.cas),
    cass: new Decimal(response.cass),
    incomeTax: new Decimal(response.incomeTax),
    employerContribution: new Decimal(response.employerContribution),
    estimatedVat: new Decimal(response.estimatedVat),
    net: new Decimal(response.net),
    employerCost: new Decimal(response.employerCost),
    stateShare: new Decimal(response.stateShare),
    statePercent: new Decimal(response.statePercent),
    entries: response.entries.map((entry) => ({
      labelKey: entry.labelKey,
      amount: new Decimal(entry.amount),
    })),
  };
}

export async function fetchBudgetSummary(): Promise<BudgetSummary> {
  const remote = await request("/api/budget/summary", budgetSummarySchema);
  if (remote !== null) {
    return remote;
  }
  return budgetSummarySchema.parse(BUDGET_SUMMARY);
}

export async function fetchDestinations(): Promise<BudgetDestination[]> {
  const remote = await request(
    "/api/budget/destinations",
    z.array(budgetDestinationSchema)
  );
  if (remote !== null) {
    return remote;
  }
  return z.array(budgetDestinationSchema).parse(BUDGET_DESTINATIONS);
}

export async function fetchSalaryBreakdown(
  gross: number
): Promise<SalaryBreakdown | null> {
  const remote = await request(
    `/api/salary/calculate?gross=${gross}`,
    salaryResponseSchema
  );
  if (remote !== null) {
    return toSalaryBreakdown(remote);
  }
  return calculateSalaryBreakdown(gross);
}

export async function fetchRealWageSeries(): Promise<RealWagePoint[]> {
  const remote = await request("/api/context/monetary", monetarySchema);
  if (remote !== null) {
    return remote.realWage;
  }
  return buildRealWageSeries(BNR_INFLATION_SERIES);
}
