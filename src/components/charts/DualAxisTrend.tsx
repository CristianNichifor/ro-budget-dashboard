import {
  Bar,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { DualTrendPoint } from "../../lib/trendJoin";

interface DualAxisTrendProps {
  data: DualTrendPoint[];
  leftLabel: string;
  rightLabel: string;
}

function DualAxisTooltip({
  active,
  payload,
  label,
  leftLabel,
  rightLabel,
}: {
  active?: boolean;
  payload?: ReadonlyArray<{ name?: string | number; payload?: DualTrendPoint }>;
  label?: string | number;
  leftLabel: string;
  rightLabel: string;
}) {
  if (active !== true || payload === undefined || payload.length === 0) {
    return null;
  }

  const datum = payload[0]?.payload;

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-2 text-xs shadow-md">
      <p className="font-semibold">{label ?? ""}</p>
      {datum !== undefined && (
        <>
          <p className="tabular-nums text-slate-600">
            {leftLabel}: {datum.budgetMilliardeEur} mld. EUR
          </p>
          <p className="tabular-nums text-slate-600">
            {rightLabel}: {datum.ins ?? "—"}
          </p>
        </>
      )}
    </div>
  );
}

/**
 * Health-spending bars (left axis, milliarde EUR) + INS indicator line (right axis).
 */
export function DualAxisTrend({
  data,
  leftLabel,
  rightLabel,
}: DualAxisTrendProps) {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{ top: 8, right: 8, left: 8, bottom: 0 }}
        >
          <XAxis dataKey="year" />
          <YAxis
            yAxisId="budget"
            tickFormatter={(value: number) => `${value} mld.`}
            width={70}
          />
          <YAxis yAxisId="ins" orientation="right" width={50} />
          <Tooltip
            content={(props) => (
              <DualAxisTooltip
                {...props}
                leftLabel={leftLabel}
                rightLabel={rightLabel}
              />
            )}
          />
          <Legend />
          <Bar
            yAxisId="budget"
            dataKey="budgetMilliardeEur"
            name={leftLabel}
            fill="#2563eb"
            radius={[3, 3, 0, 0]}
            isAnimationActive={false}
          />
          <Line
            yAxisId="ins"
            dataKey="ins"
            name={rightLabel}
            stroke="#dc2626"
            strokeWidth={2}
            dot
            isAnimationActive={false}
            connectNulls
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
