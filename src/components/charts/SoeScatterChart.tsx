import { useLingui } from "@lingui/react";
import {
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { SoeScatter } from "../../api/client";
import { formatLei, formatPercent } from "../../lib/format";
import { m } from "../../messages";

interface SoeScatterChartProps {
  scatter: SoeScatter;
  minWage: number | null;
  onSelect?: (cui: string) => void;
}

interface ScatterDatum {
  cui: string;
  name: string;
  marginPercent: number;
  maxSalary: number;
  employees: number;
  annualCost: string;
}

function ScatterTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: ReadonlyArray<{ payload?: ScatterDatum }>;
}) {
  if (active !== true || payload === undefined || payload.length === 0) {
    return null;
  }

  const point = payload[0]?.payload;
  if (point === undefined) {
    return null;
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-2 text-xs shadow-md">
      <p className="font-semibold">{point.name}</p>
      <p className="tabular-nums text-slate-600">
        {formatPercent(point.marginPercent)} · {formatLei(point.maxSalary)}/lună
      </p>
    </div>
  );
}

export function SoeScatterChart({
  scatter,
  minWage,
  onSelect,
}: SoeScatterChartProps) {
  const { i18n } = useLingui();

  const data: ScatterDatum[] = scatter.points.map((point) => ({
    cui: point.cui,
    name: point.name,
    marginPercent: point.marginPercent,
    maxSalary: Number(point.maxSalary),
    employees: point.employees,
    annualCost: point.annualCost,
  }));

  return (
    <div className="h-96 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
          margin={{ top: 16, right: 16, bottom: 8, left: 8 }}
          aria-label={i18n._(m["soe.scatter.title"])}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            type="number"
            dataKey="marginPercent"
            name={i18n._(m["soe.scatter.x"])}
            tickFormatter={(value: number) => `${value}%`}
            tick={{ fontSize: 11 }}
          />
          <YAxis
            type="number"
            dataKey="maxSalary"
            name={i18n._(m["soe.scatter.y"])}
            tickFormatter={(value: number) => formatLei(value)}
            tick={{ fontSize: 11 }}
            width={86}
          />
          <ReferenceLine
            x={0}
            stroke="#64748b"
            strokeWidth={1.5}
            label={{
              value: i18n._(m["soe.scatter.breakEven"]),
              position: "insideTopRight",
              fontSize: 11,
              fill: "#64748b",
            }}
          />
          {minWage !== null && minWage > 0 && (
            <ReferenceLine
              y={minWage}
              stroke="#f59e0b"
              strokeDasharray="5 5"
              label={{
                value: i18n._(m["soe.scatter.minWage"]),
                position: "insideBottomRight",
                fontSize: 11,
                fill: "#b45309",
              }}
            />
          )}
          <Scatter
            name={i18n._(m["soe.scatter.title"])}
            data={data}
            fill="#2563eb"
            fillOpacity={0.65}
            isAnimationActive={false}
            onClick={(entry) => {
              const cui = (entry.payload as ScatterDatum | undefined)?.cui;
              if (cui !== undefined && onSelect !== undefined) {
                onSelect(cui);
              }
            }}
          />
          <Tooltip
            content={(props) => <ScatterTooltip {...props} />}
            cursor={{ strokeDasharray: "3 3", stroke: "#94a3b8" }}
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
