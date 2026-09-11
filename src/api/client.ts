import { Decimal } from "decimal.js";
import { z } from "zod";
import { useDataModeStore } from "../store/useDataModeStore";
import {
  BUDGET_DESTINATIONS,
  BUDGET_SUMMARY,
  HEALTH_BUDGET_TREND,
  type BudgetDestination,
  type YearAmount,
} from "../data/budget2026";
import { BNR_INFLATION_SERIES } from "../data/bnrInflation";
import { INS_METRICS_SEED, type InsMetric } from "../data/insStats";
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
    useDataModeStore.getState().reportRequest(true);
    return schema.parse(await response.json());
  } catch (error) {
    console.warn(`[api] BFF unreachable for ${path}, using local data`, error);
    useDataModeStore.getState().reportRequest(false);
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

export const institutionsResponseSchema = z.object({
  category: z.string(),
  total: z.string(),
  institutions: z.array(budgetSubDestinationSchema),
});

export type InstitutionsResponse = z.infer<typeof institutionsResponseSchema>;

export async function fetchInstitutions(
  category: string
): Promise<InstitutionsResponse> {
  const remote = await request(
    `/api/budget/institutions?category=${category}`,
    institutionsResponseSchema
  );
  if (remote !== null) {
    return remote;
  }
  const destination = BUDGET_DESTINATIONS.find(
    (entry) => entry.id === category
  );
  return {
    category,
    total: destination?.amount ?? "0",
    institutions: destination?.subDestinations ?? [],
  };
}

export const countyInvestmentSchema = z.object({
  county: z.string(),
  region: z.string(),
  amount: z.string(),
});

const investmentsByCountySchema = z.object({
  year: z.number().int(),
  total: z.string(),
  counties: z.array(countyInvestmentSchema),
});

export type InvestmentsByCounty = z.infer<typeof investmentsByCountySchema>;
export type CountyInvestment = z.infer<typeof countyInvestmentSchema>;

export async function fetchCountyInvestments(): Promise<InvestmentsByCounty | null> {
  return request("/api/investments/by-county", investmentsByCountySchema);
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

export const insMetricSchema = z.object({
  code: z.string(),
  unit: z.string(),
  label: z.string(),
  data: z.array(
    z.object({
      year: z.number().int(),
      value: z.number(),
    })
  ),
});

export async function fetchInsMetric(code: string): Promise<InsMetric> {
  const remote = await request(
    `/api/ins/metrics?code=${code}`,
    insMetricSchema
  );
  if (remote !== null) {
    return remote;
  }
  return INS_METRICS_SEED[code] ?? { code, unit: "", label: code, data: [] };
}

export const insCatalogSchema = z.object({
  metrics: z.array(
    z.object({
      code: z.string(),
      label: z.string(),
      unit: z.string(),
    })
  ),
});

export type InsCatalogEntry = z.infer<
  typeof insCatalogSchema
>["metrics"][number];

export async function fetchInsCatalog(): Promise<InsCatalogEntry[]> {
  const remote = await request("/api/ins/catalog", insCatalogSchema);
  if (remote !== null) {
    return remote.metrics;
  }
  return Object.values(INS_METRICS_SEED).map(({ code, label, unit }) => ({
    code,
    label,
    unit,
  }));
}

export interface BudgetTrend {
  metric: string;
  source: string;
  data: YearAmount[];
}

const budgetTrendSchema = z.object({
  metric: z.string(),
  source: z.string(),
  data: z.array(
    z.object({
      year: z.number().int(),
      amount: z.string(),
    })
  ),
});

export async function fetchBudgetTrend(metric: string): Promise<BudgetTrend> {
  const remote = await request(
    `/api/context/trends?metric=${metric}`,
    budgetTrendSchema
  );
  if (remote !== null) {
    return remote;
  }
  return { metric, source: "seed demo", data: HEALTH_BUDGET_TREND };
}
