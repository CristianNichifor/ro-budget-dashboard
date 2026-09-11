import { describe, expect, it } from "vitest";
import { HEALTH_BUDGET_TREND } from "../src/data/budget2026";
import { INS_METRICS_SEED } from "../src/data/insStats";
import { computeTrendInsight, joinBudgetWithIns } from "../src/lib/trendJoin";

const infantMortality = INS_METRICS_SEED["infant-mortality"];
if (infantMortality === undefined) {
  throw new Error("infant-mortality seed missing");
}

describe("joinBudgetWithIns", () => {
  it("joins health spending and INS series on year", () => {
    const joined = joinBudgetWithIns(HEALTH_BUDGET_TREND, infantMortality.data);

    expect(joined).toHaveLength(HEALTH_BUDGET_TREND.length);
    // 2019 and 2020 precede the INS seed range.
    expect(joined[0]?.ins).toBeNull();
    expect(joined[1]?.ins).toBeNull();
    expect(joined[2]?.ins).not.toBeNull();
  });

  it("converts millions EUR to milliarde EUR", () => {
    const joined = joinBudgetWithIns(HEALTH_BUDGET_TREND, infantMortality.data);

    const first = joined[0];
    expect(first).toBeDefined();
    if (first === undefined) {
      return;
    }
    expect(first.budgetMilliardeEur).toBeCloseTo(11.2, 1);
    expect(first.year).toBe(2019);
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

    // 11171.0M → 18319.5M ≈ +64%
    expect(insight.budgetChangePercent).toBeCloseTo(64, 0);
    // 6.1 → 5.2 ≈ −14.8%
    expect(insight.insChangePercent).toBeCloseTo(-14.8, 0);
  });

  it("returns null for series with fewer than two points", () => {
    expect(computeTrendInsight([{ year: 2026, amount: "100" }], [])).toBeNull();
  });
});
