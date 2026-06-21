import type {
  HarmCategory,
  Incident,
  IncidentInput,
  ReviewStatus,
  RiskLevel,
  Urgency,
} from "@/types";

const urgencyScores: Record<Urgency, number> = {
  low: 1,
  medium: 2,
  high: 4,
  critical: 6,
};

const categoryKeywords: Record<HarmCategory, string[]> = {
  "voter suppression": [
    "voting date",
    "election date",
    "do not vote",
    "stay home",
    "polling station closed",
    "polling station",
    "curfew",
    "boycott",
    "no voting",
    "deadline changed",
    "voter card invalid",
  ],
  "incitement or intimidation": [
    "attack",
    "violence",
    "kill",
    "burn",
    "riot",
    "threat",
    "weapon",
    "clash",
  ],
  "candidate impersonation": [
    "fake account",
    "impersonation",
    "impersonating",
    "impersonation account",
    "candidate said",
    "voice note from",
    "deepfake",
  ],
  "false results": [
    "winner declared",
    "final results",
    "rigged",
    "stolen election",
    "counting stopped",
    "fake results",
    "ballot stuffed",
    "ballot",
  ],
  "procedural misinformation": [
    "registration",
    "polling station",
    "ballot",
    "biometric",
    "voter card",
    "deadline",
    "electoral commission",
    "election commission",
    "commission",
    "voting date",
  ],
  "ethnic or religious targeting": [
    "tribe",
    "ethnic",
    "ethnic group",
    "religion",
    "religious",
    "christian",
    "muslim",
    "foreigner",
    "outsider",
  ],
  "media manipulation": [
    "edited video",
    "deepfake",
    "ai generated",
    "synthetic",
    "fake photo",
    "old video",
    "voice clone",
    "doctored",
  ],
  other: [],
};

function normalizeIncidentText(input: IncidentInput) {
  return [
    input.title,
    input.country,
    input.language,
    input.platform,
    input.contentType,
    input.description,
    input.electionContext,
    input.sourceUrl,
  ]
    .join(" ")
    .toLowerCase();
}

function scoreRisk(score: number, urgency: Urgency): RiskLevel {
  if (score >= 10 || urgency === "critical") {
    return "critical";
  }

  if (score >= 7 || urgency === "high") {
    return "high";
  }

  if (score >= 4) {
    return "medium";
  }

  return "low";
}

function getConfidenceEstimate(
  score: number,
  matchedKeywordCount: number,
  input: IncidentInput,
) {
  const sourceSignal = input.sourceUrl.trim() ? 6 : 0;
  const multimediaSignal = ["image", "video", "audio", "mixed"].includes(
    input.contentType,
  )
    ? 4
    : 0;
  const confidence =
    42 + Math.min(score * 5, 34) + Math.min(matchedKeywordCount * 4, 12) +
    sourceSignal +
    multimediaSignal;

  return Math.min(confidence, 92);
}

function getCategory(input: IncidentInput) {
  const text = normalizeIncidentText(input);
  const matches = Object.entries(categoryKeywords)
    .filter(([category]) => category !== "other")
    .map(([category, keywords]) => {
      const matchedKeywords = keywords.filter((keyword) =>
        text.includes(keyword),
      );

      return {
        category: category as HarmCategory,
        matchedKeywords,
        score: matchedKeywords.length,
      };
    })
    .sort((a, b) => b.score - a.score);

  return matches[0]?.score
    ? matches[0]
    : { category: "other" as HarmCategory, matchedKeywords: [], score: 0 };
}

function buildEvidenceSignals(
  input: IncidentInput,
  matchedKeywords: string[],
): string[] {
  const signals = [
    `${input.urgency} urgency selected by the submitter`,
    `${input.platform} ${input.contentType} content in ${input.language}`,
  ];

  if (matchedKeywords.length > 0) {
    signals.push(`Keyword signals: ${matchedKeywords.slice(0, 5).join(", ")}`);
  }

  if (!input.sourceUrl.trim()) {
    signals.push("No source URL was provided, so origin tracing is limited");
  }

  if (["audio", "video", "mixed"].includes(input.contentType)) {
    signals.push("Multimedia content may require metadata and reverse-search checks");
  }

  return signals;
}

function buildExplanation(
  input: IncidentInput,
  riskLevel: RiskLevel,
  harmCategory: HarmCategory,
  matchedKeywords: string[],
  score: number,
  confidenceEstimate: number,
) {
  const keywordText =
    matchedKeywords.length > 0
      ? `Matched signals include ${matchedKeywords.slice(0, 4).join(", ")}.`
      : "No high-confidence harm keywords were matched.";

  return `The mock triage engine rated this as ${riskLevel} risk because the submitter marked ${input.urgency} urgency, the content appears in an election context, and the detected harm pattern is ${harmCategory}. ${keywordText} The deterministic score is ${score} with an estimated confidence of ${confidenceEstimate}%, so this should be prioritized for human verification rather than treated as a truth finding.`;
}

