import { describe, expect, it } from "vitest";
import { HEALTH_BUDGET_TREND } from "../src/data/budget2026";
import { INS_METRICS_SEED } from "../src/data/insStats";
import { computeTrendInsight, joinBudgetWithIns } from "../src/lib/trendJoin";

const infantMortality = INS_METRICS_SEED["infant-mortality"];
if (infantMortality === undefined) {
  throw new Error("infant-mortality seed missing");
}

describe("joinBudgetWithIns", () => {
  it("inner-joins budget and INS series on year", () => {
    const joined = joinBudgetWithIns(HEALTH_BUDGET_TREND, infantMortality.data);

    expect(joined).toHaveLength(HEALTH_BUDGET_TREND.length);
    for (const point of joined) {
      expect(point.ins).not.toBeNull();
    }
  });

  it("converts budget amounts to milliarde lei", () => {
    const joined = joinBudgetWithIns(HEALTH_BUDGET_TREND, infantMortality.data);

    const first = joined[0];
    expect(first).toBeDefined();
    if (first === undefined) {
      return;
    }
    expect(first.budgetMilliarde).toBeCloseTo(22, 1);
    expect(first.year).toBe(2021);
  });

  it("leaves ins as null when the year is missing", () => {
    const joined = joinBudgetWithIns(HEALTH_BUDGET_TREND, [
      { year: 2021, value: 6.1 },
    ]);

    expect(joined[1]?.ins).toBeNull();
  });
});

describe("computeTrendInsight", () => {
  it("computes percentage changes between first and last points", () => {
    const insight = computeTrendInsight(
      HEALTH_BUDGET_TREND,
      infantMortality.data
    );

    expect(insight).not.toBeNull();
    if (insight === null) {
      return;
    }

    // 22.0B → 22.78B ≈ +3.5%
    expect(insight.budgetChangePercent).toBeCloseTo(3.5, 0);
    // 6.1 → 5.2 ≈ −14.8%
    expect(insight.insChangePercent).toBeCloseTo(-14.8, 0);
  });

  it("returns null for series with fewer than two points", () => {
    expect(computeTrendInsight([{ year: 2026, amount: "100" }], [])).toBeNull();
  });
});
