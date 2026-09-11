import { cn } from "../../lib/cn";

interface SkeletonCardProps {
  className?: string;
}

/** Pulsing placeholder shown while a chart/KPI section is loading. */
export function SkeletonCard({ className }: SkeletonCardProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "animate-pulse rounded-xl border border-slate-200 bg-slate-100",
        className
      )}
    />
  );
}
