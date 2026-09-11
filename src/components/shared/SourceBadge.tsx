import { useLingui } from "@lingui/react";
import { cn } from "../../lib/cn";

interface SourceBadgeProps {
  /** i18n message id (e.g. "source.ins") or raw text. */
  source: string;
  className?: string;
}

export function SourceBadge({ source, className }: SourceBadgeProps) {
  const { i18n } = useLingui();
  const label = i18n._({ id: source, message: source });

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600",
        className
      )}
    >
      {label}
    </span>
  );
}
