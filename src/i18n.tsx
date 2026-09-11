import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import type { ReactNode } from "react";
import { messages as enMessages } from "./locales/en/messages";
import { messages as roMessages } from "./locales/ro/messages";

export const DEFAULT_LOCALE = "ro" as const;

i18n.load({ ro: roMessages, en: enMessages });
i18n.activate(DEFAULT_LOCALE);

export function LinguiProvider({ children }: { children: ReactNode }) {
  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
}
