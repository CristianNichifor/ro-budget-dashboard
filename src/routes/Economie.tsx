import { useLingui } from "@lingui/react";
import { useQuery } from "@tanstack/react-query";
import { fetchFx, fetchInflation, fetchUnemployment } from "../api/client";
import { MacroTrendChart } from "../components/charts/MacroTrendChart";
import { KpiCard } from "../components/shared/KpiCard";
import { SkeletonCard } from "../components/shared/SkeletonCard";
import { SourceBadge } from "../components/shared/SourceBadge";
import { formatPercent } from "../lib/format";
import { m } from "../messages";

export function Economie() {
  const { i18n } = useLingui();

  const { data: inflation, isPending: inflationPending } = useQuery({
    queryKey: ["macro-inflation"],
    queryFn: fetchInflation,
  });

  const { data: unemployment, isPending: unemploymentPending } = useQuery({
    queryKey: ["macro-unemployment"],
    queryFn: fetchUnemployment,
  });

  const { data: fx, isPending: fxPending } = useQuery({
    queryKey: ["macro-fx"],
    queryFn: fetchFx,
  });

  const latestInflation = inflation?.monthly.at(-1);
  const latestUnemployment = unemployment?.monthly.at(-1);
  const latestFx = fx?.series.at(-1);

  const inflationData =
    inflation?.monthly.map((point) => ({
      label: point.ym,
      value: point.annualRate,
    })) ?? [];
  const unemploymentData =
    unemployment?.monthly.map((point) => ({
      label: point.ym,
      value: point.rate,
    })) ?? [];
  const fxData =
    fx?.series
      .slice(-730)
      .map((point) => ({ label: point.date, value: point.eurRon })) ?? [];

  const unavailable =
    inflation === null && unemployment === null && fx === null;

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold">{i18n._(m["economy.title"])}</h2>
            <p className="text-sm text-slate-500">
              {i18n._(m["economy.description"])}
            </p>
          </div>
          <div className="flex gap-2">
            <SourceBadge source="source.eurostat" />
            <SourceBadge source="source.ecb" />
            <SourceBadge source="source.bnr" />
          </div>
        </div>

        {(inflationPending || unemploymentPending || fxPending) && (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[0, 1, 2, 3].map((index) => (
              <SkeletonCard key={index} className="h-28" />
            ))}
          </div>
        )}

        {latestInflation !== undefined &&
          latestUnemployment !== undefined &&
          latestFx !== undefined && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <KpiCard
                accent="red"
                label={i18n._(m["economy.kpi.inflation"])}
                value={formatPercent(latestInflation.annualRate)}
                sub={latestInflation.ym}
              />
              <KpiCard
                accent="amber"
                label={i18n._(m["economy.kpi.target"])}
                value={formatPercent(inflation?.targetPercent ?? 0)}
                sub={i18n._(m["economy.inflation.targetLine"])}
              />
              <KpiCard
                accent="slate"
                label={i18n._(m["economy.kpi.unemployment"])}
                value={formatPercent(latestUnemployment.rate)}
                sub={latestUnemployment.ym}
              />
              <KpiCard
                accent="blue"
                label={i18n._(m["economy.kpi.fx"])}
                value={`${latestFx.eurRon.toFixed(4)} ${i18n._(m["economy.lei"])}`}
                sub={latestFx.date}
              />
            </div>
          )}

        {unavailable && (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
            {i18n._(m["soe.unavailable"])}
          </div>
        )}
      </section>

      {inflation !== null && inflation !== undefined && (
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-bold">
              {i18n._(m["economy.inflation.title"])}
            </h2>
            <p className="text-sm text-slate-500">
              {i18n._(m["economy.inflation.description"])}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <MacroTrendChart
              data={inflationData}
              color="#dc2626"
              ariaLabel={i18n._(m["economy.inflation.title"])}
              valueFormatter={(value) => `${value.toFixed(1)}%`}
              reference={{
                value: inflation.targetPercent,
                label: i18n._(m["economy.inflation.targetLine"]),
              }}
            />
          </div>
        </section>
      )}

      {unemployment !== null && unemployment !== undefined && (
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-bold">
              {i18n._(m["economy.unemployment.title"])}
            </h2>
            <p className="text-sm text-slate-500">
              {i18n._(m["economy.unemployment.description"])}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <MacroTrendChart
              data={unemploymentData}
              color="#475569"
              ariaLabel={i18n._(m["economy.unemployment.title"])}
              valueFormatter={(value) => `${value.toFixed(1)}%`}
            />
          </div>
        </section>
      )}

      {fx !== null && fx !== undefined && (
        <section className="space-y-4">
          <div>
            <h2 className="text-xl font-bold">
              {i18n._(m["economy.fx.title"])}
            </h2>
            <p className="text-sm text-slate-500">
              {i18n._(m["economy.fx.description"])}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <MacroTrendChart
              data={fxData}
              color="#2563eb"
              ariaLabel={i18n._(m["economy.fx.title"])}
              valueFormatter={(value) => value.toFixed(2)}
            />
          </div>
        </section>
      )}
    </div>
  );
}
