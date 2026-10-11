import CrewIcon from "./CrewIcon.jsx";
import { AGENTS } from "../data/agents.js";

const CREW_ORDER = ["triage", "extractor", "validator", "summary"];
const STACK = ["Azure AI Foundry", "Content Understanding", "Document Intelligence", "Azure SQL", ".NET", "React · Vite"];

// Global header, rendered on every view. Desktop: unchanged two-column layout, crew strip
// pinned top-right on every page — there's plenty of room. Mobile: the "strip-desktop" crew
// column is hidden (styles.css) since it's replaced there by a full-size, home-page-only
// block that stacks under the header text (see IntakeCrew.jsx).
export default function Hero({ activeAgent, running }) {
  return (
    <section className="hero">
      <div>
        <p className="eyebrow">AI · Azure Foundry</p>
        <h2>Multi-Agent Pipeline</h2>
        <p className="lede">AI agents processing intake forms and documents.</p>
        <div className="pills">
          {STACK.map(item => <span key={item}>{item}</span>)}
        </div>
      </div>
      <div className="strip strip-desktop">
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
