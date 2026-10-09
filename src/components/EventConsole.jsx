import { useState } from "react";

function fmtTime(ms) {
  const s = Math.floor(ms / 1000);
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

// Raw event log, same events Tracker/Report consume via deriveRunState — this
// view just lists them as they arrive, click to expand the full payload.
export default function EventConsole({ events }) {
  const [open, setOpen] = useState(new Set());

  function toggle(i) {
    setOpen(prev => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  }

  return (
    <div className="card console">
      <div className="console-top">
        <h3>Event console</h3>
        <p>{events.length} event{events.length === 1 ? "" : "s"}</p>
      </div>
      <div className="log">
        {events.map((ev, i) => (
          <div key={i}>
            <div className="ev" onClick={() => toggle(i)}>
              <span className="t">{fmtTime(ev._t || 0)}</span>
              <span className="ty">{ev.type}</span>
              <span className="a">{ev.agent || ev.stage || ""}</span>
              <span className="ty">{ev.tool || ""}</span>
              <span className="s">{ev.summary}</span>
            </div>
            {open.has(i) && <pre className="json">{JSON.stringify(ev, null, 2)}</pre>}
          </div>
        ))}
      </div>
    </div>
  );
}
