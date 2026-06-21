"use client";

import { useMemo, useSyncExternalStore } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Download,
  Files,
  MapPinned,
  RotateCcw,
} from "lucide-react";
import { DashboardCharts } from "@/components/dashboard-charts";
import { MetricCard } from "@/components/metric-card";
import { RiskBadge } from "@/components/risk-badge";
import { SectionHeading } from "@/components/section-heading";
import { StatusBadge } from "@/components/status-badge";
import {
  getIncidentStoreSnapshot,
  getSeededIncidentStoreSnapshot,
  parseIncidentStoreSnapshot,
  resetStoredIncidents,
  subscribeToIncidentStorage,
} from "@/lib/storage";
import type { ChartDatum, Incident } from "@/types";

function groupBy<T extends keyof Incident>(
  incidents: Incident[],
  key: T,
): ChartDatum[] {
  const counts = incidents.reduce<Record<string, number>>((acc, incident) => {
    const value = String(incident[key]);
    acc[value] = (acc[value] ?? 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value || a.name.localeCompare(b.name));
}

const riskOrder = ["low", "medium", "high", "critical"];

function formatTimestamp(timestamp: string | null) {
  if (!timestamp) {
    return "Seeded demo data only";
  }

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(timestamp));
}

function exportIncidentsAsJson(incidents: Incident[]) {
  const payload = JSON.stringify(
    {
      exportedAt: new Date().toISOString(),
      totalIncidents: incidents.length,
      incidents,
    },
    null,
    2,
  );
  const blob = new Blob([payload], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `civicguard-incidents-${new Date()
    .toISOString()
    .slice(0, 10)}.json`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export default function DashboardPage() {
  const storeSnapshot = useSyncExternalStore(
    subscribeToIncidentStorage,
    getIncidentStoreSnapshot,
    getSeededIncidentStoreSnapshot,
  );
  const { incidents, lastUpdatedAt } = useMemo(
    () => parseIncidentStoreSnapshot(storeSnapshot),
    [storeSnapshot],
  );
  const highRiskIncidents = incidents.filter((incident) =>
    ["high", "critical"].includes(incident.riskLevel),
  );
  const pendingReviews = incidents.filter((incident) =>
    ["pending", "needs evidence"].includes(incident.reviewStatus),
  ).length;
  const verifiedCases = incidents.filter((incident) =>
    ["verified false", "verified authentic"].includes(incident.reviewStatus),
  ).length;
  const averageConfidence = Math.round(
    incidents.reduce((sum, incident) => sum + incident.confidenceEstimate, 0) /
      incidents.length,
  );
  const byCountry = groupBy(incidents, "country");
  const byLanguage = groupBy(incidents, "language");
  const byCategory = groupBy(incidents, "harmCategory");
  const byRisk = groupBy(incidents, "riskLevel").sort(
    (a, b) => riskOrder.indexOf(a.name) - riskOrder.indexOf(b.name),
  );
  const topCountry = byCountry[0]?.name ?? "No country";
  const topCategory = byCategory[0]?.name ?? "No category";

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="Dashboard"
          title="Civic risk monitoring dashboard"
          description="A local command view for incident volume, high-risk signals, review backlog, verified outcomes, and cross-language harm patterns."
        />
        <div className="max-w-xl">
          <div className="flex flex-col gap-3 sm:flex-row lg:items-center">
            <button
              type="button"
              onClick={() => exportIncidentsAsJson(incidents)}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-stone-300 bg-white px-4 text-sm font-semibold text-stone-700 transition hover:border-[#116149] hover:text-[#116149]"
            >
              <Download aria-hidden="true" className="size-4" />
              Export JSON
            </button>
            <button
              type="button"
              onClick={resetStoredIncidents}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#113f36] px-4 text-sm font-semibold text-white transition hover:bg-[#0d3029]"
            >
              <RotateCcw aria-hidden="true" className="size-4" />
              Reset demo data
            </button>
          </div>
          <p className="mt-3 text-sm leading-6 text-stone-600">
            Incident exports can support research reports, civic monitoring
            handoffs, and future evaluation work.
          </p>
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-stone-200 bg-white px-4 py-3 text-sm text-stone-600 shadow-sm">
        Last updated: {formatTimestamp(lastUpdatedAt)}
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label="Total incidents"
          value={incidents.length}
          helper="Seeded plus locally submitted incidents"
          icon={Files}
        />
        <MetricCard
          label="High-risk incidents"
          value={highRiskIncidents.length}
          helper="High or critical risk classifications"
          icon={AlertTriangle}
        />
        <MetricCard
          label="Pending reviews"
          value={pendingReviews}
          helper="Pending or still needing evidence"
          icon={Clock3}
        />
        <MetricCard
          label="Verified cases"
          value={verifiedCases}
          helper="Verified false or authentic outcomes"
          icon={CheckCircle2}
        />
      </div>

      <section className="mt-8 rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <MapPinned
            aria-hidden="true"
            className="mt-1 size-5 shrink-0 text-[#116149]"
          />
          <div>
            <h2 className="text-lg font-semibold text-[#17231f]">
              Short insight summary
            </h2>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              The current local dataset shows the most activity in {topCountry},
              with {topCategory} appearing as a leading harm pattern.{" "}
              {verifiedCases} cases have reached a verified status, while{" "}
              {pendingReviews} still need reviewer attention. Average triage
              confidence is {averageConfidence}%.
            </p>
          </div>
        </div>
      </section>

      <div className="mt-8">
        <DashboardCharts
          byCountry={byCountry}
          byLanguage={byLanguage}
          byCategory={byCategory}
          byRisk={byRisk}
        />
      </div>

      <section className="mt-8 overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm">
        <div className="border-b border-stone-200 p-5">
          <h2 className="text-lg font-semibold text-[#17231f]">
            High-risk incidents
          </h2>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            Items a civic team would likely review first during a live election
            period.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-[900px] divide-y divide-stone-200">
            <thead className="bg-[#edf3ef]">
              <tr>
                {["Incident", "Country", "Language", "Risk", "Status", "Action"].map(
                  (heading) => (
                    <th
                      key={heading}
                      scope="col"
                      className="px-5 py-3 text-left text-xs font-semibold uppercase text-stone-600"
                    >
                      {heading}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {highRiskIncidents.map((incident) => (
                <tr key={incident.id} className="align-top hover:bg-[#f8faf7]">
                  <td className="max-w-md px-5 py-4">
                    <p className="text-sm font-semibold text-[#17231f]">
                      {incident.title}
                    </p>
                    <p className="mt-1 text-xs text-stone-500">
                      {incident.harmCategory}
                    </p>
                  </td>
                  <td className="px-5 py-4 text-sm text-stone-700">
                    {incident.country}
                  </td>
                  <td className="px-5 py-4 text-sm text-stone-700">
                    {incident.language}
                  </td>
                  <td className="px-5 py-4">
                    <RiskBadge risk={incident.riskLevel} />
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={incident.reviewStatus} />
                  </td>
                  <td className="px-5 py-4">
                    <Link
                      href={`/incidents/${incident.id}`}
                      className="inline-flex h-9 items-center rounded-lg border border-stone-300 px-3 text-sm font-medium text-stone-700 transition hover:border-[#116149] hover:text-[#116149]"
                    >
                      View details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 rounded-lg border border-[#f0d9b5] bg-[#fff8ea] p-5">
        <div className="flex items-start gap-3">
          <CheckCircle2
            aria-hidden="true"
            className="mt-0.5 size-5 shrink-0 text-[#9a6700]"
          />
          <p className="text-sm leading-6 text-stone-800">
            CivicGuard does not determine truth automatically. It supports human
            verification by prioritising and structuring suspicious civic
            content.
          </p>
        </div>
      </section>
    </div>
  );
}
