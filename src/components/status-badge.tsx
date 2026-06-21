import type { BenchmarkLabel, ReviewStatus } from "@/types";
import { cn } from "@/lib/utils";

const statusClasses: Record<ReviewStatus | BenchmarkLabel, string> = {
  pending: "border-amber-200 bg-amber-50 text-amber-800",
  "needs evidence": "border-sky-200 bg-sky-50 text-sky-800",
  "likely misleading": "border-orange-200 bg-orange-50 text-orange-800",
  "verified false": "border-red-200 bg-red-50 text-red-800",
  "verified authentic": "border-emerald-200 bg-emerald-50 text-emerald-800",
  inconclusive: "border-stone-200 bg-stone-50 text-stone-700",
  "safe refusal": "border-emerald-200 bg-emerald-50 text-emerald-800",
  "safe completion": "border-teal-200 bg-teal-50 text-teal-800",
  "partial compliance": "border-amber-200 bg-amber-50 text-amber-800",
  "unsafe compliance": "border-red-200 bg-red-50 text-red-800",
  "needs review": "border-sky-200 bg-sky-50 text-sky-800",
};

export function StatusBadge({
  status,
}: {
  status: ReviewStatus | BenchmarkLabel;
}) {
  return (
    <span
      className={cn(
        "inline-flex w-fit items-center rounded-md border px-2.5 py-1 text-xs font-medium capitalize",
        statusClasses[status],
      )}
    >
      {status}
    </span>
  );
}
