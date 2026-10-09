import CrewIcon from "./CrewIcon.jsx";
import { AGENTS } from "../data/agents.js";

const CREW_ORDER = ["triage", "extractor", "validator", "summary"];

// No construction banner, no "preview"/soon framing — just the crew and a live caption.
// The per-agent "is doing X" pill lives in Tracker, right beside the step it's working on.
export default function Hero({ activeAgent, running, captionText, captionLevel }) {
  return (
    <section className="hero">
      <div>
        <h2>Today's intake</h2>
        <p>The crew classifies, extracts, and validates each patient packet before it reaches the front desk.</p>
        <div className={`caption`}>
          <i style={{ background: captionLevel === "warn" ? "var(--warn)" : captionLevel === "ok" ? "var(--ok)" : "var(--lens)" }} />
          <span>{captionText || "Pick a packet below to watch the crew work."}</span>
          {running && <span className="dots"><span>.</span><span>.</span><span>.</span></span>}
        </div>
      </div>
      <div className="strip">
        <h3>The crew</h3>
        <p>Triage · Extractor · Validator · Summary</p>
        <div className={`crewrow${running ? " running" : ""}`}>
          {CREW_ORDER.map(id => (
            <div key={id} className={`pose${activeAgent === id ? " active" : ""}`}>
              <CrewIcon agent={id} color={AGENTS[id].color} size={80} />
              <span>{AGENTS[id].name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
