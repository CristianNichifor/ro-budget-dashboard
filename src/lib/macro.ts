import type { PensionYearPoint } from "../api/client";

export interface PensionAgePoint {
  year: string;
  pensiiMilliarde: number | null;
  oldAgeDependency: number | null;
}

/**
 * Joins per-year pensions spending with the old-age dependency ratio on
 * the union of years. Missing values stay null so charts can keep the
 * series continuous (connectNulls) or skip bars.
 */
export function joinPensionAge(
  pensions: PensionYearPoint[],
  demographics: { year: string; oldAgeDependency: number }[]
): PensionAgePoint[] {
  const years = new Set<string>();
  for (const point of pensions) {
    years.add(String(point.year));
  }
  for (const point of demographics) {
    years.add(point.year);
  }

  const pensionsByYear = new Map(
    pensions.map((point) => [String(point.year), point.milliarde])
  );
  const dependencyByYear = new Map(
    demographics.map((point) => [point.year, point.oldAgeDependency])
  );

  return [...years]
    .sort((a, b) => a.localeCompare(b))
    .map((year) => ({
      year,
      pensiiMilliarde: pensionsByYear.get(year) ?? null,
      oldAgeDependency: dependencyByYear.get(year) ?? null,
    }));
}

/** "2026-Q2" -> "Q2 '26" for dense quarterly axes. */
export function shortQuarter(quarter: string): string {
  const match = /^\d{4}-Q(\d)$/.exec(quarter);
  if (match === null) {
    return quarter;
  }
  return `Q${match[1]} '${quarter.slice(2, 4)}`;
}
