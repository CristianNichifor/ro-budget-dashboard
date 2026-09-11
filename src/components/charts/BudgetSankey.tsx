import {
  sankey as d3Sankey,
  sankeyLinkHorizontal,
  type SankeyExtraProperties,
  type SankeyGraph,
  type SankeyLink,
  type SankeyNode,
} from "d3-sankey";
import { useMemo } from "react";
import { formatMilliardeLei } from "../../lib/format";
import {
  buildBudgetSankey,
  SANKEY_BUDGET_NODE_ID,
  SANKEY_DEFICIT_NODE_ID,
  SANKEY_REST_NODE_ID,
} from "../../lib/sankey";

type SankeyNodeExtra = SankeyExtraProperties & {
  id: string;
  name: string;
};

type SankeyLinkExtra = SankeyExtraProperties & {
  value: number;
};

type SankeyNodeD = SankeyNode<SankeyNodeExtra, SankeyLinkExtra>;
type SankeyLinkD = SankeyLink<SankeyNodeExtra, SankeyLinkExtra>;
type SankeyGraphD = SankeyGraph<SankeyNodeD, SankeyLinkD>;

const WIDTH = 960;
const HEIGHT = 480;

function nodeColor(id: string): string {
  if (id === SANKEY_BUDGET_NODE_ID) {
    return "#475569";
  }
  if (id === SANKEY_DEFICIT_NODE_ID) {
    return "#dc2626";
  }
  if (id === SANKEY_REST_NODE_ID) {
    return "#cbd5e1";
  }
  return "#2563eb";
}

function computeLayout(): SankeyGraphD {
  const data = buildBudgetSankey();

  const generator = d3Sankey<SankeyNodeD, SankeyLinkD>()
    .nodeId((node) => node.id)
    .nodeWidth(16)
    .nodePadding(12)
    .nodeSort(null)
    .extent([
      [1, 1],
      [WIDTH - 1, HEIGHT - 1],
    ]);

  return generator({
    nodes: data.nodes.map((node) => ({ ...node, value: 0 })),
    links: data.links.map((link) => ({ ...link })),
  });
}

export function BudgetSankey() {
  const graph = useMemo(() => computeLayout(), []);
  const linkPath = sankeyLinkHorizontal<SankeyNodeD, SankeyLinkD>();

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className="w-full"
      role="img"
      aria-label="Fluxul banilor publici"
    >
      {graph.links.map((link, index) => {
        const path = linkPath(link);
        const source = link.source;
        const target = link.target;

        if (
          path === null ||
          typeof source === "string" ||
          typeof source === "number" ||
          typeof target === "string" ||
          typeof target === "number" ||
          source.x1 === undefined ||
          source.y0 === undefined ||
          target.x0 === undefined ||
          target.y0 === undefined ||
          link.width === undefined
        ) {
          return null;
        }

        const middleX = (source.x1 + target.x0) / 2;
        const middleY = (source.y0 + target.y0 + link.width) / 2;

        return (
          <g key={index}>
            <path d={path} fill="none" stroke="#e2e8f0" strokeWidth={10} />
            <text
              x={middleX}
              y={middleY}
              textAnchor="middle"
              fontSize={9}
              fill="#64748b"
            >
              {formatMilliardeLei(link.value)}
            </text>
          </g>
        );
      })}
      {graph.nodes.map((node) => {
        if (
          node.x0 === undefined ||
          node.x1 === undefined ||
          node.y0 === undefined ||
          node.y1 === undefined
        ) {
          return null;
        }

        const isLeftColumn = node.x0 < WIDTH / 2;
        const labelX = isLeftColumn ? node.x1 + 6 : node.x0 - 6;
        const labelAnchor = isLeftColumn ? "start" : "end";

        return (
          <g key={node.id}>
            <rect
              x={node.x0}
              y={node.y0}
              width={node.x1 - node.x0}
              height={node.y1 - node.y0}
              fill={nodeColor(node.id)}
              rx={2}
            />
            <text
              x={labelX}
              y={node.y0 + (node.y1 - node.y0) / 2 + 3}
              textAnchor={labelAnchor}
              fontSize={10}
              fill="#334155"
            >
              {node.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
