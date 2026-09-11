import { describe, expect, it } from "vitest";
import { toCsv } from "../src/lib/csv";

describe("toCsv", () => {
  it("joins headers and rows with commas", () => {
    expect(
      toCsv(
        ["Perioadă", "Valoare"],
        [
          ["2023", 6.1],
          ["2024", 5.5],
        ]
      )
    ).toBe("Perioadă,Valoare\n2023,6.1\n2024,5.5");
  });

  it("quotes cells containing commas, quotes or newlines", () => {
    expect(toCsv(["name", "note"], [["a,b", 'he said "hi"']])).toBe(
      'name,note\n"a,b","he said ""hi"""'
    );
  });

  it("serializes numbers and strings uniformly", () => {
    expect(toCsv(["x"], [[151], [0]])).toBe("x\n151\n0");
  });
});
