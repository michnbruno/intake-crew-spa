import { FEATURED } from "../data/faq.js";

// Curated questions with a short, punchy answer possible — not every real question about this
// project belongs here, just the ones that read well in two sentences. Deeper ones live on the
// FAQ page, which each chip's modal links out to.
export default function QnaStrip({ onPick }) {
  return (
    <section className="qna">
      <h3>Common questions</h3>
      <div className="qna-row">
        {FEATURED.map(item => (
          <button key={item.id} className="qna-chip" onClick={() => onPick(item)}>
            {item.q}
          </button>
        ))}
      </div>
    </section>
  );
}
