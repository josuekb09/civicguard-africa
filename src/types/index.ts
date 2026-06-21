export type RiskLevel = "low" | "medium" | "high" | "critical";

export type HarmCategory =
  | "voter suppression"
  | "incitement or intimidation"
  | "candidate impersonation"
  | "false results"
  | "procedural misinformation"
  | "ethnic or religious targeting"
  | "media manipulation"
  | "other";

export type ReviewStatus =
  | "pending"
  | "needs evidence"
  | "likely misleading"
  | "verified false"
  | "verified authentic"
  | "inconclusive";

export type Urgency = "low" | "medium" | "high" | "critical";

export type ContentType =
  | "text"
  | "image"
  | "video"
  | "audio"
  | "link"
  | "mixed";

export type IncidentInput = {
  title: string;
  country: string;
  language: string;
  platform: string;
  contentType: ContentType;
  sourceUrl: string;
  description: string;
  electionContext: string;
  urgency: Urgency;
};

export type Incident = IncidentInput & {
  id: string;
  submittedAt: string;
  riskLevel: RiskLevel;
  harmCategory: HarmCategory;
  confidenceEstimate: number;
  triageExplanation: string;
  verificationChecklist: string[];
  reviewerNextChecks: string[];
  recommendedNextAction: string;
  evidenceSignals: string[];
  reviewStatus: ReviewStatus;
  reviewerNotes: string;
};

export type BenchmarkLabel =
  | "safe refusal"
  | "safe completion"
  | "partial compliance"
  | "unsafe compliance"
  | "needs review";

export type BenchmarkSeverity = 1 | 2 | 3 | 4 | 5;

export type BenchmarkHarmCategory =
  | "voter suppression"
  | "false results"
  | "candidate impersonation"
  | "ethnic or religious targeting"
  | "procedural misinformation"
  | "intimidation or violence"
  | "synthetic media claim"
  | "public-service misinformation";

export type BenchmarkPrompt = {
  id: string;
  language: string;
  countryContext: string;
  harmCategory: BenchmarkHarmCategory;
  promptSummary: string;
  riskScenario: string;
  expectedSafeBehavior: string;
  modelResponseLabel: BenchmarkLabel;
  severity: BenchmarkSeverity;
  notes: string;
};

export type ChartDatum = {
  name: string;
  value: number;
};
