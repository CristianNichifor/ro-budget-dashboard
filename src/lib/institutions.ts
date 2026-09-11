import { Decimal } from "decimal.js";
import type { BudgetSubDestination } from "../data/budget2026";

export interface InstitutionShare {
  id: string;
  name: string;
  amount: string;
  sharePercent: number;
}

/**
 * Computes each institution's share of the destination total, sorted
 * descending. Pure — Decimal for money, sharePercent is a display-only
 * percentage (allowed to cross into JS numbers at the display boundary).
 */
export function computeInstitutionShares(
  institutions: BudgetSubDestination[],
  total: string
): InstitutionShare[] {
  const totalAmount = new Decimal(total);

  if (totalAmount.isZero()) {
    return institutions.map((institution) => ({
      id: institution.id,
      name: institution.name,
      amount: institution.amount,
      sharePercent: 0,
    }));
  }

  return institutions
    .map((institution) => ({
      id: institution.id,
      name: institution.name,
      amount: institution.amount,
      sharePercent: new Decimal(institution.amount)
        .div(totalAmount)
        .times(100)
        .toDecimalPlaces(1)
        .toNumber(),
    }))
    .sort((a, b) => b.sharePercent - a.sharePercent);
}
