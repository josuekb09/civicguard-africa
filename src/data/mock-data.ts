import { triageIncident } from "@/lib/triage";
import type { Incident, IncidentInput } from "@/types";

const mockInputs: Array<
  IncidentInput &
    Pick<Incident, "id" | "submittedAt" | "reviewStatus" | "reviewerNotes">
> = [
  {
    id: "za-isixhosa-voting-date",
    title: "Code-switched post claims the voting date moved in Eastern Cape",
    country: "South Africa",
    language: "isiXhosa / English code-switched",
    platform: "WhatsApp",
    contentType: "text",
    sourceUrl: "",
    description:
      "A forwarded message says the voting date for several rural wards moved to a later day and tells people not to queue today.",
    electionContext: "Municipal by-election voter information period",
    urgency: "high",
    submittedAt: "2026-06-18T07:45:00.000Z",
    reviewStatus: "needs evidence",
    reviewerNotes:
      "Needs official schedule check and a local-language reviewer before escalation.",
  },
  {
    id: "za-afrikaans-ballot-rumor",
    title: "Afrikaans Facebook post questions ballot validity without source",
    country: "South Africa",
    language: "Afrikaans",
    platform: "Facebook",
    contentType: "image",
    sourceUrl: "https://example.org/safe-demo/za-ballot-rumor",
    description:
      "A screenshot claims a ballot design is invalid and asks voters to reject ballot papers at polling stations.",
    electionContext: "Voter education week",
    urgency: "medium",
    submittedAt: "2026-06-17T16:10:00.000Z",
    reviewStatus: "pending",
    reviewerNotes:
      "Likely procedural confusion. Compare with official voter education materials.",
  },
  {
    id: "ke-swahili-fake-results",
    title: "Swahili TikTok clip shares fake results before official release",
    country: "Kenya",
    language: "Swahili",
    platform: "TikTok",
    contentType: "video",
    sourceUrl: "https://example.org/safe-demo/ke-results-clip",
    description:
      "A short clip says fake results show a placeholder candidate has already won before counting is complete.",
    electionContext: "County tallying period",
    urgency: "high",
    submittedAt: "2026-06-17T11:25:00.000Z",
    reviewStatus: "likely misleading",
    reviewerNotes:
      "High spread potential. Confirm official tally status and avoid repeating numbers in public notes.",
  },
  {
    id: "ng-commission-impersonation",
    title: "Telegram channel impersonates an election commission help desk",
    country: "Nigeria",
    language: "English",
    platform: "Telegram",
    contentType: "mixed",
    sourceUrl: "https://example.org/safe-demo/ng-commission-channel",
    description:
      "A channel using commission-style branding claims polling station locations changed and asks voters to follow a private link.",
    electionContext: "Polling day logistics",
    urgency: "critical",
    submittedAt: "2026-06-16T05:35:00.000Z",
    reviewStatus: "needs evidence",
    reviewerNotes:
      "Potential impersonation and voter suppression. Escalate for source preservation.",
  },
  {
    id: "ng-hausa-boycott-voice-note",
    title: "Hausa voice note urges a boycott after a procedural rumor",
    country: "Nigeria",
    language: "Hausa / English code-switched",
    platform: "WhatsApp",
    contentType: "audio",
    sourceUrl: "",
    description:
      "A voice note says the election commission cancelled several ballot batches and urges listeners to boycott the poll.",
    electionContext: "State assembly election morning",
    urgency: "high",
    submittedAt: "2026-06-16T04:50:00.000Z",
    reviewStatus: "pending",
    reviewerNotes:
      "Needs transcription, translation, and official commission cross-check.",
  },
  {
    id: "drc-french-ethnic-targeting",
    title: "French Facebook post targets voters by ethnic group",
    country: "DRC",
    language: "French",
    platform: "Facebook",
    contentType: "text",
    sourceUrl: "https://example.org/safe-demo/drc-identity-post",
    description:
      "The post claims an ethnic group should be kept away from polling stations and frames them as outsiders.",
    electionContext: "Provincial assembly campaign period",
    urgency: "critical",
    submittedAt: "2026-06-15T20:10:00.000Z",
    reviewStatus: "needs evidence",
    reviewerNotes:
      "Treat as conflict-sensitive. Document without amplifying identity-targeting language.",
  },
  {
    id: "tz-swahili-deepfake-audio",
    title: "Swahili audio clip alleged to be a deepfake concession message",
    country: "Tanzania",
    language: "Swahili",
    platform: "WhatsApp",
    contentType: "audio",
    sourceUrl: "",
    description:
      "A circulated clip claims a placeholder candidate conceded through a voice note; submitters suspect deepfake audio.",
    electionContext: "Campaign final week",
    urgency: "medium",
    submittedAt: "2026-06-15T13:15:00.000Z",
    reviewStatus: "inconclusive",
    reviewerNotes:
      "Needs earliest-source tracing and comparison with verified public statements.",
  },
  {
    id: "tz-english-violence-rumor",
    title: "English post falsely reports violence near a counting centre",
    country: "Tanzania",
    language: "English",
    platform: "X",
    contentType: "link",
    sourceUrl: "https://example.org/safe-demo/tz-counting-rumor",
    description:
      "A link summary claims violence has stopped counting at a centre, but early reviewers have not found corroborating reports.",
    electionContext: "Results verification period",
    urgency: "medium",
    submittedAt: "2026-06-14T18:40:00.000Z",
    reviewStatus: "inconclusive",
    reviewerNotes:
      "Monitor credible local reports and avoid publishing unverified location details.",
  },
  {
    id: "ke-code-switched-polling-station",
    title: "Code-switched WhatsApp message says a polling station relocated",
    country: "Kenya",
    language: "Swahili / English code-switched",
    platform: "WhatsApp",
    contentType: "text",
    sourceUrl: "",
    description:
      "The message mixes Swahili and English to claim a polling station has moved and tells voters to wait for a private update.",
    electionContext: "Polling morning in a peri-urban ward",
    urgency: "high",
    submittedAt: "2026-06-14T06:20:00.000Z",
    reviewStatus: "verified false",
    reviewerNotes:
      "Reviewers found official polling station information unchanged; preserve evidence trail.",
  },
  {
    id: "drc-french-authentic-commission-update",
    title: "French commission update about ballot handling appears authentic",
    country: "DRC",
    language: "French",
    platform: "Radio transcript",
    contentType: "link",
    sourceUrl: "https://example.org/safe-demo/drc-commission-update",
    description:
      "A shared transcript summarizes an election commission update about ballot handling and appears to match official public guidance.",
    electionContext: "Voter education period",
    urgency: "low",
    submittedAt: "2026-06-13T09:30:00.000Z",
    reviewStatus: "verified authentic",
    reviewerNotes:
      "Likely authentic. Keep in dataset as a useful contrast case for reviewers.",
  },
];

export const mockIncidents: Incident[] = mockInputs.map((incident) =>
  triageIncident(incident, {
    id: incident.id,
    submittedAt: incident.submittedAt,
    reviewStatus: incident.reviewStatus,
    reviewerNotes: incident.reviewerNotes,
  }),
);
