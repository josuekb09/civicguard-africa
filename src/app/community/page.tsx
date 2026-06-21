"use client";

import { useMemo, useSyncExternalStore } from "react";
import { ReviewQueue } from "@/components/review-queue";
import { SectionHeading } from "@/components/section-heading";
import {
  getIncidentStoreSnapshot,
  getSeededIncidentStoreSnapshot,
  parseIncidentStoreSnapshot,
  subscribeToIncidentStorage,
  updateIncidentReview,
} from "@/lib/storage";
import type { ReviewStatus } from "@/types";

export default function CommunityReviewPage() {
  const storeSnapshot = useSyncExternalStore(
    subscribeToIncidentStorage,
    getIncidentStoreSnapshot,
    getSeededIncidentStoreSnapshot,
  );
  const { incidents } = useMemo(
    () => parseIncidentStoreSnapshot(storeSnapshot),
    [storeSnapshot],
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Community review"
        title="Reviewer queue for suspicious civic content"
        description="Filter submitted incidents by risk and review status. This MVP simulates human review with local status updates and reviewer notes that persist through localStorage."
      />

      <section className="mt-6 rounded-lg border border-[#f0d9b5] bg-[#fff8ea] p-5 text-sm leading-6 text-stone-700">
        In a real deployment, reviewers could come from fact-checking
        organisations, civic-tech groups, journalists, student researchers,
        election observers, and trusted civil society partners.
      </section>

      <div className="mt-8">
        <ReviewQueue
          incidents={incidents}
          onUpdateIncident={(incidentId, updates) =>
            updateIncidentReview(incidentId, updates as {
              reviewStatus?: ReviewStatus;
              reviewerNotes?: string;
            })
          }
        />
      </div>
    </div>
  );
}
