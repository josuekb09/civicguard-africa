"use client";

import { useMemo, useSyncExternalStore } from "react";
import Link from "next/link";
import { FilePlus2, FileQuestion } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { TriageResultPanel } from "@/components/triage-result-panel";
import {
  getIncidentStoreSnapshot,
  getSeededIncidentStoreSnapshot,
  parseIncidentStoreSnapshot,
  subscribeToIncidentStorage,
} from "@/lib/storage";

function subscribeToLocation(callback: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  window.addEventListener("popstate", callback);

  return () => window.removeEventListener("popstate", callback);
}

function getQueryIncidentId() {
  if (typeof window === "undefined") {
    return null;
  }

  return new URLSearchParams(window.location.search).get("incidentId");
}

function getServerQueryIncidentId() {
  return null;
}

export default function TriageResultPage() {
  const storeSnapshot = useSyncExternalStore(
    subscribeToIncidentStorage,
    getIncidentStoreSnapshot,
    getSeededIncidentStoreSnapshot,
  );
  const queryIncidentId = useSyncExternalStore(
    subscribeToLocation,
    getQueryIncidentId,
    getServerQueryIncidentId,
  );
  const { incidents, lastIncidentId } = useMemo(
    () => parseIncidentStoreSnapshot(storeSnapshot),
    [storeSnapshot],
  );
  const selectedIncidentId = queryIncidentId ?? lastIncidentId;
  const incident = selectedIncidentId
    ? incidents.find((item) => item.id === selectedIncidentId)
    : incidents[0];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="Incident detail"
          title="Triage report"
          description="This structured incident report is generated from seeded mock data and locally submitted incidents. New submissions persist across refreshes through localStorage."
        />
        <Link
          href="/submit"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#113f36] px-4 text-sm font-semibold text-white transition hover:bg-[#0d3029]"
        >
          <FilePlus2 aria-hidden="true" className="size-4" />
          New incident
        </Link>
      </div>

      <div className="mt-8">
        {incident ? (
          <TriageResultPanel incident={incident} />
        ) : (
          <section className="rounded-lg border border-stone-200 bg-white p-8 shadow-sm">
            <div className="flex items-start gap-3">
              <FileQuestion
                aria-hidden="true"
                className="mt-1 size-6 shrink-0 text-stone-500"
              />
              <div>
                <h1 className="text-xl font-semibold text-[#17231f]">
                  Incident not found
                </h1>
                <p className="mt-2 text-sm leading-6 text-stone-600">
                  The requested incident is not available in the local demo
                  dataset. Submit a new incident to generate a fresh triage
                  report.
                </p>
                <Link
                  href="/submit"
                  className="mt-5 inline-flex h-10 items-center justify-center rounded-lg bg-[#113f36] px-4 text-sm font-semibold text-white transition hover:bg-[#0d3029]"
                >
                  Back to Submit
                </Link>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
