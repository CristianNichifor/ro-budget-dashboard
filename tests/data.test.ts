import { Decimal } from "decimal.js";
import { describe, expect, it } from "vitest";
import {
  BUDGET_DESTINATIONS,
  BUDGET_SUMMARY,
  REVENUE_SOURCES,
} from "../src/data/budget2026";
import { TAX_RATES_2026 } from "../src/data/taxRates";

describe("static data integrity", () => {
  it("budget identity holds: revenue + deficit = expenditure", () => {
    const revenue = new Decimal(BUDGET_SUMMARY.revenue);
    const deficit = new Decimal(BUDGET_SUMMARY.deficit);
    const expenditure = new Decimal(BUDGET_SUMMARY.expenditure);

    expect(
      revenue.plus(deficit).minus(expenditure).abs().toNumber()
    ).toBeLessThan(1);
  });

  it("destination percentages match their share of expenditure", () => {
    const destinationsTotal = BUDGET_DESTINATIONS.reduce(
      (sum, destination) => sum.plus(destination.amount),
      new Decimal(0)
    );
    const expenditure = new Decimal(BUDGET_SUMMARY.expenditure);
    const expectedShare = destinationsTotal
      .div(expenditure)
      .mul(100)
      .toNumber();

    const declaredShare = BUDGET_DESTINATIONS.reduce(
      (sum, destination) => sum + Number(destination.percentOfTotal),
      0
    );

    // Top destinations cover ~82% of expenditure; the rest is "Alte destinații".
    expect(declaredShare).toBeGreaterThan(70);
    expect(declaredShare).toBeLessThan(90);
    expect(declaredShare).toBeCloseTo(expectedShare, 0);
  });

  it("all destination and revenue amounts are positive", () => {
    for (const destination of BUDGET_DESTINATIONS) {
      expect(new Decimal(destination.amount).toNumber()).toBeGreaterThan(0);
    }
    for (const source of REVENUE_SOURCES) {
      expect(new Decimal(source.amount).toNumber()).toBeGreaterThan(0);
    }
  });

  it("tax rates are valid percentages", () => {
    const rates = Object.values(TAX_RATES_2026);
    expect(rates.length).toBeGreaterThan(0);
    for (const rate of rates) {
      const value = new Decimal(rate).toNumber();
      expect(value).toBeGreaterThan(0);
      expect(value).toBeLessThan(1);
    }
  });
});
