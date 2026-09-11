import { create } from "zustand";

interface BudgetYearState {
  year: number | null;
  setYear: (year: number) => void;
}

/**
 * Budget year shared across the budget routes (summary, sankey, treemap,
 * institution drilldown). `null` until the YearSelector initializes it to
 * the latest complete year.
 */
export const useBudgetYearStore = create<BudgetYearState>((set) => ({
  year: null,
  setYear: (year) => set({ year }),
}));

export function pickDefaultYear(years: number[]): number | null {
  const current = new Date().getFullYear();
  const complete = years.filter((year) => year < current);
  return complete.at(-1) ?? years.at(-1) ?? null;
}
