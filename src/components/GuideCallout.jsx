import { useRef, useState } from "react";

const TEXT = 'Click "Submit packet" to see the agents process intake forms and documents.';

// Floating, draggable guidance card — not a scrim/modal, doesn't block the page. Starts
// centered near the top (clear of the crew strip pinned in the corner); the visitor can drag
// it anywhere, or to the side, while they look around. It never auto-dismisses — only the
// explicit close button does, per Mike's call: the agents are the wow, this is just a nudge.
export default function GuideCallout({ onClose }) {
  const [pos, setPos] = useState(null); // null = default centered CSS position (not dragged yet)
  const cardRef = useRef(null);
  const drag = useRef(null); // { startX, startY, originLeft, originTop } while a drag is active

  function onPointerDown(e) {
    if (e.target.closest(".guide-close")) return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    drag.current = { startX: e.clientX, startY: e.clientY, originLeft: rect.left, originTop: rect.top };
    card.setPointerCapture(e.pointerId);
    card.classList.add("dragging");
  }

  function onPointerMove(e) {
    if (!drag.current) return;
    const card = cardRef.current;
    const { startX, startY, originLeft, originTop } = drag.current;
    const w = card.offsetWidth, h = card.offsetHeight;
    const left = Math.max(8, Math.min(window.innerWidth - w - 8, originLeft + (e.clientX - startX)));
    const top = Math.max(8, Math.min(window.innerHeight - h - 8, originTop + (e.clientY - startY)));
    setPos({ left, top });
  }

  function endDrag() {
    drag.current = null;
    cardRef.current?.classList.remove("dragging");
  }

  return (
    <div
      ref={cardRef}
      className="guide"
      style={pos ? { left: pos.left, top: pos.top, transform: "none" } : undefined}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      <button className="guide-close" aria-label="Close guide" onClick={onClose}>✕</button>
      <p>{TEXT}</p>
    </div>
  );
}
