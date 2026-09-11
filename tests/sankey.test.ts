import { Decimal } from "decimal.js";
import { describe, expect, it } from "vitest";
import { BUDGET_SUMMARY } from "../src/data/budget2026";
import { buildBudgetSankey, SANKEY_BUDGET_NODE_ID } from "../src/lib/sankey";

describe("buildBudgetSankey", () => {
  it("balances: in-flow equals out-flow of the budget node", () => {
    const { links } = buildBudgetSankey();

    const inflow = links
      .filter((link) => link.target === SANKEY_BUDGET_NODE_ID)
      .reduce((sum, link) => sum + link.value, 0);
    const outflow = links
      .filter((link) => link.source === SANKEY_BUDGET_NODE_ID)
      .reduce((sum, link) => sum + link.value, 0);

    expect(inflow).toBeCloseTo(outflow, 6);
  });

  it("total inflow equals the budget expenditure", () => {
    const { links } = buildBudgetSankey();

    const inflow = links
      .filter((link) => link.target === SANKEY_BUDGET_NODE_ID)
      .reduce((sum, link) => sum + link.value, 0);

    expect(inflow).toBeCloseTo(
      new Decimal(BUDGET_SUMMARY.expenditure).toNumber(),
      6
    );
  });

  it("emits unique node ids", () => {
    const { nodes } = buildBudgetSankey();

    const ids = nodes.map((node) => node.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("all link values are positive", () => {
    const { links } = buildBudgetSankey();

    for (const link of links) {
      expect(link.value).toBeGreaterThan(0);
    }
  });
});
