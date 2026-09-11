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

export async function fetchBudgetSummary(year: string): Promise<BudgetSummary> {
  const remote = await request(
    `/api/budget/summary?year=${encodeURIComponent(year)}`,
    budgetSummarySchema
  );
  if (remote !== null) {
    return remote;
  }
  return budgetSummarySchema.parse(BUDGET_SUMMARY);
}

export async function fetchDestinations(
  year: string
): Promise<BudgetDestination[]> {
  const remote = await request(
    `/api/budget/destinations?year=${encodeURIComponent(year)}`,
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
  year: string,
  category: string
): Promise<InstitutionsResponse> {
  const remote = await request(
    `/api/budget/institutions?category=${category}&year=${encodeURIComponent(year)}`,
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

export const budgetYearsSchema = z.object({
  years: z.array(z.number().int()),
});

export type BudgetYears = z.infer<typeof budgetYearsSchema>;

export const FIRST_LOCAL_YEAR = 2020;

export function localBudgetYears(): number[] {
  const current = new Date().getFullYear();
  const years: number[] = [];
  for (let year = FIRST_LOCAL_YEAR; year <= current; year += 1) {
    years.push(year);
  }
  return years;
}

export async function fetchBudgetYears(): Promise<number[]> {
  const remote = await request("/api/budget/years", budgetYearsSchema);
  if (remote !== null) {
    return remote.years;
  }
  return localBudgetYears();
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

// ── Companii de stat (companiidestat.ro via BFF) ──────────────────────

const soeTopEntrySchema = z.object({
  cui: z.string(),
  name: z.string(),
  marginPercent: z.number(),
});

const soeTopEmployerSchema = z.object({
  cui: z.string(),
  name: z.string(),
  employees: z.number().int(),
  revenue: z.string(),
});

const soePayScaleRowSchema = z.object({
  kind: z.string(),
  label: z.string(),
  value: z.number(),
  unit: z.string(),
});

export const soeSummarySchema = z.object({
  stats: z.object({
    year: z.number().int(),
    updatedAt: z.string(),
    totalCompanies: z.number().int(),
    companiesWithData: z.number().int(),
    central: z.number().int(),
    local: z.number().int(),
    revenue: z.string(),
    profit: z.string(),
    losses: z.string(),
    companiesOnLoss: z.number().int(),
  }),
  payScale: z.array(soePayScaleRowSchema),
  topProfit: z.array(soeTopEntrySchema),
  topLoss: z.array(soeTopEntrySchema),
  topEmployers: z.array(soeTopEmployerSchema),
  emblematice: z.array(
    z.object({
      cui: z.string(),
      name: z.string(),
      label: z.string(),
      status: z.string(),
      marginPercent: z.number(),
      maxSalary: z.string(),
      subsidy2025MiiLei: z.string().nullable(),
    })
  ),
});

export type SoeSummary = z.infer<typeof soeSummarySchema>;

export const soeSectorTrendSchema = z.object({
  sectors: z.array(
    z.object({
      key: z.string(),
      label: z.string(),
      series: z.array(
        z.object({
          year: z.number().int(),
          total: z.number().int(),
          onLoss: z.number().int(),
          lossPercent: z.number(),
        })
      ),
    })
  ),
  sourceNote: z.string(),
});

export type SoeSectorTrend = z.infer<typeof soeSectorTrendSchema>;

export const soeByCountySchema = z.object({
  year: z.number().int(),
  counties: z.array(
    z.object({
      code: z.number(),
      name: z.string(),
      companies: z.number().int(),
      onLoss: z.number().int(),
      lossPercent: z.number(),
      medianMargin: z.number(),
      revenue: z.string(),
      profit: z.string(),
      losses: z.string(),
    })
  ),
});

export type SoeByCounty = z.infer<typeof soeByCountySchema>;

export const soeScatterSchema = z.object({
  year: z.number().int(),
  points: z.array(
    z.object({
      cui: z.string(),
      name: z.string(),
      marginPercent: z.number(),
      annualCost: z.string(),
      maxSalary: z.string(),
      employees: z.number().int(),
      levier: z.number(),
      roe: z.number(),
    })
  ),
});

export type SoeScatter = z.infer<typeof soeScatterSchema>;

export const soeCompanySchema = z.object({
  cui: z.string(),
  name: z.string(),
  county: z.string(),
  sectorKey: z.string(),
  sectorLabel: z.string(),
  caen: z.string(),
  ticker: z.string().nullable(),
  listed: z.boolean(),
  tier: z.number(),
  status: z.string(),
  status2025: z.string().nullable(),
  financials: z.array(
    z.object({
      year: z.number().int(),
      margin: z.number().nullable(),
      roe: z.number().nullable(),
      levier: z.number().nullable(),
      status: z.string(),
    })
  ),
  salaries: z.object({
    maxSalary: z.string(),
    annualCost: z.string(),
    people: z.number().int(),
  }),
  mfin: z.object({
    ca: z.string(),
    profit: z.string(),
    loss: z.string(),
    employees: z.number().int(),
    capitaluri: z.string(),
  }),
  subsidy2025MiiLei: z.string().nullable(),
  subsidy2025Source: z.string().nullable(),
});

export type SoeCompany = z.infer<typeof soeCompanySchema>;

export const soeSubsidiesSchema = z.object({
  year: z.number().int(),
  total: z.string(),
  uats: z.number().int(),
  counties: z.array(
    z.object({
      name: z.string(),
      total: z.string(),
      tr: z.string(),
      te: z.string(),
      uats: z.number().int(),
    })
  ),
  operators: z.array(
    z.object({
      cui: z.string(),
      name: z.string(),
      uat: z.string(),
      sector: z.string(),
      subsidy: z.string(),
      revenue: z.string(),
      profit: z.string(),
      loss: z.string(),
    })
  ),
});

export type SoeSubsidies = z.infer<typeof soeSubsidiesSchema>;

export const soeListedSchema = z.object({
  companies: z.array(
    z.object({
      ticker: z.string(),
      name: z.string(),
      listedYear: z.number().int(),
      statePercent: z.number(),
      ministry: z.string(),
      yearlyProfit: z.array(
        z.object({ year: z.number().int(), profitMldLei: z.number() })
      ),
      monthlyPrice: z.array(z.object({ ym: z.string(), priceLei: z.number() })),
    })
  ),
});

export type SoeListed = z.infer<typeof soeListedSchema>;

export async function fetchSoeSummary(): Promise<SoeSummary | null> {
  return request("/api/soe/summary", soeSummarySchema);
}

export async function fetchSoeSectorTrend(): Promise<SoeSectorTrend | null> {
  return request("/api/soe/sector-trend", soeSectorTrendSchema);
}

export async function fetchSoeByCounty(): Promise<SoeByCounty | null> {
  return request("/api/soe/by-county", soeByCountySchema);
}

export async function fetchSoeScatter(): Promise<SoeScatter | null> {
  return request("/api/soe/scatter", soeScatterSchema);
}

export async function fetchSoeCompany(cui: string): Promise<SoeCompany | null> {
  return request(`/api/soe/companies/${cui}`, soeCompanySchema);
}

export async function fetchSoeSubsidies(
  year: string
): Promise<SoeSubsidies | null> {
  return request(`/api/soe/subsidies?year=${year}`, soeSubsidiesSchema);
}

export async function fetchSoeListed(): Promise<SoeListed | null> {
  return request("/api/soe/listed", soeListedSchema);
}

// ── Macro (Eurostat + BCE via BFF) ────────────────────────────────────

export const inflationSchema = z.object({
  targetPercent: z.number(),
  monthly: z.array(z.object({ ym: z.string(), annualRate: z.number() })),
});

export type InflationSeries = z.infer<typeof inflationSchema>;

export const unemploymentSchema = z.object({
  monthly: z.array(z.object({ ym: z.string(), rate: z.number() })),
});

export type UnemploymentSeries = z.infer<typeof unemploymentSchema>;

export const fxSchema = z.object({
  series: z.array(z.object({ date: z.string(), eurRon: z.number() })),
});

export type FxSeries = z.infer<typeof fxSchema>;

export async function fetchInflation(): Promise<InflationSeries | null> {
  return request("/api/macro/inflation", inflationSchema);
}

export async function fetchUnemployment(): Promise<UnemploymentSeries | null> {
  return request("/api/macro/unemployment", unemploymentSchema);
}

export async function fetchFx(): Promise<FxSeries | null> {
  return request("/api/macro/fx", fxSchema);
}

export const gdpGrowthSchema = z.object({
  quarterly: z.array(z.object({ quarter: z.string(), pctChange: z.number() })),
});

export type GdpGrowthSeries = z.infer<typeof gdpGrowthSchema>;

export const gdpPerCapitaSchema = z.object({
  yearly: z.array(
    z.object({ year: z.string(), pps: z.number(), eu27Index: z.number() })
  ),
});

export type GdpPerCapitaSeries = z.infer<typeof gdpPerCapitaSchema>;

export const debtSchema = z.object({
  yearly: z.array(z.object({ year: z.string(), percentGdp: z.number() })),
});

export type DebtSeries = z.infer<typeof debtSchema>;

export const tradeSchema = z.object({
  yearly: z.array(
    z.object({
      year: z.string(),
      exportsPctGdp: z.number(),
      importsPctGdp: z.number(),
      balancePctGdp: z.number(),
    })
  ),
});

export type TradeSeries = z.infer<typeof tradeSchema>;

export const demographicsSchema = z.object({
  yearly: z.array(z.object({ year: z.string(), oldAgeDependency: z.number() })),
});

export type DemographicSeries = z.infer<typeof demographicsSchema>;

export async function fetchGdpGrowth(): Promise<GdpGrowthSeries | null> {
  return request("/api/macro/gdp-growth", gdpGrowthSchema);
}

export async function fetchGdpPerCapita(): Promise<GdpPerCapitaSeries | null> {
  return request("/api/macro/gdp-per-capita", gdpPerCapitaSchema);
}

export async function fetchDebt(): Promise<DebtSeries | null> {
  return request("/api/macro/debt", debtSchema);
}

export async function fetchTrade(): Promise<TradeSeries | null> {
  return request("/api/macro/trade", tradeSchema);
}

export async function fetchDemographics(): Promise<DemographicSeries | null> {
  return request("/api/macro/demographics", demographicsSchema);
}

export interface PensionYearPoint {
  year: number;
  milliarde: number;
}

/** Functional code of the public-pensions destination (COFOG-style). */
export const PENSION_DESTINATION_ID = "68.03.00";

/**
 * Pensions spending per year, in milliarde lei, taken from the per-year
 * budget destinations. Falls back to the demo seed when the BFF is down.
 */
export async function fetchPensionTrend(
  years: number[]
): Promise<PensionYearPoint[]> {
  const results = await Promise.all(
    years.map(async (year) => {
      const destinations = await fetchDestinations(String(year));
      const pension = destinations.find(
        (destination) =>
          destination.id === PENSION_DESTINATION_ID ||
          destination.id === "pensii"
      );
      if (pension === undefined) {
        return null;
      }
      return {
        year,
        milliarde: new Decimal(pension.amount)
          .div(1e9)
          .toDecimalPlaces(1)
          .toNumber(),
      };
    })
  );
  return results.filter((point): point is PensionYearPoint => point !== null);
}
