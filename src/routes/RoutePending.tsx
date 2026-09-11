import { useLingui } from "@lingui/react";
import { m } from "../messages";

export function RoutePending() {
  const { i18n } = useLingui();

  return (
    <div className="flex items-center justify-center py-16 text-sm text-slate-400">
      {i18n._(m["app.loading"])}
    </div>
  );
}
