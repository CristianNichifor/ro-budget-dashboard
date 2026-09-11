import { describe, expect, it } from "vitest";
import {
  formatLei,
  formatMilliardeLei,
  formatPercent,
  formatSignedPercent,
} from "../src/lib/format";

describe("formatLei", () => {
  it("formats with Romanian grouping", () => {
    expect(formatLei("9427")).toBe("9.427 lei");
  });

  it("accepts Decimal values", () => {
    expect(formatLei("1000000")).toBe("1.000.000 lei");
  });
});

describe("formatMilliardeLei", () => {
  it("formats billions with one decimal", () => {
    expect(formatMilliardeLei("217814450000")).toBe("217,8 mld. lei");
  });

  it("formats smaller amounts", () => {
    expect(formatMilliardeLei("35928663000")).toBe("35,9 mld. lei");
  });
});

describe("formatPercent", () => {
  it("formats with one decimal and Romanian comma", () => {
    expect(formatPercent("7.1")).toBe("7,1%");
    expect(formatPercent("54.93")).toBe("54,9%");
  });
});

describe("formatSignedPercent", () => {
  it("prefixes positive and negative values", () => {
    expect(formatSignedPercent("7.2")).toBe("+7,2%");
    expect(formatSignedPercent("-2.3")).toBe("−2,3%");
  });
});
