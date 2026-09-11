import { describe, expect, it } from "vitest";
import { pickIntensityColor } from "../src/lib/investmentColor";

describe("pickIntensityColor", () => {
  it("picks the lightest color at the minimum", () => {
    expect(pickIntensityColor("100", "100", "500")).toBe("#dbeafe");
  });

  it("picks the darkest color at the maximum", () => {
    expect(pickIntensityColor("500", "100", "500")).toBe("#2563eb");
  });

  it("picks a middle color halfway through the range", () => {
    expect(pickIntensityColor("300", "100", "500")).toBe("#93c5fd");
  });

  it("clamps out-of-range values", () => {
    expect(pickIntensityColor("0", "100", "500")).toBe("#dbeafe");
    expect(pickIntensityColor("999", "100", "500")).toBe("#2563eb");
  });

  it("returns the base color when the range is empty", () => {
    expect(pickIntensityColor("100", "100", "100")).toBe("#dbeafe");
  });
});
