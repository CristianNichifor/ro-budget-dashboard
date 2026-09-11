import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface MacroTrendChartProps {
  data: { label: string; value: number }[];
  color: string;
  valueFormatter: (value: number) => string;
  ariaLabel: string;
  reference?: { value: number; label: string };
  heightClass?: string;
}

function shortLabel(ym: string): string {
  if (ym.endsWith("-01")) {
    return ym.slice(0, 4);
  }
  return "";
}

export function MacroTrendChart({
  data,
  color,
  valueFormatter,
  ariaLabel,
  reference,
  heightClass = "h-72",
}: MacroTrendChartProps) {
  return (
    <div className={`w-full ${heightClass}`}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 12, right: 16, bottom: 4, left: 0 }}
          aria-label={ariaLabel}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 11 }}
            tickFormatter={shortLabel}
            minTickGap={24}
          />
          <YAxis
            tick={{ fontSize: 11 }}
            tickFormatter={valueFormatter}
            width={56}
            domain={["auto", "auto"]}
          />
          <Tooltip
            formatter={(value) => [valueFormatter(Number(value))]}
            labelFormatter={(label) => String(label)}
            contentStyle={{ fontSize: 12 }}
          />
          {reference !== undefined && (
            <ReferenceLine
              y={reference.value}
              stroke="#f59e0b"
              strokeDasharray="5 5"
              label={{
                value: reference.label,
                position: "insideTopRight",
                fontSize: 11,
                fill: "#b45309",
              }}
            />
          )}
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
