import { i18n } from "@lingui/core";
import { messages as enMessages } from "./locales/en/messages.po";
import { messages as roMessages } from "./locales/ro/messages.po";

export const LOCALES = ["ro", "en"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "ro";
const STORAGE_KEY = "ro-budget-dashboard.locale";

i18n.load({ ro: roMessages, en: enMessages });

function getInitialLocale(): Locale {
  if (typeof localStorage !== "undefined") {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "ro" || stored === "en") {
      return stored;
    }
  }
  return DEFAULT_LOCALE;
}

function applyLocale(locale: Locale): void {
  i18n.activate(locale);
  if (typeof document !== "undefined") {
    document.documentElement.lang = locale;
  }
}

applyLocale(getInitialLocale());

export function setLocale(locale: Locale): void {
  applyLocale(locale);
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(STORAGE_KEY, locale);
  }
}
