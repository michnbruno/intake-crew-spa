import { useRef } from "react";

// Split layout on desktop (question list + answer pane, docs-site style); stacks on mobile,
// with a tap scrolling the detail pane into view instead of navigating away from the list.
export default function FaqPage({ topics, selectedId, onSelect }) {
  const detailRef = useRef(null);
  const flat = topics.flatMap(t => t.questions.map(q => ({ ...q, topic: t.title })));
  const current = flat.find(q => q.id === selectedId) || flat[0];

  function pick(id) {
    onSelect(id);
    if (window.innerWidth <= 900 && detailRef.current) {
      requestAnimationFrame(() => detailRef.current.scrollIntoView({ behavior: "smooth", block: "start" }));
    }
  }

  return (
    <div className="faqpage">
      <aside className="faq-list">
        {topics.map(topic => (
          <div key={topic.id} className="faq-group">
            <h4>{topic.title}</h4>
            <ul>
              {topic.questions.map(q => (
                <li
                  key={q.id}
                  className={current && current.id === q.id ? "active" : ""}
                  onClick={() => pick(q.id)}
                >
                  {q.q}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </aside>
      <div className="faq-detail" ref={detailRef}>
        {current && (
          <>
            <p className="faq-detail-tag">{current.topic}</p>
            <h3>{current.q}</h3>
            <p className="faq-detail-a">{current.a}</p>
            {current.learnUrl && (
              <a className="faqmodal-learn" href={current.learnUrl} target="_blank" rel="noreferrer">
                Microsoft Learn — {current.learnLabel} ↗
              </a>
            )}
          </>
        )}
      </div>
    </div>
  );
}
