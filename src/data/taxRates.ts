/**
 * Tax rates used by the 2026 budget, following the Open Budget 2026 model.
 * Values are kept as strings — financial math uses decimal.js (no floats).
 */
export const TAX_RATES_2026 = {
  cas: "0.25",
  cass: "0.10",
  incomeTax: "0.10",
  employerContribution: "0.0225",
  vat: "0.21",
  /**
   * Estimated share of net income consumed on VAT-rated goods.
   * Tuned so the effective burden lands near Open Budget's 54.93%.
   */
  vatConsumptionShare: "0.75",
} as const;
