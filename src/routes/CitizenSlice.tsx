import { useLingui } from "@lingui/react";
import { useQuery } from "@tanstack/react-query";
import * as Slider from "@radix-ui/react-slider";
import { Wallet } from "lucide-react";
import { fetchRealWageSeries, fetchSalaryBreakdown } from "../api/client";
import { RealWageLine } from "../components/charts/RealWageLine";
import { SalaryWaterfall } from "../components/charts/SalaryWaterfall";
import { KpiCard } from "../components/shared/KpiCard";
import { SourceBadge } from "../components/shared/SourceBadge";
import { AVERAGE_NET_SALARY_2026 } from "../data/salaryStats";
import { formatLei, formatPercent } from "../lib/format";
import { buildSalaryWaterfallRows } from "../lib/waterfall";
import { useSalaryStore } from "../store/useSalaryStore";
import { m } from "../messages";

export function CitizenSlice() {
  const { i18n } = useLingui();
  const gross = useSalaryStore((state) => state.gross);
  const setGross = useSalaryStore((state) => state.setGross);

  const { data: breakdown } = useQuery({
    queryKey: ["salary", gross],
    queryFn: () => fetchSalaryBreakdown(gross),
  });

  const { data: realWage } = useQuery({
    queryKey: ["real-wage"],
    queryFn: fetchRealWageSeries,
  });

  const vsAverage =
    breakdown !== null && breakdown !== undefined
      ? breakdown.net
          .div(AVERAGE_NET_SALARY_2026)
          .mul(100)
          .minus(100)
          .toNumber()
      : 0;

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold">{i18n._(m["salary.title"])}</h2>
            <p className="text-sm text-slate-500">
              {i18n._(m["salary.description"])}
            </p>
          </div>
          <div className="flex gap-2">
            <SourceBadge source="source.budget" />
            <SourceBadge source="source.ins" />
            <SourceBadge source="source.bnr" />
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <label
            htmlFor="salary-slider"
            className="text-sm font-medium text-slate-700"
          >
            {i18n._(m["salary.grossLabel"])}
          </label>
          <div className="mt-2 flex items-center gap-4">
            <Slider.Root
              id="salary-slider"
              className="relative flex h-5 flex-1 touch-none select-none items-center"
              min={1000}
              max={50000}
              step={100}
              value={[gross]}
              onValueChange={(values) => {
                const first = values[0];
                if (first !== undefined) {
                  setGross(first);
                }
              }}
            >
              <Slider.Track className="relative h-1.5 grow rounded-full bg-slate-200">
                <Slider.Range className="absolute h-full rounded-full bg-budget-blue" />
              </Slider.Track>
              <Slider.Thumb className="block size-5 rounded-full border-2 border-budget-blue bg-white shadow transition-colors focus-visible:outline-2 focus-visible:outline-budget-blue" />
            </Slider.Root>
            <span className="w-28 text-right text-lg font-bold tabular-nums">
              {formatLei(gross)}
            </span>
          </div>
        </div>

        {breakdown !== null && breakdown !== undefined && (
          <>
            <div className="grid gap-4 sm:grid-cols-3">
              <KpiCard
                accent="blue"
                label={i18n._(m["salary.netStat"])}
                value={formatLei(breakdown.net)}
                sub={`${formatLei(breakdown.net)} ${i18n._(m["salary.perMonth"])}`}
              />
              <KpiCard
                accent="red"
                label={i18n._(m["salary.stateShareStat"])}
                value={formatLei(breakdown.stateShare)}
                sub={`${formatPercent(breakdown.statePercent)} ${i18n._(m["salary.effectiveRate"])}`}
              />
              <KpiCard
                accent="slate"
                label={i18n._(m["salary.vsAverage"])}
                value={
                  Math.abs(vsAverage) < 0.5
                    ? "0%"
                    : vsAverage > 0
                      ? `+${vsAverage.toFixed(0)}%`
                      : `${vsAverage.toFixed(0)}%`
                }
                sub={`${i18n._(m["salary.netStat"])}: ${formatLei(AVERAGE_NET_SALARY_2026)}`}
              />
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <SalaryWaterfall rows={buildSalaryWaterfallRows(breakdown)} />
            </div>
          </>
        )}
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold">{i18n._(m["realWage.title"])}</h2>
            <p className="text-sm text-slate-500">
              {i18n._(m["realWage.description"])}
            </p>
          </div>
          <div className="flex gap-2">
            <SourceBadge source="source.ins" />
            <SourceBadge source="source.bnr" />
          </div>
        </div>

        {realWage !== undefined && (
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <RealWageLine series={realWage} />
          </div>
        )}
      </section>

      <section className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
        <Wallet className="size-5 shrink-0" aria-hidden="true" />
        <p>
          {i18n._(m["app.dataNote"])} — {i18n._(m["salary.rateNote"])}
        </p>
      </section>
    </div>
  );
}
