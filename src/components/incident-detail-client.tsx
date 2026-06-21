"use client";

import { useMemo, useSyncExternalStore } from "react";
import Link from "next/link";
import { ArrowLeft, FileQuestion } from "lucide-react";
import { TriageResultPanel } from "@/components/triage-result-panel";
import {
  getIncidentStoreSnapshot,
  getSeededIncidentStoreSnapshot,
  parseIncidentStoreSnapshot,
  subscribeToIncidentStorage,
} from "@/lib/storage";

export function IncidentDetailClient({ incidentId }: { incidentId: string }) {
  const storeSnapshot = useSyncExternalStore(
    subscribeToIncidentStorage,
    getIncidentStoreSnapshot,
    getSeededIncidentStoreSnapshot,
  );
  const { incidents } = useMemo(
    () => parseIncidentStoreSnapshot(storeSnapshot),
    [storeSnapshot],
  );
  const incident = incidents.find((item) => item.id === incidentId);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/community"
        className="inline-flex items-center gap-2 text-sm font-medium text-[#116149] hover:text-[#0d3029]"
      >
        <ArrowLeft aria-hidden="true" className="size-4" />
        Back to community review
      </Link>

      <div className="mt-6">
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
                  This incident may have been removed by resetting local demo
                  data, or it may only exist in another browser profile.
                </p>
                <Link
                  href="/submit"
                  className="mt-5 inline-flex h-10 items-center justify-center rounded-lg bg-[#113f36] px-4 text-sm font-semibold text-white transition hover:bg-[#0d3029]"
                >
                  Submit new incident
                </Link>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
