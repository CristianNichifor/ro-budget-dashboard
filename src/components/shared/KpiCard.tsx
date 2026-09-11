import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

interface KpiCardProps {
  label: ReactNode;
  value: ReactNode;
  sub?: ReactNode;
  accent?: "blue" | "red" | "amber" | "slate";
}

const accentStyles: Record<NonNullable<KpiCardProps["accent"]>, string> = {
  blue: "border-budget-blue/20 bg-budget-blue/5 text-budget-blue",
  red: "border-budget-red/20 bg-budget-red/5 text-budget-red",
  amber: "border-budget-amber/20 bg-budget-amber/5 text-budget-amber",
  slate: "border-slate-200 bg-slate-50 text-slate-700",
};

export function KpiCard({ label, value, sub, accent = "slate" }: KpiCardProps) {
  return (
    <div
      className={cn("rounded-xl border p-4 shadow-sm", accentStyles[accent])}
    >
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold tabular-nums">{value}</p>
      {sub !== undefined && (
        <p className="mt-1 text-xs text-slate-500">{sub}</p>
      )}
    </div>
  );
}
