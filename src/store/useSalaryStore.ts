import { create } from "zustand";

const DEFAULT_GROSS = 9427;
const MIN_GROSS = 1000;
const MAX_GROSS = 50000;

interface SalaryState {
  gross: number;
  setGross: (gross: number) => void;
}

export const useSalaryStore = create<SalaryState>()((set) => ({
  gross: DEFAULT_GROSS,
  setGross: (gross) =>
    set({ gross: Math.min(MAX_GROSS, Math.max(MIN_GROSS, Math.round(gross))) }),
}));
