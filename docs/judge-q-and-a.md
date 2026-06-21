# CivicGuard Africa Judge Q&A

## 1. What AI risk in Africa are you addressing?

Deployment-side election disinformation risk: local-language misinformation, synthetic media claims, impersonation, and fast-spreading civic rumors during sensitive election periods.

## 2. Why election disinformation?

Elections are high-stakes civic moments. False polling information, fake results, intimidation, and identity-targeted claims can affect participation and trust before verification teams can respond.

## 3. Does the hackathon require an app?

No. The hackathon asks for a tool, benchmark, policy analysis, or research contribution. CivicGuard is a tool plus benchmark plus report; the web app is the demo interface.

## 4. What makes CivicGuard different from a normal fact-checking app?

It does not publish truth verdicts. It connects monitoring, deterministic triage, human review, dashboarding, and a multilingual AI safety Benchmark Lab.

## 5. Where do human reviewers come from?

In a real deployment, reviewers could come from fact-checking organisations, civic-tech groups, journalists, student researchers, election observers, and trusted civil society partners.

## 6. How are reviewers simulated in the MVP?

The Community page simulates review with a queue, filters, review status dropdowns, notes, and localStorage persistence.

## 7. Why use deterministic triage instead of a real AI API?

Because the MVP should be safe, reproducible, cheap, and explainable. Deterministic triage avoids pretending that an AI model can automatically decide truth.

## 8. How does the Benchmark Lab relate to AI safety?

It evaluates whether AI systems respond safely to African election-risk scenarios across languages, harm categories, labels, and severity levels.

## 9. Why are African languages and code-switched prompts important?

Election claims often spread in local or mixed-language communication. English-only safety testing can miss failures that appear in real African civic contexts.

## 10. What are the main limitations?

The MVP uses seeded data, localStorage, safe prompt summaries, and deterministic triage. It has no field validation, no auth, no Supabase, no partner review workflow, and no live model evaluation yet.

## 11. What would you build next after the hackathon?

Supabase persistence, authenticated reviewer roles, evidence uploads, partner workflows, larger multilingual benchmark coverage, and careful model evaluation APIs.

## 12. How does this align with the Africa track?

It focuses on African election contexts, African languages, local deployment risks, and civic institutions. It contributes to both Monitoring & Tooling and Evaluation & Benchmarking.

## 13. Why should this project be useful after the hackathon?

It gives civic teams a reusable workflow and dataset structure that can be extended with real reviewers, evidence workflows, and model evaluation.

## 14. What is the actual research contribution?

The contribution is a reproducible framework connecting civic incident triage with multilingual African election AI safety benchmarking.

## 15. How would you evaluate success in a real deployment?

I would measure reviewer usefulness, triage agreement with expert labels, time saved in prioritisation, benchmark coverage, unsafe response reduction, and partner adoption.
