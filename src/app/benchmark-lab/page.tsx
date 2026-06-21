import {
  AlertTriangle,
  Flag,
  FlaskConical,
  Languages,
  Layers3,
  ListChecks,
  Scale,
  ShieldCheck,
} from "lucide-react";
import { BenchmarkCharts } from "@/components/benchmark-charts";
import { BenchmarkExportButtons } from "@/components/benchmark-export-buttons";
import { MetricCard } from "@/components/metric-card";
import { SectionHeading } from "@/components/section-heading";
import { StatusBadge } from "@/components/status-badge";
import { benchmarkPrompts, benchmarkRubric } from "@/data/benchmarkData";
import type { BenchmarkPrompt, ChartDatum } from "@/types";

function groupBy<K extends keyof BenchmarkPrompt>(key: K): ChartDatum[] {
  const counts = benchmarkPrompts.reduce<Record<string, number>>((acc, item) => {
    const value = String(item[key]);
    acc[value] = (acc[value] ?? 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value || a.name.localeCompare(b.name));
}

const countriesCovered = new Set(
  benchmarkPrompts.map((prompt) => prompt.countryContext.split(",")[0]),
).size;
const languagesCovered = new Set(
  benchmarkPrompts.map((prompt) => prompt.language),
).size;
const harmCategoriesCovered = new Set(
  benchmarkPrompts.map((prompt) => prompt.harmCategory),
).size;
const unsafeOrPartial = benchmarkPrompts.filter((prompt) =>
  ["partial compliance", "unsafe compliance"].includes(
    prompt.modelResponseLabel,
  ),
).length;
const averageSeverity = (
  benchmarkPrompts.reduce((sum, prompt) => sum + prompt.severity, 0) /
  benchmarkPrompts.length
).toFixed(1);

const harmCategoryDescriptions = [
  "Voter suppression: false voting dates, polling station rumors, or turnout-discouraging claims.",
  "False results: premature or fabricated outcomes before official release.",
  "Candidate impersonation: content pretending to speak as a placeholder candidate or official channel.",
  "Ethnic or religious targeting: identity-based claims that can escalate civic tension.",
  "Procedural misinformation: misleading ballot, registration, or commission-process claims.",
  "Intimidation or violence: threatening or panic-inducing election claims.",
  "Synthetic media claim: suspected deepfake, voice clone, or fabricated media context.",
  "Public-service misinformation: misleading transport, safety, or public notice claims around voting.",
];

function severityClass(severity: number) {
  if (severity >= 5) {
    return "border-red-200 bg-red-50 text-red-700";
  }

  if (severity >= 4) {
    return "border-orange-200 bg-orange-50 text-orange-700";
  }

  if (severity >= 3) {
    return "border-amber-200 bg-amber-50 text-amber-700";
  }

  return "border-emerald-200 bg-emerald-50 text-emerald-700";
}

export default function BenchmarkLabPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div data-testid="benchmark-summary">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Benchmark lab"
            title="African election AI safety benchmark"
            description="A local evaluation artifact for testing whether AI systems respond safely in African civic, election, and multilingual contexts."
          />
          <div className="max-w-xl">
            <BenchmarkExportButtons items={benchmarkPrompts} />
            <p className="mt-3 text-sm leading-6 text-stone-600">
              Exports can support research reports, civic monitoring handoffs,
              and future model evaluation work.
            </p>
          </div>
        </div>

        <section className="mt-8 rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
          <div className="flex items-start gap-3">
            <FlaskConical
              aria-hidden="true"
              className="mt-1 size-6 shrink-0 text-[#116149]"
          />
            <div>
              <h2 className="text-xl font-semibold text-[#17231f]">
                Why English-only AI safety is not enough
              </h2>
              <p className="mt-3 text-sm leading-6 text-stone-600">
                Election disinformation often travels through local languages,
                code-switched speech, screenshots, voice notes, and community
                idioms. A model can refuse a harmful English prompt yet mishandle
                French, Swahili, isiXhosa, isiZulu, Afrikaans, Hausa / English,
                or Swahili / English code-switched versions. CivicGuard tests
                whether safety behavior survives that linguistic and civic context
                shift.
              </p>
            </div>
          </div>
        </section>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-6">
          <MetricCard
            label="Total prompts"
            value={benchmarkPrompts.length}
            helper="Safe summaries in the local dataset"
            icon={ListChecks}
          />
          <MetricCard
            label="Countries"
            value={countriesCovered}
            helper="South Africa, Kenya, Nigeria, DRC, Tanzania"
            icon={Flag}
          />
          <MetricCard
            label="Languages"
            value={languagesCovered}
            helper="Includes local and code-switched prompts"
            icon={Languages}
          />
          <MetricCard
            label="Harm categories"
            value={harmCategoriesCovered}
            helper="Election safety taxonomy coverage"
            icon={Layers3}
          />
          <MetricCard
            label="Unsafe or partial"
            value={unsafeOrPartial}
            helper="Labels needing mitigation or review"
            icon={AlertTriangle}
          />
          <MetricCard
            label="Average severity"
            value={averageSeverity}
            helper="Severity score from 1 to 5"
            icon={Scale}
          />
        </div>
      </div>

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <article className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-[#17231f]">
            What CivicGuard tests
          </h2>
          <p className="mt-3 text-sm leading-6 text-stone-600">
            The benchmark checks whether an AI system refuses harmful election
            manipulation, safely completes benign civic information requests,
            avoids identity-targeted escalation, and knows when multilingual or
            context-sensitive prompts need human review.
          </p>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-stone-700">
            <li>- Harm recognition across civic-risk categories.</li>
            <li>- Safe refusal for manipulative election prompts.</li>
            <li>- Safe completion for neutral verification workflows.</li>
            <li>- Robustness across African languages and code-switching.</li>
          </ul>
        </article>

        <article className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-[#17231f]">
            Languages and contexts covered
          </h2>
          <p className="mt-3 text-sm leading-6 text-stone-600">
            The current local dataset covers South Africa, Kenya, Nigeria, DRC,
            and Tanzania with English, French, Swahili, isiXhosa, isiZulu,
            Afrikaans, Hausa / English code-switched, and Swahili / English
            code-switched prompts.
          </p>
          <p className="mt-4 text-sm leading-6 text-stone-600">
            These examples are safe summaries only. They avoid real candidates,
            real political parties, real locations that could be targeted, and
            operational instructions for manipulation.
          </p>
        </article>
      </section>

      <section className="mt-8 rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-[#17231f]">Harm categories</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {harmCategoryDescriptions.map((description) => (
            <div
              key={description}
              className="rounded-lg border border-stone-200 bg-[#f8faf7] p-4 text-sm leading-6 text-stone-700"
            >
              {description}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-[#17231f]">Scoring rubric</h2>
        <p className="mt-3 text-sm leading-6 text-stone-600">
          The benchmark checks whether AI systems respond safely in African civic
          and multilingual contexts. Labels are qualitative, and severity
          indicates the civic harm risk of the prompt scenario from 1 to 5.
        </p>
        <div className="mt-5 grid gap-4 lg:grid-cols-5">
          {benchmarkRubric.map((item) => (
            <article
              key={item.label}
              className="rounded-lg border border-stone-200 bg-[#f8faf7] p-4"
            >
              <StatusBadge status={item.label} />
              <p className="mt-3 text-sm font-semibold text-[#17231f]">
                Rubric score {item.score}
              </p>
              <p className="mt-2 text-sm leading-6 text-stone-600">
                {item.description}
              </p>
              <p className="mt-3 text-xs leading-5 text-stone-500">
                {item.judgeSignal}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-lg border border-[#f0d9b5] bg-[#fff8ea] p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase text-[#9a6700]">
              Top benchmark insight
            </p>
            <p className="mt-2 text-base font-semibold text-[#17231f]">
              {unsafeOrPartial} of {benchmarkPrompts.length} sample responses
              are labeled unsafe or partial, showing why multilingual civic
              safety evaluation needs more than generic refusal testing.
            </p>
          </div>
          <div className="rounded-lg border border-[#f0d9b5] bg-white px-4 py-3 text-sm text-stone-700">
            Average severity:{" "}
            <span className="font-semibold text-[#17231f]">
              {averageSeverity}/5
            </span>
          </div>
        </div>
      </section>

      <div className="mt-8">
        <BenchmarkCharts
          byLanguage={groupBy("language")}
          byHarmCategory={groupBy("harmCategory")}
          byResponseLabel={groupBy("modelResponseLabel")}
          bySeverity={groupBy("severity")}
        />
      </div>

      <section className="mt-8 rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-[#17231f]">
          How judges should read this benchmark
        </h2>
        <p className="mt-3 text-sm leading-6 text-stone-600">
          Each row is a safe summary of an election-risk prompt, not an
          operational manipulation instruction. Judges should look for three
          signals: whether the prompt represents an Africa-specific civic harm,
          whether the expected behavior keeps people safe, and whether the model
          response label shows a useful or risky response pattern.
        </p>
      </section>

      <section className="mt-8 overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm">
        <div className="border-b border-stone-200 p-5">
          <h2 className="text-lg font-semibold text-[#17231f]">
            Sample benchmark results
          </h2>
          <p className="mt-2 text-sm leading-6 text-stone-600">
            These are example labels for the MVP dataset. In a live evaluation,
            reviewers would compare actual model outputs against the expected
            safe behavior and rubric.
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-[1560px] table-fixed divide-y divide-stone-200">
            <colgroup>
              <col className="w-28" />
              <col className="w-36" />
              <col className="w-44" />
              <col className="w-44" />
              <col className="w-64" />
              <col className="w-72" />
              <col className="w-72" />
              <col className="w-44" />
              <col className="w-28" />
              <col className="w-72" />
            </colgroup>
            <thead className="bg-[#edf3ef]">
              <tr>
                {[
                  "ID",
                  "Language",
                  "Country/context",
                  "Harm category",
                  "Prompt summary",
                  "Scenario",
                  "Expected safe behavior",
                  "Label",
                  "Severity",
                  "Notes",
                ].map((heading) => (
                  <th
                    key={heading}
                    scope="col"
                    className="px-5 py-3 text-left text-xs font-semibold uppercase text-stone-600"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200">
              {benchmarkPrompts.map((prompt) => (
                <tr key={prompt.id} className="align-top hover:bg-[#f8faf7]">
                  <td className="break-words px-5 py-4 text-sm font-medium text-[#17231f]">
                    {prompt.id}
                  </td>
                  <td className="break-words px-5 py-4 text-sm text-stone-700">
                    {prompt.language}
                  </td>
                  <td className="break-words px-5 py-4 text-sm text-stone-700">
                    {prompt.countryContext}
                  </td>
                  <td className="break-words px-5 py-4 text-sm capitalize text-stone-700">
                    {prompt.harmCategory}
                  </td>
                  <td className="break-words px-5 py-4 text-sm leading-6 text-stone-700">
                    {prompt.promptSummary}
                  </td>
                  <td className="break-words px-5 py-4 text-sm leading-6 text-stone-700">
                    {prompt.riskScenario}
                  </td>
                  <td className="break-words px-5 py-4 text-sm leading-6 text-stone-700">
                    {prompt.expectedSafeBehavior}
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={prompt.modelResponseLabel} />
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex min-w-14 justify-center rounded-full border px-2.5 py-1 text-xs font-semibold ${severityClass(
                        prompt.severity,
                      )}`}
                    >
                      {prompt.severity}/5
                    </span>
                  </td>
                  <td className="break-words px-5 py-4 text-sm leading-6 text-stone-700">
                    {prompt.notes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-3">
          <ShieldCheck
            aria-hidden="true"
            className="mt-1 size-6 shrink-0 text-[#116149]"
          />
          <div>
            <h2 className="text-lg font-semibold text-[#17231f]">
              Hackathon methodology
            </h2>
            <ul className="mt-3 space-y-3 text-sm leading-6 text-stone-600">
              <li>
                - CivicGuard uses a harm taxonomy for African election risks,
                including suppression, false results, impersonation, identity
                targeting, procedural misinformation, intimidation, synthetic
                media, and public-service misinformation.
              </li>
              <li>
                - Incidents are triaged using transparent deterministic logic in
                the MVP so every risk classification can be explained.
              </li>
              <li>
                - Community reviewers remain responsible for truth verification,
                evidence quality, and escalation.
              </li>
              <li>
                - The benchmark tests safety behavior across language and
                context, not just generic English refusal behavior.
              </li>
              <li>
                - The system is designed to be extended with real AI APIs,
                fact-checking partners, and Supabase after the hackathon.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-lg border border-[#f0d9b5] bg-[#fff8ea] p-6">
        <h2 className="text-lg font-semibold text-[#17231f]">
          Limitations and safety boundaries
        </h2>
        <p className="mt-3 text-sm leading-6 text-stone-700">
          This benchmark is a local MVP artifact. It does not prove that any AI
          system is safe, and it does not include real political parties, real
          candidates, or operational instructions for manipulation.{" "}
          {"CivicGuard does not determine truth automatically. It supports human verification by prioritising and structuring suspicious civic content."}
        </p>
      </section>
    </div>
  );
}
