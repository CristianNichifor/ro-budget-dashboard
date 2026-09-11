import { Decimal } from "decimal.js";
import {
  BUDGET_DESTINATIONS,
  BUDGET_SUMMARY,
  REVENUE_SOURCES,
} from "../data/budget2026";

export interface SankeyNodeInput {
  id: string;
  name: string;
}

export interface SankeyLinkInput {
  source: string;
  target: string;
  value: number;
}

export interface BudgetSankeyData {
  nodes: SankeyNodeInput[];
  links: SankeyLinkInput[];
}

export const SANKEY_BUDGET_NODE_ID = "buget";
export const SANKEY_DEFICIT_NODE_ID = "deficit";
export const SANKEY_REST_NODE_ID = "rest";
export const SANKEY_REST_NODE_NAME = "Alte destinații";

/**
 * Builds the sankey flow: revenue sources + deficit (borrowing) flow into
 * the consolidated budget, which flows out to spending destinations.
 * The "rest" node absorbs the part of expenditure not covered by the
 * top-level destinations, so in-flow always equals out-flow.
 * Pure function — numbers only at the display boundary.
 */
export function buildBudgetSankey(): BudgetSankeyData {
  const expenditure = new Decimal(BUDGET_SUMMARY.expenditure);

  const revenueTotal = REVENUE_SOURCES.reduce(
    (sum, source) => sum.plus(source.amount),
    new Decimal(0)
  );
  const deficit = expenditure.minus(revenueTotal);

  const destinationsTotal = BUDGET_DESTINATIONS.reduce(
    (sum, destination) => sum.plus(destination.amount),
    new Decimal(0)
  );
  const rest = expenditure.minus(destinationsTotal);

  const nodes: SankeyNodeInput[] = [
    ...REVENUE_SOURCES.map((source) => ({ id: source.id, name: source.name })),
    { id: SANKEY_DEFICIT_NODE_ID, name: "Deficit (împrumut)" },
    { id: SANKEY_BUDGET_NODE_ID, name: "Buget consolidat" },
    ...BUDGET_DESTINATIONS.map((destination) => ({
      id: destination.id,
      name: destination.name,
    })),
    { id: SANKEY_REST_NODE_ID, name: SANKEY_REST_NODE_NAME },
  ];

  const links: SankeyLinkInput[] = [
    ...REVENUE_SOURCES.map((source) => ({
      source: source.id,
      target: SANKEY_BUDGET_NODE_ID,
      value: new Decimal(source.amount).toNumber(),
    })),
    {
      source: SANKEY_DEFICIT_NODE_ID,
      target: SANKEY_BUDGET_NODE_ID,
      value: deficit.toNumber(),
    },
    ...BUDGET_DESTINATIONS.map((destination) => ({
      source: SANKEY_BUDGET_NODE_ID,
      target: destination.id,
      value: new Decimal(destination.amount).toNumber(),
    })),
    {
      source: SANKEY_BUDGET_NODE_ID,
      target: SANKEY_REST_NODE_ID,
      value: rest.toNumber(),
    },
  ];

  return { nodes, links };
}
