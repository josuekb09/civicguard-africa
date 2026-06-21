"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Eye, Filter } from "lucide-react";
import { RiskBadge } from "@/components/risk-badge";
import { StatusBadge } from "@/components/status-badge";
import type { Incident, ReviewStatus } from "@/types";

type QueueFilter = "all" | "high" | "pending" | "verified" | "needs evidence";

const filters: Array<{ id: QueueFilter; label: string }> = [
  { id: "all", label: "All" },
  { id: "high", label: "High risk" },
  { id: "pending", label: "Pending" },
  { id: "verified", label: "Verified" },
  { id: "needs evidence", label: "Needs evidence" },
];

const reviewStatuses: ReviewStatus[] = [
  "pending",
  "needs evidence",
  "likely misleading",
  "verified false",
  "verified authentic",
  "inconclusive",
];

function matchesFilter(incident: Incident, filter: QueueFilter) {
  if (filter === "all") {
    return true;
  }

  if (filter === "high") {
    return ["high", "critical"].includes(incident.riskLevel);
  }

  if (filter === "pending") {
    return incident.reviewStatus === "pending";
  }

  if (filter === "verified") {
    return ["verified false", "verified authentic"].includes(
      incident.reviewStatus,
    );
  }

  return incident.reviewStatus === "needs evidence";
}

export function ReviewQueue({
  incidents,
  onUpdateIncident,
}: {
  incidents: Incident[];
  onUpdateIncident?: (
    incidentId: string,
    updates: { reviewStatus?: ReviewStatus; reviewerNotes?: string },
  ) => void;
}) {
  const [activeFilter, setActiveFilter] = useState<QueueFilter>("all");
  const filteredIncidents = useMemo(
    () => incidents.filter((incident) => matchesFilter(incident, activeFilter)),
    [activeFilter, incidents],
  );

  return (
    <section className="space-y-5">
      <div className="flex flex-col gap-3 rounded-lg border border-stone-200 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2 text-sm font-medium text-stone-700">
          <Filter aria-hidden="true" className="size-4 text-[#116149]" />
          Review filters
        </div>
        <div className="flex gap-2 overflow-x-auto">
          {filters.map((filter) => {
            const count = incidents.filter((incident) =>
              matchesFilter(incident, filter.id),
            ).length;

            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                className={`h-10 shrink-0 rounded-lg border px-3 text-sm font-medium transition ${
                  activeFilter === filter.id
                    ? "border-[#116149] bg-[#e8f2ee] text-[#113f36]"
                    : "border-stone-200 bg-white text-stone-600 hover:border-[#116149]"
                }`}
              >
                {filter.label} ({count})
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {filteredIncidents.map((incident) => (
          <article
            key={incident.id}
            className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <h2 className="text-lg font-semibold text-[#17231f]">
                  {incident.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-stone-600">
                  {incident.country} / {incident.language} / {incident.platform}
                </p>
              </div>
              <RiskBadge risk={incident.riskLevel} />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <StatusBadge status={incident.reviewStatus} />
              <span className="inline-flex w-fit items-center rounded-md border border-stone-200 bg-stone-50 px-2.5 py-1 text-xs font-medium capitalize text-stone-700">
                {incident.harmCategory}
              </span>
            </div>

            <p className="mt-4 text-sm font-medium text-stone-700">
              Reviewer notes
            </p>
            <textarea
              key={`${incident.id}-${incident.reviewerNotes}`}
              defaultValue={incident.reviewerNotes}
              onBlur={(event) =>
                onUpdateIncident?.(incident.id, {
                  reviewerNotes: event.target.value,
                })
              }
              className="mt-2 min-h-20 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm leading-6 text-stone-700 outline-none transition focus:border-[#116149] focus:ring-2 focus:ring-[#116149]/20"
              placeholder="Add reviewer context, evidence gaps, or next-step notes."
            />

            <div className="mt-5 grid gap-3 border-t border-stone-100 pt-4 sm:grid-cols-[1fr_auto] sm:items-end">
              <label className="grid gap-2">
                <span className="text-xs font-medium uppercase text-stone-500">
                  Update status
                </span>
                <select
                  value={incident.reviewStatus}
                  onChange={(event) =>
                    onUpdateIncident?.(incident.id, {
                      reviewStatus: event.target.value as ReviewStatus,
                    })
                  }
                  className="h-10 rounded-lg border border-stone-300 bg-white px-3 text-sm capitalize outline-none transition focus:border-[#116149] focus:ring-2 focus:ring-[#116149]/20"
                >
                  {reviewStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </label>
              <p className="text-xs font-medium uppercase text-stone-500">
                Confidence {incident.confidenceEstimate}%
              </p>
            </div>

            <div className="mt-4 flex justify-end">
              <Link
                href={`/incidents/${incident.id}`}
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-stone-300 px-3 text-sm font-medium text-stone-700 transition hover:border-[#116149] hover:text-[#116149]"
              >
                <Eye aria-hidden="true" className="size-4" />
                View details
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
