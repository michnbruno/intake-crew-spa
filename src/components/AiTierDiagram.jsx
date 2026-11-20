// "Agents & AI tier — drill-down" diagram, embedded live. Zooms into the one tier from the
// Context/Container diagram that's easiest to misread: a Foundry project, one shared Azure
// AI Services account behind two of its capabilities, and a search index that isn't a
// separate resource at all.
export default function AiTierDiagram() {
  return (
    <div className="diagram-embed">
      <div className="de-card de-neutral">
        <div className="de-id">
          <div><span className="de-dot"></span><b>Foundry project</b></div>
          <span>Where the crew lives</span>
        </div>
        <div className="de-body">
          <div className="de-resp">
            Hosts the four persisted agents — Triage, Extractor, Validator, Summary — and their threads.
          </div>
          <div className="de-meta">
            Reached via its own project-scoped endpoint, under the <b>Foundry User</b> role — a
            different surface than Document Intelligence and Content Understanding below, even
            though it's the same underlying resource.
          </div>
        </div>
      </div>

      <div className="de-card de-neutral">
        <div className="de-id">
          <div><span className="de-dot"></span><b>Azure AI Services</b></div>
          <span>One resource, two capabilities</span>
        </div>
        <div className="de-body">
          <div className="de-pairwrap">
            <div className="de-pairbox">
              <b>Document Intelligence</b>
              <span>Structured extraction — insurance cards, photo IDs, intake forms</span>
            </div>
            <div className="de-pairbox">
              <b>Content Understanding</b>
              <span>Open-ended extraction — the "anything else" attachment, with no expected type</span>
            </div>
            <div className="de-pairnote">
              Same Azure resource as the Foundry project's endpoint above, reached through its
              own scope (<b>Cognitive Services User</b>). No single attachment is ever routed
              through both.
            </div>
          </div>
        </div>
      </div>

      <div className="de-card de-neutral">
        <div className="de-id">
          <div><span className="de-dot"></span><b>Policy file search</b></div>
          <span>Not a separate resource</span>
        </div>
        <div className="de-body">
          <div className="de-resp">
            A vector store built into the Foundry project — a capability, not a standalone
            Azure service with its own endpoint.
          </div>
          <div className="de-meta">
            Used only by <b>Validator</b>, to check a packet's facts against the practice's
            uploaded policy documents.
          </div>
        </div>
      </div>
    </div>
  );
}
