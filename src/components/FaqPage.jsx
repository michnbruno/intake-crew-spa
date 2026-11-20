import { useEffect, useState } from "react";

const INTRO = "Triage, Extractor, Validator, and Summary are custom-created AI agents that persist in an " +
  "Azure Foundry project, handling the backend orchestration, extraction, and validation for a fictional " +
  "eye-care front desk's intake packets. The sections below cover how it's actually built, topic by topic " +
  "— click a question to expand it.";

// Topic-grouped accordion — collapse/expand in place, no separate detail pane. `initialId`
// (set when a visitor arrives here via "Read the full writeup" from the home-page modal) opens
// that one question and scrolls it into view on mount.
export default function FaqPage({ topics, initialId }) {
  // Independent multi-open accordion: each question tracks its own open/closed state, so
  // expanding one never collapses another. All collapsed by default; a deep link (initialId,
  // arriving via "Read the full writeup" from the home-page modal) opens just that one question.
  const [openIds, setOpenIds] = useState(() => new Set(initialId ? [initialId] : []));

  useEffect(() => {
    if (initialId) {
      document.getElementById(`faq-${initialId}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function toggle(id) {
    setOpenIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  return (
    <div className="faqpage">
      <p className="faqpage-intro">{INTRO}</p>
      {topics.map(topic => (
        <div key={topic.id} className="faq-topic">
          <h4>{topic.title}</h4>
          {topic.questions.map(q => {
            const open = openIds.has(q.id);
            return (
              <div key={q.id} id={`faq-${q.id}`} className={`faq-item${open ? " open" : ""}`}>
                <button className="faq-q" onClick={() => toggle(q.id)} aria-expanded={open}>
                  <span>{q.q}</span>
                  <span className="faq-caret">{open ? "–" : "+"}</span>
                </button>
                {open && (
                  <div className="faq-a">
                    <p>{q.a}</p>
                    {q.learnUrl && (
                      <a className="faqmodal-learn" href={q.learnUrl} target="_blank" rel="noreferrer">
                        Microsoft Learn — {q.learnLabel} ↗
                      </a>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
