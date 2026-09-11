import { describe, expect, it } from "vitest";
import { estimateAverageNetSalary } from "../src/lib/averageSalary";

describe("estimateAverageNetSalary", () => {
  const anchors = [{ year: "2022", meanGrossEur: 12000 }];
  const fx = [{ date: "2026-09-01", eurRon: 5 }];

  it("converts the latest SES anchor and FX rate into a net salary", () => {
    const estimate = estimateAverageNetSalary(anchors, fx);

    expect(estimate).not.toBeNull();
    // 12000 EUR / 12 * 5 = 5000 lei gross → net 2925 lei.
    expect(estimate?.toNumber()).toBe(2925);
  });

  it("uses the latest anchor and the latest FX rate", () => {
    const estimate = estimateAverageNetSalary(
      [
        { year: "2018", meanGrossEur: 10000 },
        { year: "2022", meanGrossEur: 12000 },
      ],
      [
        { date: "2026-01-01", eurRon: 4.5 },
        { date: "2026-09-01", eurRon: 5 },
      ]
    );

    expect(estimate?.toNumber()).toBe(2925);
  });

  it("returns null when anchors or FX are missing", () => {
    expect(estimateAverageNetSalary([], fx)).toBeNull();
    expect(estimateAverageNetSalary(anchors, [])).toBeNull();
  });
});
