// Recorded event timelines, played back through the same EventSource interface the live
// PubSub stream will use (see src/lib/eventSource.js). This is today's stand-in for 9.2's
// library of real recorded runs pulled from RunEvents — same shape, same consumer, so the
// swap later touches only where events come from, never how the UI renders them.
//
// Event shape matches the backend's RunEvent contract: { type, stage, agent?, tool?,
// summary, confidence?, level? }. `type` values: run.started, stage.started,
// stage.completed, tool.called, tool.result, agent.note, outcome, approved.

function E(delay, type, stage, extra) {
  return [delay, Object.assign({ type, stage }, extra || {})];
}

export const RECORDED_RUNS = {
  deborah: {
    runId: "run-8812", ref: "BVE-26-08812",
    events: [
      E(0, "run.started", null, { summary: "Packet BVE-26-08812 received" }),
      E(300, "stage.started", "receive", { summary: "Loading portal data and uploads" }),
      E(500, "stage.completed", "receive", { summary: "Portal data and 3 uploads loaded" }),
      E(300, "stage.started", "triage", { agent: "triage", summary: "Triage started" }),
      E(400, "tool.called", "triage", { agent: "triage", tool: "classify_attachment", args: { file: "IMG_2201.jpg" }, summary: "Classifying IMG_2201.jpg" }),
      E(1000, "tool.result", "triage", { agent: "triage", tool: "classify_attachment", summary: "Vision insurance card", confidence: 0.98, level: "ok" }),
      E(300, "tool.called", "triage", { agent: "triage", tool: "classify_attachment", args: { file: "IMG_2203.jpg" }, summary: "Classifying IMG_2203.jpg" }),
      E(900, "tool.result", "triage", { agent: "triage", tool: "classify_attachment", summary: "Photo ID", confidence: 0.99, level: "ok" }),
      E(300, "tool.called", "triage", { agent: "triage", tool: "classify_attachment", args: { file: "IMG_2210.jpg" }, summary: "Classifying IMG_2210.jpg" }),
      E(1300, "tool.result", "triage", { agent: "triage", tool: "classify_attachment", summary: "Photo of computer monitors", confidence: 0.88, level: "ok" }),
      E(300, "agent.note", "triage", { agent: "triage", summary: "Patient context, filed as a note for the doctor" }),
      E(300, "stage.completed", "triage", { agent: "triage", summary: "3 uploads classified" }),
      E(300, "stage.started", "extract", { agent: "extractor", summary: "Extraction started" }),
      E(300, "tool.called", "extract", { agent: "extractor", tool: "extract_insurance_card", summary: "Reading insurance card" }),
      E(1200, "tool.result", "extract", { agent: "extractor", tool: "extract_insurance_card", summary: "Member ID CSV-5820-1147-02", confidence: 0.97, level: "ok" }),
      E(300, "tool.called", "extract", { agent: "extractor", tool: "extract_id", summary: "Reading photo ID" }),
      E(1100, "tool.result", "extract", { agent: "extractor", tool: "extract_id", summary: "Deborah A Smith, DOB 08/02/1984", confidence: 0.98, level: "ok" }),
      E(300, "stage.completed", "extract", { agent: "extractor", summary: "All fields high confidence" }),
      E(300, "stage.started", "validate", { agent: "validator", summary: "Validation started" }),
      E(300, "tool.called", "validate", { agent: "validator", tool: "cross_check_fields", args: { fields: ["name", "dob", "memberId"] }, summary: "Cross-checking name, DOB, member ID" }),
      E(800, "tool.result", "validate", { agent: "validator", tool: "cross_check_fields", summary: "All fields match", level: "ok" }),
      E(300, "tool.called", "validate", { agent: "validator", tool: "check_eligibility", args: { plan: "ClearSight Vision" }, summary: "Checking eligibility with ClearSight" }),
      E(900, "tool.result", "validate", { agent: "validator", tool: "check_eligibility", summary: "Eligible, exam copay $10", level: "ok" }),
      E(300, "stage.completed", "validate", { agent: "validator", summary: "All checks passed" }),
      E(300, "stage.started", "summary", { agent: "summary", summary: "Drafting front-desk summary" }),
      E(1500, "stage.completed", "summary", { agent: "summary", summary: "Packet complete" }),
      E(200, "outcome", null, { code: "ready", label: "Ready for approval", level: "ok", summary: "Outcome: ready for approval" }),
      E(200, "stage.started", "approval", { summary: "Awaiting front desk approval" })
    ]
  },
  harold: {
    runId: "run-8841", ref: "BVE-26-08841",
    events: [
      E(0, "run.started", null, { summary: "Packet BVE-26-08841 received" }),
      E(300, "stage.started", "receive", { summary: "Loading portal data and uploads" }),
      E(600, "stage.completed", "receive", { summary: "Portal data and 3 uploads loaded" }),
      E(300, "stage.started", "triage", { agent: "triage", summary: "Triage started" }),
      E(400, "tool.called", "triage", { agent: "triage", tool: "classify_attachment", args: { file: "IMG_4471.jpg" }, summary: "Classifying IMG_4471.jpg" }),
      E(1100, "tool.result", "triage", { agent: "triage", tool: "classify_attachment", summary: "Vision insurance card", confidence: 0.97, level: "ok" }),
      E(300, "tool.called", "triage", { agent: "triage", tool: "classify_attachment", args: { file: "IMG_4473.jpg" }, summary: "Classifying IMG_4473.jpg" }),
      E(1000, "tool.result", "triage", { agent: "triage", tool: "classify_attachment", summary: "Photo ID", confidence: 0.98, level: "ok" }),
      E(300, "tool.called", "triage", { agent: "triage", tool: "classify_attachment", args: { file: "lakeside_rx_scan.pdf" }, summary: "Classifying lakeside_rx_scan.pdf" }),
      E(1600, "tool.result", "triage", { agent: "triage", tool: "classify_attachment", summary: "Outside prescription, handwritten", confidence: 0.91, level: "ok" }),
      E(300, "stage.completed", "triage", { agent: "triage", summary: "3 uploads classified" }),
      E(300, "stage.started", "extract", { agent: "extractor", summary: "Extraction started" }),
      E(300, "tool.called", "extract", { agent: "extractor", tool: "extract_insurance_card", summary: "Reading insurance card" }),
      E(1300, "tool.result", "extract", { agent: "extractor", tool: "extract_insurance_card", summary: "Member ID CSV-4471-2290-18", confidence: 0.96, level: "ok" }),
      E(300, "tool.called", "extract", { agent: "extractor", tool: "extract_id", summary: "Reading photo ID" }),
      E(1100, "tool.result", "extract", { agent: "extractor", tool: "extract_id", summary: "Harold J Hanlon, DOB 04/17/1958", confidence: 0.97, level: "ok" }),
      E(300, "tool.called", "extract", { agent: "extractor", tool: "extract_outside_rx", summary: "Reading handwritten prescription" }),
      E(2200, "tool.result", "extract", { agent: "extractor", tool: "extract_outside_rx", summary: "Right sphere unclear, reads -2.25", confidence: 0.41, level: "warn" }),
      E(500, "tool.called", "extract", { agent: "extractor", tool: "reread_at_higher_detail", args: { page: 7, field: "OD sphere" }, summary: "Re-reading page 7 at higher detail" }),
      E(2400, "tool.result", "extract", { agent: "extractor", tool: "reread_at_higher_detail", summary: "Still unclear: -2.25 or -2.75", confidence: 0.58, level: "warn" }),
      E(400, "agent.note", "extract", { agent: "extractor", summary: "Right sphere marked for staff verification", level: "warn" }),
      E(300, "stage.completed", "extract", { agent: "extractor", summary: "1 field needs verification", level: "warn" }),
      E(300, "stage.started", "validate", { agent: "validator", summary: "Validation started" }),
      E(400, "tool.called", "validate", { agent: "validator", tool: "cross_check_fields", args: { fields: ["name", "dob"] }, summary: "Cross-checking name and DOB" }),
      E(900, "tool.result", "validate", { agent: "validator", tool: "cross_check_fields", summary: "Match; ID adds middle initial J", level: "ok" }),
      E(300, "agent.note", "validate", { agent: "validator", summary: "Middle initial difference is minor, no action" }),
      E(400, "tool.called", "validate", { agent: "validator", tool: "file_search", args: { query: "expired outside prescription" }, summary: "Searching practice policy" }),
      E(1500, "tool.result", "validate", { agent: "validator", tool: "file_search", summary: "Policy 4.2: expired outside Rx is reference only", level: "ok" }),
      E(300, "agent.note", "validate", { agent: "validator", summary: "Rx expired 3/11/24; noted, not blocking a new exam" }),
      E(400, "tool.called", "validate", { agent: "validator", tool: "check_eligibility", args: { plan: "ClearSight Vision" }, summary: "Checking eligibility with ClearSight" }),
      E(2000, "tool.result", "validate", { agent: "validator", tool: "check_eligibility", summary: "Pending, payer asked to check back", level: "warn" }),
      E(300, "agent.note", "validate", { agent: "validator", summary: "Waiting on the payer before deciding" }),
      E(3000, "tool.called", "validate", { agent: "validator", tool: "check_eligibility", args: { plan: "ClearSight Vision", attempt: 2 }, summary: "Checking eligibility again" }),
      E(1500, "tool.result", "validate", { agent: "validator", tool: "check_eligibility", summary: "Eligible, exam copay $10", level: "ok" }),
      E(400, "stage.completed", "validate", { agent: "validator", summary: "Ready, 1 field to verify", level: "warn" }),
      E(300, "stage.started", "summary", { agent: "summary", summary: "Drafting front-desk summary" }),
      E(1800, "stage.completed", "summary", { agent: "summary", summary: "Verify right sphere with patient at check-in" }),
      E(200, "outcome", null, { code: "ready_with_notes", label: "Ready, verify 1 field", level: "warn", summary: "Outcome: ready, 1 field to verify" }),
      E(200, "stage.started", "approval", { summary: "Awaiting front desk approval" })
    ]
  }
};
