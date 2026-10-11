import CrewIcon from "./CrewIcon.jsx";
import { AGENTS } from "../data/agents.js";

const CREW_ORDER = ["triage", "extractor", "validator", "summary"];

// Mobile-only, home-page-only crew showcase (see App.jsx — rendered just for the schedule
// view) that stacks full-size underneath the header text. On desktop this stays hidden
// (styles.css) since Hero's own corner-pinned crew strip already covers it there. Full
// size everywhere it shows — no shrink/hide rules like the old Pass-3 corner-pinned
// mobile treatment this replaces.
export default function IntakeCrew({ activeAgent, running }) {
  return (
    <section className="crew-mobile">
      <h3>The Intake Crew</h3>
      <p>Triage · Extractor · Validator · Summary</p>
      <div className={`crewrow${running ? " running" : ""}`}>
        {CREW_ORDER.map(id => (
          <div key={id} className={`pose${activeAgent === id ? " active" : ""}`}>
            <CrewIcon agent={id} color={AGENTS[id].color} size={80} />
            <span>{AGENTS[id].name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
