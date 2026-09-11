/**
 * INS statistical metrics — demo seeds.
 * P3: served by the BFF (/api/ins/metrics) from transparenta-eu-ins-loader;
 * these local seeds are the fallback when the BFF is unreachable.
 */
export interface InsMetricPoint {
  year: number;
  value: number;
}

export interface InsMetric {
  code: string;
  unit: string;
  label: string;
  data: InsMetricPoint[];
}

export const INS_METRICS_SEED: Record<string, InsMetric> = {
  "infant-mortality": {
    code: "infant-mortality",
    unit: "la 1.000 locuitori",
    label: "Mortalitate infantilă",
    data: [
      { year: 2021, value: 6.1 },
      { year: 2022, value: 5.9 },
      { year: 2023, value: 5.7 },
      { year: 2024, value: 5.5 },
      { year: 2025, value: 5.4 },
      { year: 2026, value: 5.2 },
    ],
  },
  pensioners: {
    code: "pensioners",
    unit: "persoane",
    label: "Beneficiari de pensii",
    data: [
      { year: 2019, value: 5140756 },
      { year: 2020, value: 5122122 },
      { year: 2021, value: 5043972 },
      { year: 2022, value: 4993076 },
      { year: 2023, value: 4983074 },
    ],
  },
  "hospital-beds": {
    code: "hospital-beds",
    unit: "mii paturi",
    label: "Paturi de spital",
    data: [
      { year: 2021, value: 133.2 },
      { year: 2022, value: 131.4 },
      { year: 2023, value: 129.8 },
      { year: 2024, value: 128.1 },
      { year: 2025, value: 127.2 },
      { year: 2026, value: 126.5 },
    ],
  },
};
