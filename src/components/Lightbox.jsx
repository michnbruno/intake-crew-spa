import { useEffect } from "react";

// Full-screen diagram viewer. Same interaction as the RAG Query project's Lightbox: Escape
// or a click anywhere outside the content closes it, scroll is locked on the body while open
// (a long portrait diagram can be taller than the viewport, so the overlay itself scrolls).
// `children`, when passed, is a live-rendered diagram (see Diagrams.jsx's component registry)
// shown instead of the static `diagram.src` image.
export default function Lightbox({ diagram, onClose, children }) {
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={diagram.title} onClick={onClose}>
      <button className="lightbox-close" aria-label="Close diagram" onClick={onClose}>&#10005;</button>
      <div className={`lightbox-inner${children ? " wide" : ""}`} onClick={e => e.stopPropagation()}>
        <p className="lightbox-title">{diagram.title}</p>
        {children ? (
          <div className="lightbox-embed">{children}</div>
        ) : (
          <img src={diagram.src} alt={diagram.title} className="lightbox-image" />
        )}
        <p className="lightbox-caption">{diagram.caption}</p>
      </div>
    </div>
  );
}
