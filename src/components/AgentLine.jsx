import CrewIcon from "./CrewIcon.jsx";
import { AGENTS } from "../data/agents.js";

// The .agentline pill: a small agent icon + bold name + what it just did. This
// is the "little inline agent" trail that appears under the crew strip while a
// packet is processing — one line per tool call / note, most recent on top.
function lead(text) {
  if (!text) return "";
  return text.charAt(0).toLowerCase() + text.slice(1);
}

export default function AgentLine({ agent, text, busy = false }) {
  const meta = AGENTS[agent];
  if (!meta) return null;
  return (
    <div className="agentline">
      <CrewIcon agent={agent} color={meta.color} size={22} busy={busy} />
      <span><b>{meta.name}</b> is {lead(text)}{busy ? "…" : ""}</span>
    </div>
  );
}
