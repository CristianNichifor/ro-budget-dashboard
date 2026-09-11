import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import type { ReactNode } from "react";
import { messages as enMessages } from "./locales/en/messages.po";
import { messages as roMessages } from "./locales/ro/messages.po";

export const LOCALES = ["ro", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "ro";
const STORAGE_KEY = "ro-budget-dashboard.locale";

function initialLocale(): Locale {
  if (typeof localStorage !== "undefined") {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "ro" || stored === "en") {
      return stored;
    }
  }
  return DEFAULT_LOCALE;
}

i18n.load({ ro: roMessages, en: enMessages });
i18n.activate(initialLocale());

export function setLocale(locale: Locale): void {
  i18n.activate(locale);
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(STORAGE_KEY, locale);
  }
}

export function LinguiProvider({ children }: { children: ReactNode }) {
  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
}
