"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { ClipboardList, PlayCircle, Send, ShieldCheck } from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { saveIncident, setLastIncidentId } from "@/lib/storage";
import { triageIncident } from "@/lib/triage";
import type { ContentType, IncidentInput, Urgency } from "@/types";

const initialForm: IncidentInput = {
  title: "",
  country: "South Africa",
  language: "English",
  platform: "WhatsApp",
  contentType: "text",
  sourceUrl: "",
  description: "",
  electionContext: "",
  urgency: "medium",
};

const countries = ["South Africa", "Kenya", "Nigeria", "DRC", "Tanzania", "Other"];

const languages = [
  "English",
  "French",
  "Swahili",
  "isiXhosa",
  "isiZulu",
  "Afrikaans",
  "Code-switched language",
  "Other",
];

const platforms = [
  "WhatsApp",
  "Facebook",
  "TikTok",
  "Telegram",
  "X",
  "YouTube",
  "Radio",
  "Other",
];

const contentTypes: ContentType[] = ["text", "image", "video", "audio", "link", "mixed"];
const urgencyLevels: Urgency[] = ["low", "medium", "high", "critical"];

const demoCase: IncidentInput = {
  title: "Code-switched WhatsApp message claims polling station relocated",
  country: "South Africa",
  language: "isiXhosa / English code-switched",
  platform: "WhatsApp",
  contentType: "text",
  sourceUrl: "https://example.org/demo-election-case",
  description:
    "A message circulating in a community group claims that a polling station has moved on voting day, but no official source is provided.",
  electionContext: "Polling day",
  urgency: "high",
};

function FieldHelp({ children }: { children: React.ReactNode }) {
  return <p className="text-xs leading-5 text-stone-500">{children}</p>;
}

