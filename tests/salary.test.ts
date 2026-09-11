import { Decimal } from "decimal.js";
import { describe, expect, it } from "vitest";
import {
  calculateSalaryBreakdown,
  type SalaryBreakdown,
} from "../src/lib/salary";

function breakdownFor(gross: number): SalaryBreakdown {
  const breakdown = calculateSalaryBreakdown(gross);
  expect(breakdown).not.toBeNull();
  return breakdown as SalaryBreakdown;
}

describe("calculateSalaryBreakdown", () => {
  it("returns null for invalid inputs", () => {
    expect(calculateSalaryBreakdown(0)).toBeNull();
    expect(calculateSalaryBreakdown(-100)).toBeNull();
    expect(calculateSalaryBreakdown(Number.NaN)).toBeNull();
    expect(calculateSalaryBreakdown(Number.POSITIVE_INFINITY)).toBeNull();
    expect(calculateSalaryBreakdown("")).toBeNull();
  });

  it("computes CAS/CASS/income tax on the standard 2026 rates", () => {
    const gross = 10_000;
    const b = breakdownFor(gross);

    expect(b.cas.toNumber()).toBeCloseTo(2500, 8);
    expect(b.cass.toNumber()).toBeCloseTo(1000, 8);
    expect(b.incomeTax.toNumber()).toBeCloseTo(650, 8);
    expect(b.net.toNumber()).toBeCloseTo(5850, 8);
  });

  it("computes the employer contribution on top of gross", () => {
    const b = breakdownFor(10_000);

    expect(b.employerContribution.toNumber()).toBeCloseTo(225, 8);
    expect(b.employerCost.toNumber()).toBeCloseTo(10_225, 8);
  });

  it("keeps the state share between 50% and 60% of employer cost at 9427 lei", () => {
    const b = breakdownFor(9427);

    const percent = b.statePercent.toNumber();
    expect(percent).toBeGreaterThan(50);
    expect(percent).toBeLessThan(60);
  });

  it("state share plus net equals employer cost plus VAT", () => {
    const b = breakdownFor(9427);

    const left = b.stateShare.plus(b.net);
    const right = b.employerCost.plus(b.estimatedVat);
    expect(left.minus(right).abs().toNumber()).toBeLessThan(1e-9);
  });

  it("uses Decimal arithmetic (no floating point drift)", () => {
    const b = breakdownFor(9999.99);

    const netViaParts = new Decimal(9999.99)
      .minus(b.cas)
      .minus(b.cass)
      .minus(b.incomeTax);
    expect(netViaParts.minus(b.net).abs().toNumber()).toBeLessThan(1e-9);
  });
});
