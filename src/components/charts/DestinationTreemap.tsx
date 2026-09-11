import { Tooltip, Treemap, ResponsiveContainer } from "recharts";
import type { BudgetDestination } from "../../data/budget2026";
import { formatMilliardeLei } from "../../lib/format";

interface DestinationTreemapProps {
  destinations: BudgetDestination[];
}

type TreemapDatum = BudgetDestination & Record<string, unknown>;

interface TreemapCellProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  name?: string;
  amount?: string;
}

function TreemapCell(props: TreemapCellProps) {
  const { x = 0, y = 0, width = 0, height = 0, name, amount } = props;
  const fill = "#2563eb";

  return (
    <g>
      <rect x={x} y={y} width={width} height={height} fill={fill} rx={4} />
      {width > 70 && height > 40 && (
        <>
          <text
            x={x + 8}
            y={y + 18}
            fontSize={12}
            fill="#ffffff"
            fontWeight={600}
          >
            {name ?? ""}
          </text>
          <text x={x + 8} y={y + 34} fontSize={10} fill="#dbeafe">
            {amount !== undefined ? formatMilliardeLei(amount) : ""}
          </text>
        </>
      )}
    </g>
  );
}

function TreemapTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: ReadonlyArray<{ payload?: BudgetDestination }>;
}) {
  if (active !== true || payload === undefined || payload.length === 0) {
    return null;
  }

  const destination = payload[0]?.payload;
  if (destination === undefined) {
    return null;
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-2 text-xs shadow-md">
      <p className="font-semibold">{destination.name}</p>
      <p className="tabular-nums text-slate-600">
        {formatMilliardeLei(destination.amount)}
      </p>
    </div>
  );
}

export function DestinationTreemap({ destinations }: DestinationTreemapProps) {
  const data = destinations as TreemapDatum[];

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <Treemap
          data={data}
          dataKey="amount"
          aspectRatio={4 / 3}
          stroke="#fff"
          isAnimationActive={false}
          content={(props) => <TreemapCell {...(props as TreemapCellProps)} />}
        >
          <Tooltip content={(props) => <TreemapTooltip {...props} />} />
        </Treemap>
      </ResponsiveContainer>
    </div>
  );
}
