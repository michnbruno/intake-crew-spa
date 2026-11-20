import { useState } from "react";
import { DIAGRAMS } from "../data/diagrams.js";
import Lightbox from "./Lightbox.jsx";
import CrewDiagram from "./CrewDiagram.jsx";
import AiTierDiagram from "./AiTierDiagram.jsx";

// Diagrams that render as live HTML instead of a static image (so they stay mobile-friendly).
const DIAGRAM_COMPONENTS = {
  "the-crew": CrewDiagram,
  "agents-ai-tier": AiTierDiagram
};

// Lightweight stand-in for a thumbnail image on component-rendered diagrams — a quick-glance
// chip row instead of a screenshot, since there's no static image to show in the card grid.
const CHIP_PREVIEWS = {
  "the-crew": [
    { label: "Triage", color: "var(--triage)" },
    { label: "Extractor", color: "var(--extractor)" },
    { label: "Validator", color: "var(--validator)" },
    { label: "Summary", color: "var(--summary)" }
  ],
  "agents-ai-tier": [
    { label: "Foundry project", color: "var(--faint)" },
    { label: "Azure AI Services", color: "var(--faint)" },
    { label: "Policy file search", color: "var(--faint)" }
  ]
};

function ChipPreview({ id }) {
  return (
    <div className="diagram-card-chips">
      {(CHIP_PREVIEWS[id] || []).map(c => (
        <span key={c.label} className="diagram-chip">
          <i style={{ background: c.color }}></i>{c.label}
        </span>
      ))}
    </div>
  );
}

// "Architecture diagrams" page — same card-grid-then-full-screen pattern as the RAG Query
// project's Architecture page. A diagram with no `src` and no entry in DIAGRAM_COMPONENTS
// (comingSoon: true) renders as a non-interactive placeholder card instead of a broken image.
export default function Diagrams() {
  const [openId, setOpenId] = useState(null);
  const open = DIAGRAMS.find(d => d.id === openId) || null;
  const OpenComponent = open ? DIAGRAM_COMPONENTS[open.id] : null;

  return (
    <>
      <h3 className="view-head">Architecture diagrams</h3>
      <p className="diagrams-intro">
        A closer look at how this is actually built. Tap a diagram to open it full-screen.
      </p>
      <div className="diagrams-grid">
        {DIAGRAMS.map(d => {
          if (d.comingSoon) {
            return (
              <div key={d.id} className="diagram-card coming-soon">
                <p className="diagram-card-title">{d.title}</p>
                <div className="diagram-card-placeholder">Coming soon</div>
                <p className="diagram-card-caption">{d.caption}</p>
              </div>
            );
          }
          const isComponent = !!DIAGRAM_COMPONENTS[d.id];
          return (
            <button key={d.id} className="diagram-card" onClick={() => setOpenId(d.id)}>
              <p className="diagram-card-title">{d.title}</p>
              {isComponent ? (
                <div className="diagram-card-image diagram-card-image-chips">
                  <ChipPreview id={d.id} />
                </div>
              ) : (
                <img src={d.src} alt={d.title} className="diagram-card-image" />
              )}
              <p className="diagram-card-caption">{d.caption}</p>
            </button>
          );
        })}
      </div>
      {open && (
        <Lightbox diagram={open} onClose={() => setOpenId(null)}>
          {OpenComponent && <OpenComponent />}
        </Lightbox>
      )}
    </>
  );
}
