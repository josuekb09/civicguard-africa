# CivicGuard Africa

AI-assisted election disinformation triage and multilingual safety benchmarking for African contexts.

GitHub repository: [https://github.com/josuekb09/civicguard-africa](https://github.com/josuekb09/civicguard-africa)  
Deployed demo: [https://civic-guard-africa.vercel.app](https://civic-guard-africa.vercel.app/)

## Submission Framing

CivicGuard Africa is a civic AI safety tool and evaluation framework for African election disinformation risks.

This project targets the Global South AI Safety Hackathon Africa track through:

- Monitoring & Tooling: a working prototype for suspicious election-content intake, deterministic triage, community review, and civic risk monitoring.
- Evaluation & Benchmarking: a multilingual African election safety Benchmark Lab with safe prompt summaries, scoring labels, charts, and exportable datasets.

The web app is the demo interface. The full submission also includes a research-style report, methodology, demo script, judge Q&A, and submission plan in the `docs/` folder.

## Problem Statement

Election disinformation can spread faster than verification teams can respond. In African contexts, suspicious claims often move through WhatsApp groups, screenshots, voice notes, local languages, and code-switched community speech during high-pressure election periods.

AI-generated or AI-amplified content can create risks around voter suppression, fake results, candidate impersonation, identity targeting, procedural misinformation, intimidation, synthetic media claims, and false public-service information.

English-only AI safety checks are not enough for this environment.

## Solution

CivicGuard Africa helps users:

- Submit suspicious election-related content.
- Generate a transparent deterministic triage report.
- Simulate human/community review workflows.
- Monitor civic risk patterns on a dashboard.
- Evaluate AI safety behavior through a multilingual Benchmark Lab.
- Export incident and benchmark data for future research.

The MVP does not use Supabase, authentication, paid APIs, or external AI calls. It is local, mock-data driven, and explainable.

## Why African Context Matters

African election information ecosystems are multilingual, mobile-first, and highly local. Civic risk can depend on local languages, code-switching, platform norms, institutional capacity, and election timing.

CivicGuard makes those contexts visible in both the monitoring workflow and the benchmark dataset.

## Key Features

- Home page with hackathon framing, demo buttons, and judge demo flow.
- Submit Incident form with a safe demo case loader.
- Deterministic triage logic based on urgency and civic-risk keywords.
- Structured Incident Report with risk level, harm category, confidence estimate, checklist, recommended action, reviewer next steps, and safety disclaimer.
- localStorage persistence for submitted incidents, review status, and reviewer notes.
- Community Review queue with filters, status updates, and notes.
- Dashboard with metrics, Recharts visualizations, high-risk table, JSON export, and reset demo data.
- Benchmark Lab with dataset summaries, rubric, charts, readable table, JSON/CSV export, methodology, and safety boundaries.
- About page explaining target users, MVP scope, hackathon alignment, roadmap, and ethics.

## Demo Flow

1. Open the Home page.
2. Click `Start demo flow`.
3. On Submit, click `Load demo election case`.
4. Click `Generate triage report`.
5. Review the Incident Report risk level, harm category, confidence estimate, checklist, recommended action, reviewer next steps, and safety disclaimer.
6. Open Community to see the submitted case in the review queue.
7. Update review status or reviewer notes.
8. Open Dashboard to see metrics and charts include the submitted incident.
9. Export incidents as JSON if needed.
10. Open Benchmark Lab to show the AI safety evaluation layer.
11. Export benchmark data as JSON or CSV.

## Benchmark Lab Methodology

The Benchmark Lab tests whether AI systems respond safely in African civic and multilingual election contexts.

Benchmark items are safe, non-operational prompt summaries. Each item includes:

- ID
- Language
- Country context
- Harm category
- Prompt summary
- Risk scenario
- Expected safe behavior
- Model response label
- Severity
- Notes

Coverage includes South Africa, Kenya, Nigeria, DRC, and Tanzania, with English, French, Swahili, isiXhosa, isiZulu, Afrikaans, Hausa / English code-switched, and Swahili / English code-switched examples.

Scoring labels:

- `safe refusal`
- `safe completion`
- `partial compliance`
- `unsafe compliance`
- `needs review`

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Recharts
- lucide-react
- localStorage for MVP persistence
- Mock seeded data

## Run Locally

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

Quality checks:

```bash
npm run lint
npm run build
```

## Project Structure

```text
src/
  app/
    about/
    benchmark-lab/
    community/
    dashboard/
    incidents/[id]/
    submit/
    triage-result/
  components/
  data/
    benchmarkData.ts
    mock-data.ts
    mockData.ts
  lib/
    storage.ts
    triage.ts
    utils.ts
  types/
    index.ts
docs/
  report.md
  methodology.md
  demo-script.md
  demo-presentation.txt
  judge-q-and-a.md
  final-submission-checklist.md
  screenshots-needed.md
  report-checklist.md
  submission-plan.md
```

## Final Submission Artifacts

- [Research report](docs/report.md)
- [Methodology](docs/methodology.md)
- [Demo script](docs/demo-script.md)
- [Judge Q&A](docs/judge-q-and-a.md)
- [Final submission checklist](docs/final-submission-checklist.md)
- [Screenshots needed](docs/screenshots-needed.md)

## Submission Documents

- [Research report](docs/report.md)
- [Methodology](docs/methodology.md)
- [Demo script](docs/demo-script.md)
- [Demo presentation notes](docs/demo-presentation.txt)
- [Judge Q&A](docs/judge-q-and-a.md)
- [Report checklist](docs/report-checklist.md)
- [Submission plan](docs/submission-plan.md)

## Safety And Ethics

CivicGuard does not determine truth automatically. It supports human verification by prioritising and structuring suspicious civic content.

The MVP avoids real political parties, real candidates, targeted real locations, paid APIs, and operational instructions for manipulation. Human reviewers remain responsible for factual verification, escalation decisions, source handling, and conflict-sensitive judgment.

## Limitations

- Data is stored in browser localStorage, so it is local to one browser profile.
- Triage is deterministic and keyword-based, not an AI model.
- The benchmark dataset is small and uses safe summaries only.
- There is no Supabase database yet.
- There is no authentication or role management yet.
- There is no real external AI model API evaluation yet.
- There is no real evidence upload or partner workflow yet.
- Prototype results are not statistically significant or field validated.

## Future Roadmap

- Supabase-backed shared incident database.
- Authentication and role-based reviewer workflows.
- Evidence upload and source preservation tools.
- Partner integrations with fact-checkers, election observers, journalists, and civic-tech organisations.
- Optional AI API integration for assisted classification and multilingual summarization.
- Expanded benchmark coverage for more African languages and election contexts.
- Evaluation reports comparing model behavior across language, harm category, and severity.
