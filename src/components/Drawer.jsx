// Generic slide-in drawer shell, used for both the packet-pages viewer and the report.
export default function Drawer({ title, subtitle, onClose, children }) {
  return (
    <>
      <div className="scrim" onClick={onClose} />
      <div className="drawer">
        <div className="drawer-top">
          <div>
            <h3>{title}</h3>
            {subtitle && <p>{subtitle}</p>}
          </div>
          <button className="btn ghost" onClick={onClose}>Close</button>
        </div>
        <div className="drawer-body">{children}</div>
      </div>
    </>
  );
}
