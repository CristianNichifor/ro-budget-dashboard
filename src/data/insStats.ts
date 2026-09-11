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
    unit: "milioane persoane",
    label: "Număr pensionari",
    data: [
      { year: 2021, value: 4.85 },
      { year: 2022, value: 4.82 },
      { year: 2023, value: 4.79 },
      { year: 2024, value: 4.75 },
      { year: 2025, value: 4.72 },
      { year: 2026, value: 4.7 },
    ],
  },
  "average-pension": {
    code: "average-pension",
    unit: "lei/lună",
    label: "Pensie medie",
    data: [
      { year: 2021, value: 1601 },
      { year: 2022, value: 1680 },
      { year: 2023, value: 1971 },
      { year: 2024, value: 2201 },
      { year: 2025, value: 2350 },
      { year: 2026, value: 2500 },
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
