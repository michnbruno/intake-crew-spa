import { SCHEDULE } from "../data/schedule.js";

function Badge({ state, outcome }) {
  if (state === "running") return <span className="badge run">In progress</span>;
  if (state === "done") {
    if (outcome && outcome.level === "warn") return <span className="badge warn">{outcome.label}</span>;
    if (outcome) return <span className="badge ok">{outcome.label}</span>;
  }
  return <span className="badge none">Not started</span>;
}

// Rows for personas without a recorded run (soon:true) are dimmed and have no
// Submit action — honest "not wired up yet," no toast popup, no coming-soon badge.
export default function ScheduleBoard({ runStates, focusId, onSubmit, onViewPackets, onViewReport }) {
  return (
    <div className="card">
      <div className="sched-top">
        <div>
          <h3>Friday, October 2</h3>
          <p>Five patients on the morning schedule.</p>
        </div>
      </div>
      {SCHEDULE.map(p => {
        const rs = runStates[p.id] || { status: "none" };
        const disabled = !!p.soon;
        return (
          <div key={p.id} className={`row${focusId === p.id ? " focus" : ""}${disabled ? " off" : ""}`}>
            <div className="time">{p.time}</div>
            <div className="who">
              <b>{p.first} "{p.nick}" {p.last}</b>
              <small>{p.about}</small>
              {p.submitted && <small>Submitted {p.submitted}</small>}
            </div>
            <div className="stat">
              <Badge state={rs.status} outcome={rs.outcome} />
            </div>
            <div className="acts">
              {disabled ? (
                <span className="btn ghost" style={{ cursor: "default" }}>No recording wired up yet</span>
              ) : (
                <>
                  <button
                    className="btn primary"
                    disabled={rs.status === "running"}
                    onClick={() => onSubmit(p.id)}
                  >
                    {rs.status === "none" ? "Submit packet" : "Run again"}
                  </button>
                  <button className="btn" onClick={() => onViewPackets(p.id)}>View packet</button>
                  {rs.status === "done" && (
                    <button className="btn ghost" onClick={() => onViewReport(p.id)}>View report</button>
                  )}
                </>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
