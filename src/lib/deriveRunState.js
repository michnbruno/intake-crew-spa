import { STAGES } from "../data/agents.js";

// Folds a flat list of events into per-stage status + the running tool/note log.
// This is the single place that interprets the event stream, so Tracker, Caption,
// and Report all stay in sync no matter where the events came from.
export function deriveRunState(events) {
  const stages = {};
  STAGES.forEach(s => { stages[s.id] = { status: "wait", summary: "", subs: [] }; });
  let outcome = null, tools = 0, approved = false, active = null, lastText = null;

  events.forEach(ev => {
    const st = ev.stage ? stages[ev.stage] : null;
    if (ev.type === "stage.started" && st) { st.status = "active"; st.summary = ev.summary; active = ev.stage; lastText = ev.summary; }
    if (ev.type === "stage.completed" && st) { st.status = ev.level === "warn" ? "donewarn" : "done"; st.summary = ev.summary; if (active === ev.stage) active = null; }
    if (ev.type === "tool.called" && st) { tools++; st.subs.push({ kind: "tool", tool: ev.tool, text: ev.summary, state: "pending" }); lastText = ev.summary; }
    if (ev.type === "tool.result" && st) {
      for (let i = st.subs.length - 1; i >= 0; i--) {
        const s = st.subs[i];
        if (s.kind === "tool" && s.tool === ev.tool && s.state === "pending") {
          s.state = ev.level || "ok"; s.result = ev.summary; s.confidence = ev.confidence; break;
        }
      }
    }
    if (ev.type === "agent.note" && st) { st.subs.push({ kind: "note", text: ev.summary, state: ev.level === "warn" ? "warn" : "note" }); lastText = ev.summary; }
    if (ev.type === "outcome") outcome = ev;
    if (ev.type === "approved") { approved = true; stages.approval.status = "done"; stages.approval.summary = "Approved by front desk"; active = null; }
  });

  if (outcome && !approved) { stages.approval.status = "active"; stages.approval.summary = "Review the crew's summary"; active = "approval"; }
  return { stages, outcome, tools, approved, active, lastText };
}
