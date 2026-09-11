import { describe, expect, it } from "vitest";
import { BNR_INFLATION_SERIES } from "../src/data/bnrInflation";
import { buildRealWageSeries } from "../src/lib/realWage";

describe("buildRealWageSeries", () => {
  it("keeps the base year nominal equal to real", () => {
    const series = buildRealWageSeries(BNR_INFLATION_SERIES);
    const first = series[0];

    expect(first).toBeDefined();
    if (first === undefined) {
      return;
    }
    expect(first.real).toBeCloseTo(first.nominal, 6);
  });

  it("deflates the wage when inflation is positive", () => {
    const series = buildRealWageSeries(BNR_INFLATION_SERIES);
    const last = series.at(-1);

    expect(last).toBeDefined();
    if (last === undefined) {
      return;
    }
    expect(last.real).toBeLessThan(last.nominal);
  });

  it("preserves the year ordering and count", () => {
    const series = buildRealWageSeries(BNR_INFLATION_SERIES);

    expect(series).toHaveLength(BNR_INFLATION_SERIES.length);
    for (let index = 1; index < series.length; index += 1) {
      const previous = series[index - 1];
      const current = series[index];
      expect(current?.year).toBeGreaterThan(previous?.year ?? 0);
    }
  });
});
