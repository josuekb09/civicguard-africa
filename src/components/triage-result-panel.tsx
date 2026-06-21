import {
  AlertTriangle,
  CheckCircle2,
  ClipboardCheck,
  FileText,
  Gauge,
  SearchCheck,
  ShieldAlert,
} from "lucide-react";
import { RiskBadge } from "@/components/risk-badge";
import { StatusBadge } from "@/components/status-badge";
import type { Incident } from "@/types";

function ReportBlock({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
      <h3 className="text-sm font-semibold uppercase text-stone-500">{title}</h3>
      <div className="mt-3">{children}</div>
    </section>
  );
}

export function TriageResultPanel({ incident }: { incident: Incident }) {
  return (
    <article className="overflow-hidden rounded-lg border border-stone-200 bg-[#f8faf7] shadow-sm">
      <div className="border-b border-stone-200 bg-white p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase text-[#c35b3c]">
              Incident report
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-[#17231f] sm:text-3xl">
              {incident.title}
            </h2>
            <p className="mt-3 text-sm leading-6 text-stone-600">
              {incident.country} / {incident.language} / {incident.platform} /{" "}
              {incident.contentType}
            </p>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              Potential risk assessment only. Human review is needed before any
              truth, falsity, or public-response decision.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <RiskBadge risk={incident.riskLevel} />
            <StatusBadge status={incident.reviewStatus} />
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-stone-200 bg-[#f8faf7] p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-stone-500">
              <FileText aria-hidden="true" className="size-4" />
              Incident ID
            </div>
            <p className="mt-2 break-all text-sm font-semibold text-[#17231f]">
              {incident.id}
            </p>
          </div>
          <div className="rounded-lg border border-stone-200 bg-[#f8faf7] p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-stone-500">
              <Gauge aria-hidden="true" className="size-4" />
              Confidence estimate
            </div>
            <p className="mt-2 text-2xl font-semibold text-[#17231f]">
              {incident.confidenceEstimate}%
            </p>
          </div>
          <div className="rounded-lg border border-stone-200 bg-[#f8faf7] p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-stone-500">
              <ShieldAlert aria-hidden="true" className="size-4" />
              Harm category
            </div>
            <p className="mt-2 text-base font-semibold capitalize text-[#17231f]">
              {incident.harmCategory}
            </p>
          </div>
          <div className="rounded-lg border border-stone-200 bg-[#f8faf7] p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-stone-500">
              <FileText aria-hidden="true" className="size-4" />
              Submitted
            </div>
            <p className="mt-2 text-base font-semibold text-[#17231f]">
              {incident.submittedAt.slice(0, 10)}
            </p>
          </div>
          <div className="rounded-lg border border-stone-200 bg-[#f8faf7] p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-stone-500">
              <ClipboardCheck aria-hidden="true" className="size-4" />
              Review status
            </div>
            <div className="mt-2">
              <StatusBadge status={incident.reviewStatus} />
            </div>
          </div>
          <div className="rounded-lg border border-stone-200 bg-[#f8faf7] p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-stone-500">
              <AlertTriangle aria-hidden="true" className="size-4" />
              Urgency
            </div>
            <p className="mt-2 text-base font-semibold capitalize text-[#17231f]">
              {incident.urgency}
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 p-6 lg:grid-cols-[1.25fr_0.75fr]">
        <div className="space-y-6">
          <ReportBlock title="Incident summary">
            <dl className="grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-medium uppercase text-stone-500">
                  Election context
                </dt>
                <dd className="mt-1 text-sm leading-6 text-stone-800">
                  {incident.electionContext}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase text-stone-500">
                  Source URL
                </dt>
                <dd className="mt-1 break-words text-sm leading-6 text-stone-800">
                  {incident.sourceUrl || "Not provided"}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs font-medium uppercase text-stone-500">
                  Submitted description
                </dt>
                <dd className="mt-1 text-sm leading-6 text-stone-800">
                  {incident.description}
                </dd>
              </div>
            </dl>
          </ReportBlock>

          <ReportBlock title="AI-assisted triage explanation">
            <p className="text-sm leading-6 text-stone-700">
              {incident.triageExplanation}
            </p>
          </ReportBlock>

          <ReportBlock title="Verification checklist">
            <ul className="space-y-3">
              {incident.verificationChecklist.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-stone-700">
                  <CheckCircle2
                    aria-hidden="true"
                    className="mt-0.5 size-5 shrink-0 text-emerald-700"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </ReportBlock>

          <ReportBlock title="What a reviewer should check next">
            <ul className="space-y-3">
              {incident.reviewerNextChecks.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-6 text-stone-700">
                  <SearchCheck
                    aria-hidden="true"
                    className="mt-0.5 size-5 shrink-0 text-[#116149]"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </ReportBlock>
        </div>

        <aside className="space-y-4">
          <ReportBlock title="Evidence signals">
            <ul className="space-y-2 text-sm leading-6 text-stone-700">
              {incident.evidenceSignals.map((signal) => (
                <li key={signal}>- {signal}</li>
              ))}
            </ul>
          </ReportBlock>

          <ReportBlock title="Recommended next action">
            <div className="flex gap-3">
              <ClipboardCheck
                aria-hidden="true"
                className="mt-0.5 size-5 shrink-0 text-[#116149]"
              />
              <p className="text-sm leading-6 text-stone-700">
                {incident.recommendedNextAction}
              </p>
            </div>
          </ReportBlock>

          <ReportBlock title="Reviewer notes">
            <p className="text-sm leading-6 text-stone-700">
              {incident.reviewerNotes}
            </p>
          </ReportBlock>

          <section className="rounded-lg border border-red-200 bg-red-50 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle
                aria-hidden="true"
                className="mt-0.5 size-5 shrink-0 text-red-700"
              />
              <div>
                <h3 className="font-semibold text-red-950">Safety disclaimer</h3>
                <p className="mt-2 text-sm leading-6 text-red-900">
                  CivicGuard does not determine truth automatically. It supports human verification by prioritising and structuring suspicious civic content.
                </p>
              </div>
            </div>
          </section>
        </aside>
      </div>
    </article>
  );
}
