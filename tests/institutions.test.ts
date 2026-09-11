import { describe, expect, it } from "vitest";
import type { BudgetSubDestination } from "../src/data/budget2026";
import { computeInstitutionShares } from "../src/lib/institutions";

const institutions: BudgetSubDestination[] = [
  { id: "a", name: "Mare", amount: "60000000000" },
  { id: "b", name: "Mic", amount: "20000000000" },
  { id: "c", name: "Mediu", amount: "20000000000" },
];

describe("computeInstitutionShares", () => {
  it("computes percent shares of the total and sorts descending", () => {
    const shares = computeInstitutionShares(institutions, "100000000000");

    expect(shares).toEqual([
      { id: "a", name: "Mare", amount: "60000000000", sharePercent: 60 },
      { id: "b", name: "Mic", amount: "20000000000", sharePercent: 20 },
      { id: "c", name: "Mediu", amount: "20000000000", sharePercent: 20 },
    ]);
  });

  it("returns zero shares when the total is zero", () => {
    const shares = computeInstitutionShares(institutions, "0");

    expect(shares.map((share) => share.sharePercent)).toEqual([0, 0, 0]);
  });

  it("handles an empty list", () => {
    expect(computeInstitutionShares([], "100000000000")).toEqual([]);
  });
});
