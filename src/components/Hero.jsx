import CrewIcon from "./CrewIcon.jsx";
import { AGENTS } from "../data/agents.js";

const CREW_ORDER = ["triage", "extractor", "validator", "summary"];
const STACK = ["Azure AI Foundry", "Content Understanding", "Document Intelligence", "Azure SQL", ".NET", "React · Vite"];

// Deliberately short: eyebrow + headline + one line + pills (desktop only — see styles.css).
// The crew strip stays pinned in the corner on every breakpoint, including mobile, since it's
// the visual anchor the floating guide callout is positioned around.
export default function Hero({ activeAgent, running }) {
  return (
    <section className="hero">
      <div>
        <p className="eyebrow">Agentic AI · Azure AI Foundry</p>
        <h2>Multi-Agent Pipeline</h2>
        <p className="lede">AI Agents in an Azure Foundry project processing intake forms/documents.</p>
        <div className="pills">
          {STACK.map(item => <span key={item}>{item}</span>)}
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
