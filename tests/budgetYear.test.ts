import { describe, expect, it } from "vitest";
import { pickDefaultYear } from "../src/store/useBudgetYearStore";

describe("pickDefaultYear", () => {
  const current = new Date().getFullYear();

  it("picks the latest complete year when available", () => {
    expect(pickDefaultYear([2020, 2021, current - 1, current])).toBe(
      current - 1
    );
  });

  it("falls back to the current year when it is the only one", () => {
    expect(pickDefaultYear([current])).toBe(current);
  });

  it("returns null for an empty list", () => {
    expect(pickDefaultYear([])).toBeNull();
  });
});
