import { useLingui } from "@lingui/react";
import { useQuery } from "@tanstack/react-query";
import { Decimal } from "decimal.js";
import { useMemo, useState } from "react";
import {
  fetchBudgetSummary,
  fetchBudgetTrend,
  fetchCountyInvestments,
  fetchDestinations,
  fetchInsMetric,
} from "../api/client";
import { BudgetSankey } from "../components/charts/BudgetSankey";
import { DebtGauge } from "../components/charts/DebtGauge";
import { DestinationTreemap } from "../components/charts/DestinationTreemap";
import { DualAxisTrend } from "../components/charts/DualAxisTrend";
import { InvestmentCartogram } from "../components/charts/InvestmentCartogram";
import { DrilldownModal } from "../components/shared/DrilldownModal";
import { KpiCard } from "../components/shared/KpiCard";
import { SourceBadge } from "../components/shared/SourceBadge";
import { formatMilliardeLei, formatSignedPercent } from "../lib/format";
import { computeTrendInsight, joinBudgetWithIns } from "../lib/trendJoin";

const CONTEXT_METRIC = "infant-mortality";
const CONTEXT_BUDGET_METRIC = "health-budget";

export function NationalBalance() {
  const { i18n } = useLingui();
  const [selectedDestinationId, setSelectedDestinationId] = useState<
    string | null
  >(null);

  const { data: summary } = useQuery({
    queryKey: ["budget-summary"],
    queryFn: fetchBudgetSummary,
  });

  const { data: destinations } = useQuery({
    queryKey: ["destinations"],
    queryFn: fetchDestinations,
  });

  const { data: budgetTrend } = useQuery({
    queryKey: ["budget-trend", CONTEXT_BUDGET_METRIC],
    queryFn: () => fetchBudgetTrend(CONTEXT_BUDGET_METRIC),
  });

  const { data: insMetric } = useQuery({
    queryKey: ["ins-metric", CONTEXT_METRIC],
    queryFn: () => fetchInsMetric(CONTEXT_METRIC),
  });

  const { data: investments } = useQuery({
    queryKey: ["investments-by-county"],
    queryFn: fetchCountyInvestments,
  });

  const trendData = useMemo(() => {
    if (budgetTrend === undefined || insMetric === undefined) {
      return null;
    }
    return joinBudgetWithIns(budgetTrend.data, insMetric.data);
  }, [budgetTrend, insMetric]);

  const trendInsight = useMemo(() => {
    if (budgetTrend === undefined || insMetric === undefined) {
      return null;
    }
    return computeTrendInsight(budgetTrend.data, insMetric.data);
  }, [budgetTrend, insMetric]);

  const deficitPercent =
    summary !== undefined
      ? new Decimal(summary.deficitPercentGdp).toNumber()
      : 0;

  const destinationIds = useMemo(
    () => new Set(destinations?.map((destination) => destination.id) ?? []),
    [destinations]
  );

  const selectedDestination =
    selectedDestinationId !== null
      ? (destinations?.find(
          (destination) => destination.id === selectedDestinationId
        ) ?? null)
      : null;

  const closeDrilldown = () => setSelectedDestinationId(null);

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
          <BudgetSankey
            selectableIds={destinationIds}
            onSelect={setSelectedDestinationId}
          />
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
            <DestinationTreemap
              destinations={destinations}
              onSelect={setSelectedDestinationId}
            />
          </div>
        )}
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold">
              {i18n._({ id: "context.title" })}
            </h2>
            <p className="text-sm text-slate-500">
              {i18n._({ id: "context.description" })}
            </p>
          </div>
          <div className="flex gap-2">
            <SourceBadge source="source.ins" />
            <SourceBadge source="source.budget" />
          </div>
        </div>
        {trendData !== null && insMetric !== undefined && (
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <DualAxisTrend
              data={trendData}
              leftLabel={i18n._({ id: "context.budgetLegend" })}
              rightLabel={insMetric.label}
            />
            {trendInsight !== null && (
              <p className="mt-3 text-sm text-slate-600">
                {i18n._({
                  id: "context.insight",
                  values: {
                    budgetChange: formatSignedPercent(
                      trendInsight.budgetChangePercent
                    ),
                    insChange: formatSignedPercent(
                      trendInsight.insChangePercent
                    ),
                    insLabel: insMetric.label.toLowerCase(),
                  },
                })}
              </p>
            )}
          </div>
        )}
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold">
              {i18n._({ id: "investments.title" })}
            </h2>
            <p className="text-sm text-slate-500">
              {i18n._({ id: "investments.description" })}
            </p>
          </div>
          <div className="flex gap-2">
            <SourceBadge source="source.budget" />
          </div>
        </div>
        {investments != null && investments.counties.length > 0 && (
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <InvestmentCartogram
              counties={investments.counties}
              total={investments.total}
            />
            <div className="mt-3 flex items-center justify-end gap-2 text-xs text-slate-500">
              <span>{i18n._({ id: "investments.legendMin" })}</span>
              <span
                aria-hidden="true"
                className="inline-block h-3 w-24 rounded-full"
                style={{
                  background:
                    "linear-gradient(to right, #dbeafe, #bfdbfe, #93c5fd, #60a5fa, #2563eb)",
                }}
              />
              <span>{i18n._({ id: "investments.legendMax" })}</span>
            </div>
          </div>
        )}
      </section>

      {selectedDestination !== null && (
        <DrilldownModal
          destination={selectedDestination}
          onClose={closeDrilldown}
          onBackToOverview={closeDrilldown}
        />
      )}
    </div>
  );
}
