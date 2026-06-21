import type { LucideIcon } from "lucide-react";

type MetricCardProps = {
  label: string;
  value: string | number;
  helper: string;
  icon: LucideIcon;
};

export function MetricCard({
  label,
  value,
  helper,
  icon: Icon,
}: MetricCardProps) {
  return (
    <article className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-stone-500">{label}</p>
          <p className="mt-2 text-3xl font-semibold text-[#17231f]">{value}</p>
        </div>
        <span className="flex size-10 items-center justify-center rounded-lg bg-[#fff3d6] text-[#9a6700]">
          <Icon aria-hidden="true" className="size-5" />
        </span>
      </div>
      <p className="mt-4 text-sm text-stone-600">{helper}</p>
    </article>
  );
}
