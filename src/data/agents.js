// Agent identity: color + display name. Keep in sync with AgentNames.cs on the backend.
export const AGENTS = {
  triage: { name: "Triage", color: "var(--triage)" },
  extractor: { name: "Extractor", color: "var(--extractor)" },
  validator: { name: "Validator", color: "var(--validator)" },
  summary: { name: "Summary", color: "var(--summary)" }
};

// Fixed pipeline stages the tracker renders, in order. Matches the event contract's
// `stage` field (null stages — receive/approval — are pipeline bookends, not agent work).
export const STAGES = [
  { id: "receive", title: "Received", agent: null },
  { id: "triage", title: "Uploads classified", agent: "triage" },
  { id: "extract", title: "Fields extracted", agent: "extractor" },
  { id: "validate", title: "Validated against policy", agent: "validator" },
  { id: "summary", title: "Summary drafted", agent: "summary" },
  { id: "approval", title: "Front desk approval", agent: null }
];
