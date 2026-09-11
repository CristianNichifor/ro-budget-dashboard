import { useLingui } from "@lingui/react";
import { m } from "../messages";

export function DefaultError() {
  const { i18n } = useLingui();

  return (
    <main className="mx-auto max-w-6xl px-4 py-16 text-center">
      <h2 className="text-xl font-bold text-budget-red">
        {i18n._(m["error.title"])}
      </h2>
      <p className="mt-2 text-sm text-slate-500">{i18n._(m["error.reload"])}</p>
    </main>
  );
}
