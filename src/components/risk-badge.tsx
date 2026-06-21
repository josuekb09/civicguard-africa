import type { RiskLevel } from "@/types";
import { cn } from "@/lib/utils";

const riskClasses: Record<RiskLevel, string> = {
  low: "border-emerald-200 bg-emerald-50 text-emerald-800",
  medium: "border-amber-200 bg-amber-50 text-amber-800",
  high: "border-orange-200 bg-orange-50 text-orange-800",
  critical: "border-red-200 bg-red-50 text-red-800",
};

export function RiskBadge({ risk }: { risk: RiskLevel }) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-md border px-2.5 py-1 text-xs font-semibold uppercase",
        riskClasses[risk],
      )}
    >
      {risk}
    </span>
  );
}
