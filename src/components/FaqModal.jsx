// Short-answer popup for a featured question: quick to read, plus the Microsoft Learn
// reference for the underlying service. (The deeper "How this was built" page is still
// reachable from the nav — just not linked from here, for now.)
export default function FaqModal({ item, onClose }) {
  if (!item) return null;
  return (
    <>
      <div className="scrim" onClick={onClose} />
      <div className="faqmodal" role="dialog" aria-modal="true" aria-label={item.q}>
        <button className="faqmodal-close" aria-label="Close" onClick={onClose}>✕</button>
        <p className="faqmodal-tag">{item.topic}</p>
        <h4>{item.q}</h4>
        <p className="faqmodal-a">{item.a}</p>
        {item.learnUrl && (
          <div className="faqmodal-links">
            <a className="faqmodal-learn" href={item.learnUrl} target="_blank" rel="noreferrer">
              Microsoft Learn — {item.learnLabel} ↗
            </a>
          </div>
        )}
      </div>
    </>
  );
}
