import { Decimal } from "decimal.js";
import type { InflationPoint } from "../data/bnrInflation";

export interface RealWagePoint {
  year: number;
  nominal: number;
  /** Nominal salary deflated by cumulative CPI (first year = 100). */
  real: number;
}

/**
 * Builds the real wage series: deflates the nominal net salary with the
 * cumulative BNR CPI index. The first data point is the base year.
 * Pure function — inflation percentages become Decimal for the math,
 * numbers only at the display boundary.
 */
export function buildRealWageSeries(points: InflationPoint[]): RealWagePoint[] {
  let cumulativeCpi = new Decimal(100);

  return points.map((point, index) => {
    if (index > 0) {
      cumulativeCpi = cumulativeCpi.mul(
        new Decimal(1).plus(new Decimal(point.cpiPercent).div(100))
      );
    }

    const nominal = new Decimal(point.avgNetSalary);
    const real = nominal.div(cumulativeCpi.div(100));

    return {
      year: point.year,
      nominal: nominal.toNumber(),
      real: real.toNumber(),
    };
  });
}
