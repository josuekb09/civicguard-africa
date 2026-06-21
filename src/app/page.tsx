import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  ClipboardCheck,
  FilePlus2,
  FlaskConical,
  Gauge,
  Languages,
  Scale,
  ShieldAlert,
  UsersRound,
} from "lucide-react";
import { ValueCard } from "@/components/value-card";

const values = [
  {
    title: "Submit suspicious election content",
    description:
      "Capture suspicious civic claims with source, country, language, platform, urgency, and election context.",
    icon: FilePlus2,
  },
  {
    title: "Generate transparent triage report",
    description:
      "Use deterministic mock scoring to assign potential risk, harm category, confidence, checklist, and reviewer next steps.",
    icon: Scale,
  },
  {
    title: "Support human/community review",
    description:
      "Move incidents into a reviewer queue where local knowledge, evidence, and safety judgment shape the next action.",
    icon: UsersRound,
  },
  {
    title: "Monitor trends and evaluate model safety",
    description:
      "Track civic risk patterns on the dashboard and use the Benchmark Lab to evaluate multilingual AI safety behavior.",
    icon: BarChart3,
  },
];

const workflowSteps = [
  {
    title: "Submit suspicious content",
    description:
      "A journalist, student, civic-tech team, or community verifier records the claim and context.",
    icon: FilePlus2,
  },
  {
    title: "AI-assisted risk triage",
    description:
      "The local mock engine scores risk using urgency and civic-harm keywords.",
    icon: Gauge,
  },
  {
    title: "Human evidence review",
    description:
      "Reviewers preserve evidence, verify source context, and decide what needs escalation.",
    icon: ClipboardCheck,
  },
  {
    title: "Dashboard and benchmark insights",
    description:
      "Teams monitor patterns and test model behavior across languages and harm categories.",
    icon: BarChart3,
  },
];

const differentiators = [
  {
    title: "Full civic workflow",
    description:
      "It combines monitoring, triage, human review, dashboarding, and benchmarking.",
    icon: BarChart3,
  },
  {
    title: "Africa-specific context",
    description:
      "It is designed for African election contexts and multilingual/code-switched language.",
    icon: Languages,
  },
  {
    title: "Human-centered safety",
    description:
      "It does not claim automatic truth detection; it supports human reviewers with structure, prioritisation, and next steps.",
    icon: Scale,
  },
  {
    title: "Reusable evidence layer",
    description:
      "It produces reusable exports for researchers, journalists, and civic-tech teams.",
    icon: FlaskConical,
  },
];

const judgeDemoSteps = [
  "Open Submit.",
  "Click Load demo election case.",
  "Generate the triage report.",
  "Review risk, category, checklist, and safety disclaimer.",
  "Open Community to see the case in the review queue.",
  "Open Dashboard to see updated metrics.",
  "Open Benchmark Lab to see the reusable AI safety evaluation layer.",
];

