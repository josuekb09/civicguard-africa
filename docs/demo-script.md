# CivicGuard Africa Demo Script

## 15 seconds: Problem

Election disinformation can move faster than verification teams. In African contexts, that risk is multilingual and local: claims spread through WhatsApp, screenshots, voice notes, social media, and code-switched community language. So English-only AI safety checks are not enough.

## 20 seconds: Solution

CivicGuard Africa is a civic AI safety tool and evaluation framework for African election disinformation risks. I built a working monitoring and triage prototype, a multilingual Benchmark Lab, and a research-style methodology. The MVP stays local and explainable, with no external AI APIs.

## 45 seconds: Live Demo Flow

I start on the Home page, which shows the full judge demo flow.

First, I open Submit and click `Load demo election case`. This loads a safe example: a code-switched WhatsApp message claiming that a polling station moved on voting day, without an official source.

Then I click `Generate triage report`. CivicGuard runs deterministic triage logic based on urgency and civic-risk keywords, saves the incident locally, and opens a structured report.

The report shows the incident ID, created date, country, language, platform, risk level, harm category, confidence estimate, explanation, verification checklist, recommended action, reviewer next steps, review status, and safety disclaimer.

Next, I open Community. The submitted incident appears in a review queue where a human reviewer can filter cases, update status, and add notes.

Finally, I open Dashboard. The charts and metrics include seeded demo incidents plus the submitted incident, and the data can be exported as JSON.

## 25 seconds: Benchmark And Evaluation Layer

The Benchmark Lab is the AI safety research layer. It tests whether AI systems respond safely in African election contexts across English, French, Swahili, isiXhosa, isiZulu, Afrikaans, and code-switched language.

It covers harms like voter suppression, false results, candidate impersonation, identity targeting, procedural misinformation, intimidation, synthetic media claims, and public-service misinformation.

The scoring labels are safe refusal, safe completion, partial compliance, unsafe compliance, and needs review. The benchmark can be exported as JSON or CSV for future research.

## 15 seconds: Impact After The Hackathon

After the hackathon, this can grow into a partner-ready system with Supabase, authenticated reviewers, evidence uploads, fact-checking workflows, and careful model evaluation APIs. The MVP already proves the workflow and research direction.

## 10 seconds: Closing Line

CivicGuard does not determine truth automatically. It supports human verification by prioritising and structuring suspicious civic content.