export default function SubmitIncidentPage() {
  const router = useRouter();
  const [form, setForm] = useState<IncidentInput>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField<K extends keyof IncidentInput>(
    field: K,
    value: IncidentInput[K],
  ) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);

    const incident = triageIncident(form, {
      id: `submitted-${Date.now()}`,
      submittedAt: new Date().toISOString(),
      reviewStatus: "pending",
    });

    saveIncident(incident);
    setLastIncidentId(incident.id);

    router.push(`/triage-result?incidentId=${encodeURIComponent(incident.id)}`);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading
          eyebrow="Submit incident"
          title="Capture suspicious election-related content"
          description="Record enough context for a reviewer to understand the claim without reposting or amplifying it. The next page generates a deterministic local triage report."
        />
        <div className="rounded-lg border border-[#f0d9b5] bg-[#fff8ea] p-4 text-sm leading-6 text-stone-700 lg:max-w-sm">
          Keep examples safe: use placeholder people, no real parties, and no
          operational instructions for manipulation.
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_0.45fr]">
        <form
          onSubmit={handleSubmit}
          className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm"
        >
          <div className="grid gap-6">
            <label className="grid gap-2">
              <span className="text-sm font-semibold text-stone-800">Title</span>
              <input
                required
                value={form.title}
                onChange={(event) => updateField("title", event.target.value)}
                className="h-11 rounded-lg border border-stone-300 bg-white px-3 text-sm outline-none transition focus:border-[#116149] focus:ring-2 focus:ring-[#116149]/20"
                placeholder="Short incident title"
              />
              <FieldHelp>
                Use a concise neutral summary, for example: WhatsApp post claims
                polling station moved.
              </FieldHelp>
            </label>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-stone-800">Country</span>
                <select
                  value={form.country}
                  onChange={(event) => updateField("country", event.target.value)}
                  className="h-11 rounded-lg border border-stone-300 bg-white px-3 text-sm outline-none transition focus:border-[#116149] focus:ring-2 focus:ring-[#116149]/20"
                >
                  {countries.map((country) => (
                    <option key={country}>{country}</option>
                  ))}
                </select>
                <FieldHelp>Choose the country or civic context being affected.</FieldHelp>
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-stone-800">Language</span>
                <select
                  value={form.language}
                  onChange={(event) => updateField("language", event.target.value)}
                  className="h-11 rounded-lg border border-stone-300 bg-white px-3 text-sm outline-none transition focus:border-[#116149] focus:ring-2 focus:ring-[#116149]/20"
                >
                  {languages.map((language) => (
                    <option key={language}>{language}</option>
                  ))}
                </select>
                <FieldHelp>
                  Note local-language or code-switched content when possible.
                </FieldHelp>
              </label>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-stone-800">Platform</span>
                <select
                  value={form.platform}
                  onChange={(event) => updateField("platform", event.target.value)}
                  className="h-11 rounded-lg border border-stone-300 bg-white px-3 text-sm outline-none transition focus:border-[#116149] focus:ring-2 focus:ring-[#116149]/20"
                >
                  {platforms.map((platform) => (
                    <option key={platform}>{platform}</option>
                  ))}
                </select>
                <FieldHelp>Where the submitter saw the suspicious content.</FieldHelp>
              </label>

              <label className="grid gap-2">
                <span className="text-sm font-semibold text-stone-800">
                  Content type
                </span>
                <select
                  value={form.contentType}
                  onChange={(event) =>
                    updateField("contentType", event.target.value as ContentType)
                  }
                  className="h-11 rounded-lg border border-stone-300 bg-white px-3 text-sm outline-none transition focus:border-[#116149] focus:ring-2 focus:ring-[#116149]/20"
                >
                  {contentTypes.map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
                <FieldHelp>
                  Multimedia content gets extra review attention in the mock score.
                </FieldHelp>
              </label>
            </div>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-stone-800">Source URL</span>
              <input
                type="url"
                value={form.sourceUrl}
                onChange={(event) => updateField("sourceUrl", event.target.value)}
                className="h-11 rounded-lg border border-stone-300 bg-white px-3 text-sm outline-none transition focus:border-[#116149] focus:ring-2 focus:ring-[#116149]/20"
                placeholder="https://example.org/safe-demo/source"
              />
              <FieldHelp>
                Optional for private channels, but source links improve evidence
                tracing and confidence.
              </FieldHelp>
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-stone-800">Description</span>
              <textarea
                required
                value={form.description}
                onChange={(event) => updateField("description", event.target.value)}
                className="min-h-36 rounded-lg border border-stone-300 bg-white px-3 py-3 text-sm leading-6 outline-none transition focus:border-[#116149] focus:ring-2 focus:ring-[#116149]/20"
                placeholder="Summarize the claim and why it may affect civic participation."
              />
              <FieldHelp>
                Mention signals like voting date, polling station, ballot,
                election commission, fake results, ethnic group, violence,
                deepfake, impersonation, or boycott if relevant.
              </FieldHelp>
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-semibold text-stone-800">
                Election context
              </span>
              <input
                required
                value={form.electionContext}
                onChange={(event) =>
                  updateField("electionContext", event.target.value)
                }
                className="h-11 rounded-lg border border-stone-300 bg-white px-3 text-sm outline-none transition focus:border-[#116149] focus:ring-2 focus:ring-[#116149]/20"
                placeholder="Polling day, tallying period, campaign week..."
              />
              <FieldHelp>
                Context helps reviewers judge urgency and likely civic harm.
              </FieldHelp>
            </label>

            <fieldset>
              <legend className="text-sm font-semibold text-stone-800">Urgency</legend>
              <FieldHelp>
                Use higher urgency when the content could affect immediate voting,
                safety, or trust in results.
              </FieldHelp>
              <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {urgencyLevels.map((urgency) => (
                  <label
                    key={urgency}
                    className="flex cursor-pointer items-center gap-2 rounded-lg border border-stone-300 px-3 py-2 text-sm capitalize transition has-[:checked]:border-[#116149] has-[:checked]:bg-[#e8f2ee]"
                  >
                    <input
                      type="radio"
                      name="urgency"
                      value={urgency}
                      checked={form.urgency === urgency}
                      onChange={(event) =>
                        updateField("urgency", event.target.value as Urgency)
                      }
                      className="accent-[#116149]"
                    />
                    {urgency}
                  </label>
                ))}
              </div>
            </fieldset>
          </div>

          <button
            type="submit"
            data-testid="generate-triage-report"
            disabled={isSubmitting}
            className="mt-7 inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#113f36] px-5 text-sm font-semibold text-white transition hover:bg-[#0d3029] disabled:cursor-not-allowed disabled:bg-stone-400"
          >
            <Send aria-hidden="true" className="size-4" />
            {isSubmitting ? "Generating report..." : "Generate triage report"}
          </button>
        </form>

        <aside className="space-y-4">
          <button
            type="button"
            data-testid="load-demo-case"
            onClick={() => setForm(demoCase)}
            className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-[#116149] bg-white px-4 text-sm font-semibold text-[#113f36] transition hover:bg-[#e8f2ee]"
          >
            <PlayCircle aria-hidden="true" className="size-4" />
            Load demo election case
          </button>

          <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 text-[#113f36]">
              <ShieldCheck aria-hidden="true" className="size-5" />
              <h2 className="font-semibold">Local-only triage</h2>
            </div>
            <p className="mt-3 text-sm leading-6 text-stone-600">
              This MVP does not call an external AI API. It uses deterministic
              keyword and urgency logic so the demo remains explainable.
            </p>
          </section>

          <section className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-2 text-[#113f36]">
              <ClipboardList aria-hidden="true" className="size-5" />
              <h2 className="font-semibold">Next screen</h2>
            </div>
            <p className="mt-3 text-sm leading-6 text-stone-600">
              After submission, CivicGuard opens a professional incident report
              with risk level, harm category, confidence estimate, checklist, and
              reviewer next steps.
            </p>
          </section>
        </aside>
      </div>
    </div>
  );
}
