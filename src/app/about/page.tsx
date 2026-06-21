import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  FlaskConical,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";

const targetUsers = [
  "Journalists covering election claims",
  "Students and civic-tech volunteers",
  "Community verifiers working in local languages",
  "Fact-checking teams and election observers",
  "Civil society organisations monitoring civic risk",
];

const mvpFeatures = [
  "Incident submission and deterministic risk triage",
  "LocalStorage persistence for submitted incidents and reviewer notes",
  "Community review queue with status updates",
  "Risk dashboard with Recharts visual summaries",
  "Benchmark Lab for multilingual election-safety evaluation",
  "Exportable local incident and benchmark datasets",
  "Research documentation for methods, limitations, and submission framing",
];

const nextSteps = [
  "Connect Supabase for shared incident storage and role-based review workflows.",
  "Add authentication for civic partners, newsroom teams, and trusted reviewers.",
  "Integrate AI APIs for assisted classification while keeping human review in control.",
  "Partner with fact-checkers and election observers for localized evidence workflows.",
  "Expand benchmark coverage with more African languages, regions, and reviewer annotations.",
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <SectionHeading
            eyebrow="Project"
            title="CivicGuard Africa"
            description="AI-assisted election disinformation triage and multilingual safety benchmarking for African contexts."
          />
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/submit"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#113f36] px-4 text-sm font-semibold text-white transition hover:bg-[#0d3029]"
            >
              Try the demo
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
            <Link
              href="/benchmark-lab"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-stone-300 bg-white px-4 text-sm font-semibold text-stone-700 transition hover:border-[#116149] hover:text-[#116149]"
            >
              View benchmark
              <FlaskConical aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>

        <section className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase text-[#c35b3c]">
            One-line pitch
          </p>
          <p className="mt-3 text-2xl font-semibold leading-9 text-[#17231f]">
            CivicGuard Africa is a civic AI safety tool and evaluation
            framework for African election disinformation risks.
          </p>
        </section>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-[#17231f]">Problem</h2>
          <p className="mt-3 text-sm leading-6 text-stone-600">
            Election rumors, synthetic media claims, false public-service
            notices, and identity-targeted narratives can move faster than
            verification teams, especially through local-language and
            code-switched channels.
          </p>
        </section>

        <section className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-[#17231f]">Solution</h2>
          <p className="mt-3 text-sm leading-6 text-stone-600">
            CivicGuard provides a structured local workflow for intake,
            explainable triage, community review, trend monitoring, and
            benchmark-driven AI safety evaluation. It is a hackathon MVP and
            research artifact, not a claim to production fact-checking.
          </p>
        </section>
      </div>

      <section className="mt-8 rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <UsersRound
            aria-hidden="true"
            className="mt-1 size-6 shrink-0 text-[#116149]"
          />
          <div>
            <h2 className="text-lg font-semibold text-[#17231f]">Target users</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {targetUsers.map((user) => (
                <div
                  key={user}
                  className="rounded-lg border border-stone-200 bg-[#f8faf7] p-4 text-sm text-stone-700"
                >
                  {user}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-[#17231f]">
          Hackathon alignment
        </h2>
        <p className="mt-3 text-sm leading-6 text-stone-600">
          CivicGuard Africa targets the Africa track through two contribution
          types: Monitoring & Tooling, by providing a working civic-risk triage
          prototype, and Evaluation & Benchmarking, by providing a multilingual
          African election safety benchmark with exportable data and a written
          methodology.
        </p>
      </section>

      <section className="mt-8 rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-[#17231f]">
          Why it matters for Africa
        </h2>
        <p className="mt-3 text-sm leading-6 text-stone-600">
          African election information ecosystems are multilingual, mobile-first,
          and highly local. Civic-risk tools must account for local languages,
          community context, low-resource verification settings, and the reality
          that English-only AI safety testing can miss important harm patterns.
        </p>
      </section>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-[#17231f]">
            What was built in the MVP
          </h2>
          <ul className="mt-4 space-y-3">
            {mvpFeatures.map((feature) => (
              <li key={feature} className="flex gap-3 text-sm leading-6 text-stone-700">
                <CheckCircle2
                  aria-hidden="true"
                  className="mt-0.5 size-5 shrink-0 text-emerald-700"
                />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-[#17231f]">
            What comes next after the hackathon
          </h2>
          <ul className="mt-4 space-y-3">
            {nextSteps.map((step) => (
              <li key={step} className="flex gap-3 text-sm leading-6 text-stone-700">
                <ArrowRight
                  aria-hidden="true"
                  className="mt-0.5 size-5 shrink-0 text-[#116149]"
                />
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mt-8 rounded-lg border border-[#f0d9b5] bg-[#fff8ea] p-6">
        <div className="flex items-start gap-3">
          <ShieldCheck
            aria-hidden="true"
            className="mt-1 size-6 shrink-0 text-[#9a6700]"
          />
          <div>
            <h2 className="text-lg font-semibold text-[#17231f]">
              Ethical safety note
            </h2>
            <p className="mt-3 text-sm leading-6 text-stone-700">
              CivicGuard does not determine truth automatically. It supports human verification by prioritising and structuring suspicious civic content. The MVP avoids real parties, real candidates, paid
              APIs, and operational manipulation examples.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
