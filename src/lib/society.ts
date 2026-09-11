import type { SocietySpending } from "../api/client";

interface SpendingSeriesInput {
  health: SocietySpending["health"];
  education: SocietySpending["education"];
}

export interface SocietySpendingPoint {
  year: string;
  healthPctGdp: number | null;
  educationPctGdp: number | null;
}

/**
 * Joins health and education COFOG spending on the union of years. Missing
 * values stay null so the chart can keep the lines continuous.
 */
export function joinSpending(
  spending: SpendingSeriesInput
): SocietySpendingPoint[] {
  const healthByYear = new Map(
    spending.health.map((point) => [point.year, point.percentGdp])
  );
  const educationByYear = new Map(
    spending.education.map((point) => [point.year, point.percentGdp])
  );

  const years = new Set([...healthByYear.keys(), ...educationByYear.keys()]);

  return [...years]
    .sort((a, b) => a.localeCompare(b))
    .map((year) => ({
      year,
      healthPctGdp: healthByYear.get(year) ?? null,
      educationPctGdp: educationByYear.get(year) ?? null,
    }));
}

export interface PhysicianDensityPoint {
  year: string;
  /** Practising physicians per 100 000 inhabitants. */
  per100k: number;
}

/**
 * Computes the physician density by joining the absolute physician count
 * with the resident population. Years missing from either series are dropped.
 */
export function joinPhysicianDensity(
  physicians: { year: string; count: number }[],
  population: { year: string; population: number }[]
): PhysicianDensityPoint[] {
  const populationByYear = new Map(
    population.map((point) => [point.year, point.population])
  );

  const points: PhysicianDensityPoint[] = [];
  for (const physician of physicians) {
    const pop = populationByYear.get(physician.year);
    if (pop === undefined || pop <= 0) {
      continue;
    }
    points.push({
      year: physician.year,
      per100k: Math.round((physician.count / pop) * 100000 * 10) / 10,
    });
  }
  return points.sort((a, b) => a.year.localeCompare(b.year));
}
