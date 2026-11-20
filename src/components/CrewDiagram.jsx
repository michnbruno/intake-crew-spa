// "The crew" diagram, embedded live (not a static image) so it reflows on mobile the same
// way the retiled artifact version does — wide cards stacked top to bottom, collapsing to a
// vertical layout per card on narrow screens. Content matches the standalone architecture
// write-up's "3. The crew" section.
const CREW = [
  {
    id: "triage",
    name: "Triage",
    persona: "Cap & clipboard",
    tone: "de-triage",
    resp: 'Classifies every attachment — including the open-ended "anything else" upload with no expected type.',
    tools: ["classify_attachment"],
    tier: "Smaller"
  },
  {
    id: "extractor",
    name: "Extractor",
    persona: "Glasses & hammer",
    tone: "de-extractor",
    resp: "Pulls structured fields from attachments; marks low-confidence values; re-reads when needed.",
    tools: ["extract_id", "extract_insurance_card", "extract_outside_rx", "reread_at_higher_detail"],
    tier: "Smaller"
  },
  {
    id: "validator",
    name: "Validator",
    persona: "Magnifying glass",
    tone: "de-validator",
    resp: "Checks the packet against practice policy, resolves conflicts, and decides the outcome — where paths diverge most.",
    tools: ["cross_check_fields", "lookup_existing_patient", "check_eligibility", "file search (policy)"],
    tier: "Stronger"
  },
  {
    id: "summary",
    name: "Summary",
    persona: "Megaphone",
    tone: "de-summary",
    resp: "Drafts the front-desk report and any outbound request — pure reasoning over the run's accumulated context.",
    tools: null,
    tier: "Smaller"
  }
];

export default function CrewDiagram() {
  return (
    <div className="diagram-embed">
      {CREW.map(c => (
        <div key={c.id} className={`de-card ${c.tone}`}>
          <div className="de-id">
            <div><span className="de-dot"></span><b>{c.name}</b></div>
            <span>{c.persona}</span>
          </div>
          <div className="de-body">
            <div className="de-resp">
              <div className="de-lbl">Responsibility</div>
              {c.resp}
            </div>
            <div className="de-meta">
              <div className="de-lbl">{c.tools && c.tools.length > 1 ? "Tools" : "Tool"}</div>
              {c.tools ? <ul>{c.tools.map(t => <li key={t}>{t}</li>)}</ul> : "None — no external tool call"}
              <div className="de-lbl" style={{ marginTop: 10 }}>Model tier</div>
              {c.tier}
            </div>
          </div>
        </div>
      ))}
      <div className="de-note">
        <b>Deliberately not agents:</b> receiving the packet, persisting results, enforcing the
        daily cap, sending notifications, and the eligibility service itself.
      </div>
    </div>
  );
}
