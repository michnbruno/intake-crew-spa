// Short-answer popup for a featured question: quick to read, then a link into the full FAQ
// page for the deeper treatment, plus the Microsoft Learn reference for the underlying service.
export default function FaqModal({ item, onClose, onReadMore }) {
  if (!item) return null;
  return (
    <>
      <div className="scrim" onClick={onClose} />
      <div className="faqmodal" role="dialog" aria-modal="true" aria-label={item.q}>
        <button className="faqmodal-close" aria-label="Close" onClick={onClose}>✕</button>
        <p className="faqmodal-tag">{item.topic}</p>
        <h4>{item.q}</h4>
        <p className="faqmodal-a">{item.a}</p>
        <div className="faqmodal-links">
          <button className="faqmodal-more" onClick={() => onReadMore(item.id)}>
            Read the full writeup →
          </button>
          {item.learnUrl && (
            <a className="faqmodal-learn" href={item.learnUrl} target="_blank" rel="noreferrer">
              Microsoft Learn — {item.learnLabel} ↗
            </a>
          )}
        </div>
      </div>
    </>
  );
}
