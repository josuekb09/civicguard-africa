"use client";

import dynamic from "next/dynamic";
import type { ChartDatum } from "@/types";

const DashboardChartsInner = dynamic(
  () =>
    import("@/components/dashboard-charts-inner").then(
      (module) => module.DashboardChartsInner,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="grid gap-6 lg:grid-cols-2">
        {["Country", "Language", "Category", "Risk"].map((title) => (
          <article
            key={title}
            className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm"
          >
            <h3 className="text-base font-semibold text-[#17231f]">{title}</h3>
            <div className="mt-4 h-72 rounded-lg bg-[#edf3ef]" />
          </article>
        ))}
      </div>
    ),
  },
);

export function DashboardCharts({
  byCountry,
  byLanguage,
  byCategory,
  byRisk,
}: {
  byCountry: ChartDatum[];
  byLanguage: ChartDatum[];
  byCategory: ChartDatum[];
  byRisk: ChartDatum[];
}) {
  return (
    <DashboardChartsInner
      byCountry={byCountry}
      byLanguage={byLanguage}
      byCategory={byCategory}
      byRisk={byRisk}
    />
  );
}
