import { useLingui } from "@lingui/react";
import { LOCALES, setLocale, type Locale } from "../../i18n";
import { cn } from "../../lib/cn";

const LABELS: Record<Locale, string> = {
  ro: "RO",
  en: "EN",
};

export function LocaleSwitcher() {
  const { i18n } = useLingui();

  return (
    <div
      role="group"
      aria-label="Language"
      className="flex overflow-hidden rounded-md border border-slate-200"
    >
      {LOCALES.map((locale) => (
        <button
          key={locale}
          type="button"
          aria-pressed={i18n.locale === locale}
          className={cn(
            "px-2 py-1 text-xs font-medium",
            i18n.locale === locale
              ? "bg-budget-blue text-white"
              : "bg-white text-slate-600 hover:bg-slate-50"
          )}
          onClick={() => setLocale(locale)}
        >
          {LABELS[locale]}
        </button>
      ))}
    </div>
  );
}
