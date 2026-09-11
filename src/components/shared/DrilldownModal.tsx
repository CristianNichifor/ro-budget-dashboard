import { useLingui } from "@lingui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { fetchInstitutions } from "../../api/client";
import type { BudgetDestination } from "../../data/budget2026";
import { formatMilliardeLei, formatPercent } from "../../lib/format";
import { computeInstitutionShares } from "../../lib/institutions";
import { SourceBadge } from "./SourceBadge";
import { m } from "../../messages";

interface DrilldownModalProps {
  destination: BudgetDestination;
  onClose: () => void;
  onBackToOverview: () => void;
}

export function DrilldownModal({
  destination,
  onClose,
  onBackToOverview,
}: DrilldownModalProps) {
  const { i18n } = useLingui();

  const { data, isPending, isError } = useQuery({
    queryKey: ["institutions", destination.id],
    queryFn: () => fetchInstitutions(destination.id),
  });

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const shares =
    data !== undefined
      ? computeInstitutionShares(data.institutions, data.total)
      : [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-label={destination.name}
      onClick={onClose}
    >
      <div
        className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-6 shadow-xl"
        onClick={(event) => event.stopPropagation()}
      >
        <nav aria-label="breadcrumb" className="text-sm text-slate-500">
          <button
            type="button"
            className="hover:text-blue-700 hover:underline"
            onClick={onBackToOverview}
          >
            {i18n._(m["drilldown.breadcrumb.root"])}
          </button>
          <span aria-hidden="true"> › </span>
          <span>{i18n._(m["drilldown.breadcrumb.destinations"])}</span>
          <span aria-hidden="true"> › </span>
          <span className="font-semibold text-slate-700">
            {destination.name}
          </span>
        </nav>

        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold">
              {i18n._({
                ...m["drilldown.title"],
                values: { destination: destination.name },
              })}
            </h3>
            <p className="text-sm text-slate-500">
              {i18n._(m["drilldown.description"])}
            </p>
          </div>
          <button
            type="button"
            className="rounded-md border border-slate-200 px-2 py-1 text-slate-500 hover:bg-slate-50"
            aria-label={i18n._(m["drilldown.close"])}
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="mt-4">
          {isPending && (
            <p className="text-sm text-slate-500">
              {i18n._(m["drilldown.loading"])}
            </p>
          )}
          {isError && (
            <p className="text-sm text-red-600">
              {i18n._(m["drilldown.error"])}
            </p>
          )}
          {data !== undefined && data.institutions.length === 0 && (
            <p className="text-sm text-slate-500">
              {i18n._(m["drilldown.empty"])}
            </p>
          )}
          {data !== undefined && data.institutions.length > 0 && (
            <ul className="space-y-3">
              {shares.map((share) => (
                <li key={share.id}>
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-sm font-medium">{share.name}</span>
                    <span className="tabular-nums text-sm text-slate-600">
                      {formatMilliardeLei(share.amount)}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-2 rounded-full bg-blue-600"
                        style={{
                          width: `${Math.min(share.sharePercent, 100)}%`,
                        }}
                      />
                    </div>
                    <span className="w-20 text-right text-xs tabular-nums text-slate-500">
                      {i18n._({
                        ...m["drilldown.share"],
                        values: {
                          sharePercent: formatPercent(share.sharePercent),
                        },
                      })}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {data !== undefined && data.institutions.length > 0 && (
          <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
            <SourceBadge source="source.budget" />
            <p className="text-sm text-slate-500">
              {i18n._(m["drilldown.total"])}:{" "}
              <span className="font-semibold tabular-nums text-slate-700">
                {formatMilliardeLei(data.total)}
              </span>
            </p>
          </div>
        )}

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            className="rounded-md bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
            onClick={onClose}
          >
            {i18n._(m["drilldown.close"])}
          </button>
        </div>
      </div>
    </div>
  );
}