function buildChecklist(category: HarmCategory, input: IncidentInput) {
  const checklist = [
    "Capture the original post, timestamp, account or group name, and forwarding path if available.",
    "Preserve screenshots and the source URL without reposting the claim as fact.",
    "Compare the claim with official electoral commission updates and credible local monitors.",
    "Ask a second reviewer with local language and context knowledge to inspect the content.",
  ];

  const categoryChecks: Partial<Record<HarmCategory, string>> = {
    "voter suppression":
      "Confirm polling locations, hours, and voter requirements with official election bodies.",
    "incitement or intimidation":
      "Assess whether the content could trigger immediate harm and escalate through safety channels.",
    "candidate impersonation":
      "Compare the account, voice, imagery, and posting pattern against verified candidate channels.",
    "false results":
      "Check whether official results have been released for the relevant constituency.",
    "procedural misinformation":
      "Verify the procedure against current election rules and public voter education material.",
    "ethnic or religious targeting":
      "Review the language for identity-based targeting and consult local conflict sensitivity guidance.",
    "media manipulation":
      "Run reverse image or video searches and inspect metadata where legally and ethically appropriate.",
  };

  if (categoryChecks[category]) {
    checklist.push(categoryChecks[category]);
  }

  if (!input.sourceUrl.trim()) {
    checklist.push("Ask the submitter for the earliest accessible source or a forwarded copy with context.");
  }

  return checklist;
}

function getRecommendedAction(riskLevel: RiskLevel, category: HarmCategory) {
  if (riskLevel === "critical") {
    return "Escalate immediately to senior editors, trusted election observers, and safety partners before public amplification.";
  }

  if (riskLevel === "high") {
    return "Prioritize evidence gathering and assign a reviewer with country and language context today.";
  }

  if (category === "other" || riskLevel === "low") {
    return "Log the incident, monitor for spread, and request more evidence before dedicating urgent review time.";
  }

  return "Queue for community verification, collect corroborating evidence, and update the review status after a second pass.";
}

function buildReviewerNextChecks(category: HarmCategory, input: IncidentInput) {
  const nextChecks = [
    "Find the earliest visible source and record the first known timestamp.",
    "Check whether credible local monitors or official election bodies have already addressed the claim.",
    "Ask a reviewer fluent in the language or code-switching pattern to inspect tone, idioms, and local references.",
  ];

  const categoryNextChecks: Partial<Record<HarmCategory, string>> = {
    "voter suppression":
      "Verify voting date, polling station details, opening hours, and voter requirements from official public material.",
    "incitement or intimidation":
      "Assess immediate safety risk and avoid repeating threatening phrasing in public notes.",
    "candidate impersonation":
      "Compare the account history, profile metadata, and wording against verified placeholder-candidate channels.",
    "false results":
      "Confirm whether official results have been published for the named area before labeling the claim.",
    "procedural misinformation":
      "Compare the claimed procedure against voter education guidance from the relevant election commission.",
    "ethnic or religious targeting":
      "Review for identity-based targeting and consult conflict-sensitive reporting guidance.",
    "media manipulation":
      "Run reverse media searches and inspect whether the asset appears in older or unrelated contexts.",
  };

  if (categoryNextChecks[category]) {
    nextChecks.push(categoryNextChecks[category]);
  }

  if (!input.sourceUrl.trim()) {
    nextChecks.push("Request a source URL, screenshot, or forwarded copy with surrounding context.");
  }

  return nextChecks;
}

function buildReviewerNotes(
  riskLevel: RiskLevel,
  category: HarmCategory,
  matchedKeywords: string[],
) {
  if (riskLevel === "critical") {
    return "Escalation candidate. Needs a senior reviewer and local context before any public response.";
  }

  if (matchedKeywords.length > 0) {
    return `Initial signals point to ${category}; preserve evidence and verify the claim path before labeling.`;
  }

  return "Low signal so far. Keep in queue and ask submitter for stronger source context.";
}

function baseSlug(title: string) {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 48);

  return slug || "incident";
}

export function triageIncident(
  input: IncidentInput,
  options: {
    id?: string;
    submittedAt?: string;
    reviewStatus?: ReviewStatus;
    reviewerNotes?: string;
  } = {},
): Incident {
  const category = getCategory(input);
  const multimediaBoost = ["audio", "video", "mixed"].includes(input.contentType)
    ? 1
    : 0;
  const platformBoost = /whatsapp|telegram|tiktok/i.test(input.platform) ? 1 : 0;
  const missingSourcePenalty = input.sourceUrl.trim() ? 0 : 1;
  const score =
    urgencyScores[input.urgency] +
    category.score * 2 +
    multimediaBoost +
    platformBoost +
    missingSourcePenalty;
  const riskLevel = scoreRisk(score, input.urgency);
  const confidenceEstimate = getConfidenceEstimate(
    score,
    category.matchedKeywords.length,
    input,
  );

  return {
    ...input,
    id: options.id ?? `${baseSlug(input.title)}-${score}`,
    submittedAt: options.submittedAt ?? new Date().toISOString(),
    riskLevel,
    harmCategory: category.category,
    confidenceEstimate,
    triageExplanation: buildExplanation(
      input,
      riskLevel,
      category.category,
      category.matchedKeywords,
      score,
      confidenceEstimate,
    ),
    verificationChecklist: buildChecklist(category.category, input),
    reviewerNextChecks: buildReviewerNextChecks(category.category, input),
    recommendedNextAction: getRecommendedAction(riskLevel, category.category),
    evidenceSignals: buildEvidenceSignals(input, category.matchedKeywords),
    reviewStatus: options.reviewStatus ?? "pending",
    reviewerNotes:
      options.reviewerNotes ??
      buildReviewerNotes(
        riskLevel,
        category.category,
        category.matchedKeywords,
      ),
  };
}
