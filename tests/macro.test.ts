import { describe, expect, it } from "vitest";
import { joinPensionAge, shortQuarter } from "../src/lib/macro";

describe("joinPensionAge", () => {
  it("joins both series on the union of years with nulls for gaps", () => {
    const result = joinPensionAge(
      [
        { year: 2020, milliarde: 80 },
        { year: 2022, milliarde: 90 },
      ],
      [
        { year: "2021", oldAgeDependency: 29 },
        { year: "2022", oldAgeDependency: 30 },
      ]
    );

    expect(result).toEqual([
      { year: "2020", pensiiMilliarde: 80, oldAgeDependency: null },
      { year: "2021", pensiiMilliarde: null, oldAgeDependency: 29 },
      { year: "2022", pensiiMilliarde: 90, oldAgeDependency: 30 },
    ]);
  });

  it("returns an empty array when both inputs are empty", () => {
    expect(joinPensionAge([], [])).toEqual([]);
  });
});

describe("shortQuarter", () => {
  it("shortens year-quarter labels", () => {
    expect(shortQuarter("2026-Q2")).toBe("Q2 '26");
  });

  it("passes through unknown formats", () => {
    expect(shortQuarter("2026")).toBe("2026");
  });
});
