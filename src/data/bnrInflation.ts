/**
 * BNR monetary context — demo seed.
 * Phase P4: replaced by BNR inflation reports (manual quarterly update
 * script) or the datasets mechanism of hack-for-facts-eb-server.
 * avgNetSalary is the INS average net salary (approximate values).
 */
export interface InflationPoint {
  year: number;
  /** Annual CPI inflation, percent. */
  cpiPercent: number;
  /** Average net salary, lei/month. */
  avgNetSalary: number;
}

export const BNR_INFLATION_SERIES: InflationPoint[] = [
  { year: 2021, cpiPercent: 5.1, avgNetSalary: 3416 },
  { year: 2022, cpiPercent: 13.8, avgNetSalary: 3907 },
  { year: 2023, cpiPercent: 10.4, avgNetSalary: 4564 },
  { year: 2024, cpiPercent: 5.9, avgNetSalary: 5062 },
  { year: 2025, cpiPercent: 7.2, avgNetSalary: 5168 },
  { year: 2026, cpiPercent: 9.69, avgNetSalary: 5539 },
];

export const BNR_INFLATION_TARGET = 2.5;
