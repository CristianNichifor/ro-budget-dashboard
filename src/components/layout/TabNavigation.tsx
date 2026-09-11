import { useLingui } from "@lingui/react";
import { Link } from "@tanstack/react-router";
import { cn } from "../../lib/cn";
import { lookupMessage } from "../../messages";

const tabs = [
  { to: "/felia-ta", labelId: "nav.citizenSlice" },
  { to: "/bilantul-national", labelId: "nav.nationalBalance" },
  { to: "/companii-de-stat", labelId: "nav.companies" },
] as const;

export function TabNavigation() {
  const { i18n } = useLingui();

  return (
    <nav className="mx-auto flex max-w-6xl gap-1 px-4">
      {tabs.map((tab) => (
        <Link
          key={tab.to}
          to={tab.to}
          className="text-sm font-medium"
          activeProps={{
            className: "text-sm font-medium",
            "aria-current": "page",
          }}
          inactiveProps={{
            className: "text-sm font-medium text-slate-500",
          }}
        >
          {({ isActive }) => (
            <span
              className={cn(
                "inline-block border-b-2 px-3 py-3 transition-colors",
                isActive
                  ? "border-budget-blue text-budget-blue"
                  : "border-transparent text-slate-500 hover:text-slate-800"
              )}
            >
              {i18n._(lookupMessage(tab.labelId))}
            </span>
          )}
        </Link>
      ))}
    </nav>
  );
}
