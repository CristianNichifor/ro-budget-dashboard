import { useLingui } from "@lingui/react";
import { useQuery } from "@tanstack/react-query";
import { Decimal } from "decimal.js";
import { fetchBudgetSummary, fetchDestinations } from "../api/client";
import { BudgetSankey } from "../components/charts/BudgetSankey";
import { DebtGauge } from "../components/charts/DebtGauge";
import { DestinationTreemap } from "../components/charts/DestinationTreemap";
import { KpiCard } from "../components/shared/KpiCard";
import { SourceBadge } from "../components/shared/SourceBadge";
import { formatMilliardeLei } from "../lib/format";

export function NationalBalance() {
  const { i18n } = useLingui();

  const { data: summary } = useQuery({
    queryKey: ["budget-summary"],
    queryFn: fetchBudgetSummary,
  });

  const { data: destinations } = useQuery({
    queryKey: ["destinations"],
    queryFn: fetchDestinations,
  });

  const deficitPercent =
    summary !== undefined
      ? new Decimal(summary.deficitPercentGdp).toNumber()
      : 0;

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold">
              {i18n._({ id: "balance.title" })}
            </h2>
            <p className="text-sm text-slate-500">
              {i18n._({ id: "balance.description" })}
            </p>
          </div>
          <div className="flex gap-2">
            <SourceBadge source="source.budget" />
          </div>
        </div>

        {summary !== undefined && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <KpiCard
              accent="blue"
              label={i18n._({ id: "balance.kpi.revenue" })}
              value={formatMilliardeLei(summary.revenue)}
            />
            <KpiCard
              accent="slate"
              label={i18n._({ id: "balance.kpi.expenditure" })}
              value={formatMilliardeLei(summary.expenditure)}
            />
            <KpiCard
              accent="red"
              label={i18n._({ id: "balance.kpi.deficit" })}
              value={formatMilliardeLei(summary.deficit)}
            />
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 shadow-sm">
              <p className="text-sm font-medium text-slate-500">
                {i18n._({ id: "balance.kpi.deficitGdp" })}
              </p>
              <DebtGauge valuePercent={deficitPercent} />
              <p className="mt-1 text-center text-xs text-slate-500">
                {i18n._({ id: "balance.debtGauge.reference" })}
              </p>
            </div>
          </div>
        )}
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold">
            {i18n._({ id: "sankey.title" })}
          </h2>
          <p className="text-sm text-slate-500">
            {i18n._({ id: "sankey.description" })}
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <BudgetSankey />
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold">
            {i18n._({ id: "treemap.title" })}
          </h2>
          <p className="text-sm text-slate-500">
            {i18n._({ id: "treemap.description" })}
          </p>
        </div>
        {destinations !== undefined && (
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <DestinationTreemap destinations={destinations} />
          </div>
        )}
      </section>
    </div>
  );
}
