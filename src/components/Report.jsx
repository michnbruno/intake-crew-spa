// Front-desk summary, shown once a run reaches an outcome. Content comes from
// REPORTS (stand-in until 9.2 wires real Summary-agent output per run).
export default function Report({ report, approved, onApprove }) {
  if (!report) {
    return <div className="wait-report">The summary will appear here once the crew finishes.</div>;
  }

  return (
    <div className="report">
      <h4>Patient</h4>
      <p>{report.name}<br /><span style={{ color: "var(--muted)" }}>{report.line}</span></p>

      <div className={`banner ${report.level}`}>{report.banner}</div>

      <h4>Visit</h4>
      <dl className="kv">
        {report.visit.map(([k, v], i) => <div key={i}><dt>{k}</dt><dd>{v}</dd></div>)}
      </dl>

      <h4>Insurance</h4>
      <dl className="kv">
        {report.insurance.map(([k, v], i) => <div key={i}><dt>{k}</dt><dd>{v}</dd></div>)}
      </dl>

      <h4>Documents</h4>
      <div className="tblwrap">
        <table className="tbl">
          <thead><tr><th>File</th><th>Classified as</th><th>Confidence</th></tr></thead>
          <tbody>
            {report.docs.map(([file, kind, conf], i) => (
              <tr key={i}><td>{file}</td><td>{kind}</td><td className="num">{conf}</td></tr>
            ))}
          </tbody>
        </table>
      </div>

      {report.rx && (
        <>
          <h4>Outside prescription</h4>
          <p style={{ fontSize: 13.5 }}>{report.rx.source}</p>
          <div className="tblwrap">
            <table className="tbl">
              <thead><tr><th>Eye</th><th>Sphere</th><th>Cylinder</th><th>Axis</th><th>Add</th></tr></thead>
              <tbody>
                {report.rx.rows.map(([eye, sph, cyl, axis, add, flagged], i) => (
                  <tr key={i}>
                    <td>{eye}</td>
                    <td className="num">{flagged ? <span className="flag">{sph}</span> : sph}</td>
                    <td className="num">{cyl}</td>
                    <td className="num">{axis}</td>
                    <td className="num">{add}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ fontSize: 12.5, color: "var(--muted)" }}>PD {report.rx.pd}mm</p>
        </>
      )}
      {report.rxNote && <p style={{ fontSize: 13, color: "var(--muted)" }}>{report.rxNote}</p>}

      <h4>History</h4>
      <p style={{ fontSize: 13.5 }}>{report.history}</p>

      {report.actions.length > 0 && (
        <>
          <h4>Needs attention</h4>
          <ul className="actions-list">
            {report.actions.map((a, i) => <li key={i}>{a}</li>)}
          </ul>
        </>
      )}

      {report.doctorNote && (
        <>
          <h4>Note for the doctor</h4>
          <p style={{ fontSize: 13.5 }}>{report.doctorNote}</p>
        </>
      )}

      <div className="approve-bar">
        <p>{approved ? "Approved by front desk." : "Review above, then approve to confirm the patient's spot."}</p>
        <button className="btn primary" disabled={approved} onClick={onApprove}>
          {approved ? "Approved ✓" : "Approve"}
        </button>
      </div>
    </div>
  );
}
