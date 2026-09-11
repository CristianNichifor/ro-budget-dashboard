/**
 * Consolidated budget 2026 (central, social, health).
 * Source: Open Budget 2026 (openbudget.ro/buget/2026).
 * DEMO NOTE: amounts are static seeds. Phase P2 replaces them with data
 * from hack-for-facts-eb-server. All monetary values are strings — see the
 * "no floats" rule (decimal.js everywhere).
 */
export const BUDGET_YEAR = 2026;

export const BUDGET_SUMMARY = {
  year: BUDGET_YEAR,
  revenue: "728990724000",
  expenditure: "864675193000",
  deficit: "135684469000",
  deficitPercentGdp: "7.1",
} as const;

export interface BudgetSubDestination {
  id: string;
  name: string;
  amount: string;
}

export interface BudgetDestination {
  id: string;
  name: string;
  amount: string;
  percentOfTotal: string;
  subDestinations?: BudgetSubDestination[];
}

export const BUDGET_DESTINATIONS: BudgetDestination[] = [
  {
    id: "pensii",
    name: "Pensii",
    amount: "217814450000",
    percentOfTotal: "25.2",
    subDestinations: [
      {
        id: "pensii-contributive",
        name: "Pensii contributive",
        amount: "154755000000",
      },
      { id: "pensii-speciale", name: "Pensii speciale", amount: "18710547184" },
      { id: "pensii-minime", name: "Pensii minime", amount: "18664373816" },
      { id: "pensii-urmas", name: "Pensii de urmaș", amount: "1885000000" },
    ],
  },
  {
    id: "fonduri-externe",
    name: "Proiecte pe fonduri externe",
    amount: "146837970000",
    percentOfTotal: "17.0",
  },
  {
    id: "asistenta-sociala",
    name: "Asistență socială",
    amount: "113504154000",
    percentOfTotal: "13.1",
  },
  {
    id: "salarii",
    name: "Salarii",
    amount: "110091069000",
    percentOfTotal: "12.7",
  },
  {
    id: "datorii",
    name: "Datorii și angajamente",
    amount: "82751313000",
    percentOfTotal: "9.6",
  },
  {
    id: "investitii",
    name: "Investiții",
    amount: "35928663000",
    percentOfTotal: "4.2",
  },
];

export interface RevenueSource {
  id: string;
  name: string;
  /** DEMO: illustrative estimate, replaced by execution data in P2. */
  amount: string;
}

export const REVENUE_SOURCES: RevenueSource[] = [
  { id: "contributii", name: "Contribuții sociale", amount: "195000000000" },
  { id: "tva", name: "TVA", amount: "160000000000" },
  { id: "impozite", name: "Impozit venit și profit", amount: "120000000000" },
  {
    id: "accize-altele",
    name: "Accize și alte venituri",
    amount: "105000000000",
  },
  { id: "fonduri-ue", name: "Fonduri europene", amount: "150000000000" },
];

export interface YearAmount {
  year: number;
  amount: string;
}

/**
 * Public health spending, millions EUR (Eurostat COFOG gov_10a_exp, GF07).
 * DEMO NOTE: static snapshot — the BFF serves this live; it is only used
 * when the API is unreachable.
 */
export const HEALTH_BUDGET_TREND: YearAmount[] = [
  { year: 2019, amount: "11171.0" },
  { year: 2020, amount: "12064.4" },
  { year: 2021, amount: "13232.4" },
  { year: 2022, amount: "13920.9" },
  { year: 2023, amount: "15277.8" },
  { year: 2024, amount: "18319.5" },
];
