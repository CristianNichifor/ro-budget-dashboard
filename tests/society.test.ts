import { describe, expect, it } from "vitest";
import { joinPhysicianDensity, joinSpending } from "../src/lib/society";

describe("joinSpending", () => {
  it("joins health and education on the union of years with nulls for gaps", () => {
    const result = joinSpending({
      health: [
        { year: "2020", percentGdp: 5.1 },
        { year: "2022", percentGdp: 5.5 },
      ],
      education: [
        { year: "2021", percentGdp: 3.1 },
        { year: "2022", percentGdp: 3.0 },
      ],
    });

    expect(result).toEqual([
      { year: "2020", healthPctGdp: 5.1, educationPctGdp: null },
      { year: "2021", healthPctGdp: null, educationPctGdp: 3.1 },
      { year: "2022", healthPctGdp: 5.5, educationPctGdp: 3.0 },
    ]);
  });

  it("sorts years ascending", () => {
    const result = joinSpending({
      health: [
        { year: "2022", percentGdp: 5.5 },
        { year: "2020", percentGdp: 5.1 },
      ],
      education: [],
    });
    expect(result.map((point) => point.year)).toEqual(["2020", "2022"]);
  });

  it("returns an empty array for empty input", () => {
    expect(joinSpending({ health: [], education: [] })).toEqual([]);
  });
});

describe("joinPhysicianDensity", () => {
  it("computes physicians per 100k by joining count with population", () => {
    const result = joinPhysicianDensity(
      [{ year: "2024", count: 72000 }],
      [{ year: "2024", population: 19000000 }]
    );
    expect(result).toEqual([{ year: "2024", per100k: 378.9 }]);
  });

  it("drops years with no matching population", () => {
    const result = joinPhysicianDensity(
      [{ year: "2024", count: 72000 }],
      [{ year: "2023", population: 19000000 }]
    );
    expect(result).toEqual([]);
  });

  it("sorts years ascending", () => {
    const result = joinPhysicianDensity(
      [
        { year: "2024", count: 72000 },
        { year: "2022", count: 69000 },
      ],
      [
        { year: "2024", population: 19000000 },
        { year: "2022", population: 19000000 },
      ]
    );
    expect(result.map((point) => point.year)).toEqual(["2022", "2024"]);
  });
});
