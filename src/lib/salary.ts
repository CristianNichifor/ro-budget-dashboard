import { Decimal } from "decimal.js";
import { TAX_RATES_2026 } from "../data/taxRates";

export type DecimalValue = Decimal.Value;

export interface SalaryBreakdownEntry {
  /** i18n message id for the label. */
  labelKey: string;
  /** Signed amount in lei: positive = income, negative = deduction. */
  amount: Decimal;
}

export interface SalaryBreakdown {
  gross: Decimal;
  cas: Decimal;
  cass: Decimal;
  incomeTax: Decimal;
  employerContribution: Decimal;
  estimatedVat: Decimal;
  net: Decimal;
  employerCost: Decimal;
  stateShare: Decimal;
  statePercent: Decimal;
  entries: SalaryBreakdownEntry[];
}

/**
 * Computes the personal tax burden following the Open Budget 2026 model:
 * CAS (25%) + CASS (10%) + income tax (10% of gross − CAS − CASS)
 * + employer contribution (2.25% CAM) + an estimated VAT burden on consumption.
 *
 * Pure function, no floats: all math uses decimal.js.
 * Returns null for non-positive or non-finite input.
 */
export function calculateSalaryBreakdown(
  grossInput: DecimalValue
): SalaryBreakdown | null {
  if (grossInput === null || grossInput === undefined || grossInput === "") {
    return null;
  }

  let gross: Decimal;
  try {
    gross = new Decimal(grossInput);
  } catch {
    return null;
  }

  if (!gross.isFinite() || gross.lessThanOrEqualTo(0)) {
    return null;
  }

  const cas = gross.mul(TAX_RATES_2026.cas);
  const cass = gross.mul(TAX_RATES_2026.cass);
  const taxableBase = gross.minus(cas).minus(cass);
  const incomeTax = taxableBase.mul(TAX_RATES_2026.incomeTax);
  const net = taxableBase.minus(incomeTax);

  const employerContribution = gross.mul(TAX_RATES_2026.employerContribution);
  const employerCost = gross.plus(employerContribution);

  const vatBase = net.mul(TAX_RATES_2026.vatConsumptionShare);
  const estimatedVat = vatBase
    .mul(TAX_RATES_2026.vat)
    .div(new Decimal(1).plus(TAX_RATES_2026.vat));

  const stateShare = employerCost.minus(net).plus(estimatedVat);
  const statePercent = stateShare.div(employerCost).mul(100);

  const entries: SalaryBreakdownEntry[] = [
    { labelKey: "salary.entry.gross", amount: employerCost },
    {
      labelKey: "salary.entry.employerContribution",
      amount: employerContribution.negated(),
    },
    { labelKey: "salary.entry.cas", amount: cas.negated() },
    { labelKey: "salary.entry.cass", amount: cass.negated() },
    { labelKey: "salary.entry.incomeTax", amount: incomeTax.negated() },
    { labelKey: "salary.entry.estimatedVat", amount: estimatedVat.negated() },
    { labelKey: "salary.entry.net", amount: net },
  ];

  return {
    gross,
    cas,
    cass,
    incomeTax,
    employerContribution,
    estimatedVat,
    net,
    employerCost,
    stateShare,
    statePercent,
    entries,
  };
}
