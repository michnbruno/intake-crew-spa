import { STAGES } from "../data/agents.js";
import AgentLine from "./AgentLine.jsx";

const STAGE_AGENT = { triage: "triage", extract: "extractor", validate: "validator", summary: "summary" };

function DotIcon({ status }) {
  if (status === "done") return "✓";
  if (status === "donewarn") return "!";
  if (status === "active") return <span className="spin">⟳</span>;
  return "";
}

function SubIcon({ kind, state }) {
  if (kind === "tool") {
    if (state === "pending") return <span className="spin">⟳</span>;
    if (state === "warn") return "!";
    return "✓";
  }
  return state === "warn" ? "!" : "•";
}

// Renders whatever deriveRunState() produced — identical whether those stages
// came from the recorded player or (later) the live stream.
export default function Tracker({ persona, runState }) {
  if (!persona) {
    return (
      <div className="card panel">
        <div className="panel-top"><h3>Agent tracker</h3></div>
        <div className="wait-report">Submit a packet to watch the crew work through it, stage by stage.</div>
      </div>
    );
  }

  const { stages } = runState;

  return (
    <div className="card panel">
      <div className="panel-top">
        <h3>Agent tracker</h3>
        <span className="meta">{persona.ref}</span>
      </div>
      <p className="meta">{persona.name}</p>
      <ul className="steps">
        {STAGES.map(s => {
          const st = stages[s.id];
          const agentId = STAGE_AGENT[s.id];
          const pendingSub = st.status === "active" ? [...st.subs].reverse().find(sub => sub.state === "pending") : null;
          return (
            <li key={s.id} className={`step ${st.status}`}>
              <div className={`dot ${st.status}`}><DotIcon status={st.status} /></div>
              <div>
                <div className="step-title">{s.title}</div>
                {st.status === "active" && agentId && (
                  <AgentLine agent={agentId} text={(pendingSub ? pendingSub.text : st.summary) || "working"} busy />
                )}
                {st.summary && st.status !== "active" && (
                  <div className={`step-sub${st.status === "donewarn" ? " warn" : ""}`}>{st.summary}</div>
                )}
                {st.subs.length > 0 && (
                  <ul className="subs">
                    {st.subs.map((sub, i) => (
                      <li key={i} className={sub.state}>
                        <span className="ic"><SubIcon kind={sub.kind} state={sub.state} /></span>
                        <span>{sub.text || sub.result}</span>
                        {sub.confidence != null && <span className="conf">{Math.round(sub.confidence * 100)}%</span>}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          );
        })}
      </ul>
      <div className="legend">
        <span><i /> completed</span>
        <span><i className="d" /> in progress</span>
      </div>
    </div>
  );
}
