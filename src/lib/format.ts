import { Decimal } from "decimal.js";
import type { DecimalValue } from "./salary";

const leiFormatter = new Intl.NumberFormat("ro-RO", {
  maximumFractionDigits: 0,
});

const milliardeFormatter = new Intl.NumberFormat("ro-RO", {
  maximumFractionDigits: 1,
});

const percentFormatter = new Intl.NumberFormat("ro-RO", {
  maximumFractionDigits: 1,
});

const BILLION = new Decimal(1_000_000_000);

/** "9.427 lei" */
export function formatLei(value: DecimalValue): string {
  return `${leiFormatter.format(new Decimal(value).toNumber())} lei`;
}

/** "217,8 mld. lei" */
export function formatMilliardeLei(value: DecimalValue): string {
  const milliarde = new Decimal(value).div(BILLION).toNumber();
  return `${milliardeFormatter.format(milliarde)} mld. lei`;
}

/** "7,1%" */
export function formatPercent(value: DecimalValue): string {
  return `${percentFormatter.format(new Decimal(value).toNumber())}%`;
}

/** "+7,2%" / "−2,3%" */
export function formatSignedPercent(value: DecimalValue): string {
  const number = new Decimal(value).toNumber();
  const formatted = percentFormatter.format(Math.abs(number));
  return number >= 0 ? `+${formatted}%` : `−${formatted}%`;
}