export default function Home() {
  return (
    <>
      <section
        data-testid="home-hero"
        className="relative isolate overflow-hidden bg-[#113f36]"
      >
        <Image
          src="/hero-civicguard-africa.png"
          alt="African civic-tech election monitoring room with journalists reviewing evidence."
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#10251f]/95 via-[#10251f]/76 to-[#10251f]/25" />
        <div className="relative mx-auto flex min-h-[calc(100svh-8rem)] max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="max-w-2xl self-center text-white">
            <p className="text-sm font-semibold uppercase text-[#f2c14e]">
              Civic risk triage for election periods
            </p>
            <h1 className="mt-5 text-4xl font-semibold sm:text-6xl">
              CivicGuard Africa
            </h1>
            <p className="mt-6 text-lg leading-8 text-stone-100">
              AI-assisted election disinformation triage and multilingual
              safety benchmarking for African contexts.
            </p>
            <p className="mt-4 text-base leading-7 text-stone-200">
              CivicGuard Africa is a civic AI safety tool and evaluation
              framework for structured incident triage, human review workflows,
              civic risk monitoring, and benchmark-driven model safety analysis.
            </p>
            <div className="mt-8">
              <p className="text-sm font-semibold uppercase text-[#f2c14e]">
                Demo mode
              </p>
              <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/submit"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#f2c14e] px-5 text-sm font-semibold text-[#17231f] transition hover:bg-[#ffd56b]"
                >
                  Start demo flow
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
                <Link
                  href="/benchmark-lab"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/35 px-5 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  <FlaskConical aria-hidden="true" className="size-4" />
                  View benchmark
                </Link>
                <Link
                  href="/dashboard"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white/35 px-5 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  <BarChart3 aria-hidden="true" className="size-4" />
                  Open dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f4f7f4] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase text-[#c35b3c]">
              What CivicGuard does
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-[#17231f]">
              A working tool and evaluation framework, not just a landing page
            </h2>
            <p className="mt-4 text-base leading-7 text-stone-600">
              The MVP demonstrates how a civic team could move from intake to
              evidence review, risk monitoring, and reusable AI safety
              benchmarking while keeping the system local and explainable.
            </p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {values.map((value) => (
              <ValueCard key={value.title} {...value} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase text-[#c35b3c]">
              What makes CivicGuard different
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-[#17231f]">
              Built as both a monitoring tool and an AI safety benchmark
            </h2>
            <p className="mt-4 text-base leading-7 text-stone-600">
              The MVP is intentionally simple, but it connects the parts judges
              need to see: a working incident flow, human review, dashboard
              signals, and reusable evaluation data.
            </p>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {differentiators.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.title}
                  className="rounded-lg border border-stone-200 bg-[#f8faf7] p-5 shadow-sm"
                >
                  <span className="flex size-11 items-center justify-center rounded-lg bg-[#e8f2ee] text-[#113f36]">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <h3 className="mt-4 font-semibold text-[#17231f]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-stone-600">
                    {item.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase text-[#c35b3c]">
              Why this matters in African elections
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-[#17231f]">
              Disinformation moves across languages faster than verification
              capacity can scale
            </h2>
            <p className="mt-4 text-base leading-7 text-stone-600">
              AI-generated disinformation can spread faster than verification
              teams, especially across local languages, low-resource contexts,
              informal messaging channels, and high-pressure election periods.
              Election risks are especially sensitive in African contexts, where
              local languages and code-switched communication can expose
              weaknesses in English-centered AI safety systems. The problem is
              not just whether a claim is false; it is whether the right people
              can spot the civic risk quickly enough to respond responsibly.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <article className="rounded-lg border border-stone-200 bg-[#f8faf7] p-5">
              <Languages aria-hidden="true" className="size-6 text-[#116149]" />
              <h3 className="mt-4 font-semibold text-[#17231f]">
                Local-language pressure
              </h3>
              <p className="mt-2 text-sm leading-6 text-stone-600">
                Claims can shift between English, French, Swahili, isiXhosa,
                isiZulu, Afrikaans, and code-switched community speech.
              </p>
            </article>
            <article className="rounded-lg border border-stone-200 bg-[#fff8ea] p-5">
              <ShieldAlert aria-hidden="true" className="size-6 text-[#9a6700]" />
              <h3 className="mt-4 font-semibold text-[#17231f]">
                Harm-first triage
              </h3>
              <p className="mt-2 text-sm leading-6 text-stone-600">
                Reviewers need to see voter suppression, intimidation,
                impersonation, false results, and media manipulation signals
                before they become larger civic risks.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="bg-[#f4f7f4] px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase text-[#c35b3c]">
                How CivicGuard works
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-[#17231f]">
                A practical workflow for civic verification teams
              </h2>
            </div>
            <Link
              href="/submit"
              className="inline-flex h-11 w-fit items-center gap-2 rounded-lg bg-[#113f36] px-4 text-sm font-semibold text-white transition hover:bg-[#0d3029]"
            >
              Start workflow
              <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-4">
            {workflowSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <article
                  key={step.title}
                  className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex size-11 items-center justify-center rounded-lg bg-[#e8f2ee] text-[#113f36]">
                      <Icon aria-hidden="true" className="size-5" />
                    </span>
                    <span className="text-sm font-semibold text-stone-400">
                      Step {index + 1}
                    </span>
                  </div>
                  <h3 className="mt-5 font-semibold text-[#17231f]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-stone-600">
                    {step.description}
                  </p>
                </article>
              );
            })}
          </div>

          <div
            data-testid="judge-demo-flow"
            className="mt-8 rounded-lg border border-stone-200 bg-white p-6 shadow-sm"
          >
            <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
              <div>
                <p className="text-sm font-semibold uppercase text-[#c35b3c]">
                  Judge demo flow
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-[#17231f]">
                  A seven-step walkthrough for the final presentation
                </h2>
                <p className="mt-3 text-sm leading-6 text-stone-600">
                  Use this sequence to show the full product loop from intake
                  to evaluation without leaving the local MVP.
                </p>
              </div>
              <ol className="grid gap-3 md:grid-cols-2">
                {judgeDemoSteps.map((step, index) => (
                  <li
                    key={step}
                    className="flex gap-3 rounded-lg border border-stone-200 bg-[#f8faf7] p-4 text-sm leading-6 text-stone-700"
                  >
                    <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#113f36] text-xs font-semibold text-white">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          <div className="mt-8 rounded-lg border border-[#f0d9b5] bg-[#fff8ea] p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-3xl text-sm leading-6 text-stone-800">
                CivicGuard does not determine truth automatically. It supports human verification by prioritising and structuring suspicious civic content.
              </p>
              <Link
                href="/benchmark-lab"
                className="inline-flex h-10 w-fit items-center gap-2 rounded-lg border border-[#d9a73b] px-3 text-sm font-semibold text-[#6f4a00] transition hover:bg-[#ffe9aa]"
              >
                <FlaskConical aria-hidden="true" className="size-4" />
                Benchmark Lab
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
