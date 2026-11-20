const STEPS = [
  {
    n: 1,
    title: "Submit a patient packet",
    body: "Go to today's schedule and submit one patient's intake paperwork — photo ID, insurance card, any outside prescription."
  },
  {
    n: 2,
    title: "The agent crew processes it",
    body: "Triage, Extractor, Validator, and Summary work the packet in sequence, live — classifying documents, pulling fields, checking policy."
  },
  {
    n: 3,
    title: "Report and outcome presented",
    body: "A front-desk-ready summary comes back with the outcome and anything that needs a human's sign-off."
  }
];

// Landing page — sits above "Today's schedule" in the nav and is the default view on arrival.
// Frames the demo before dropping a visitor into a live data view: what this is, and the three
// beats of a run (receive -> crew -> outcome), matching the architecture write-up's own shape.
// First click here ("See the agent pipeline demo") hands off to the schedule view, where the
// second click ("Submit packet") actually starts a run.
export default function Home({ onEnterDemo }) {
  return (
    <>
      <h3 className="view-head">Brightview Eye Care Patient Intake</h3>
      <div className="card home-card">
        <p>
          This is a working demo of an AI agent pipeline, built for a fictional eye-care front
          desk. A patient's paperwork comes in, four custom AI agents process it end to end, and
          a front-desk-ready report comes out. Here's the shape of one run:
        </p>
        <div className="home-steps">
          {STEPS.map(s =>
            s.n === 1 ? (
              <button key={s.n} type="button" className="home-step highlight" onClick={onEnterDemo}>
                <span className="home-step-num">{s.n}</span>
                <div>
                  <b>{s.title}</b>
                  <span>{s.body}</span>
                </div>
              </button>
            ) : (
              <div key={s.n} className="home-step">
                <span className="home-step-num">{s.n}</span>
                <div>
                  <b>{s.title}</b>
                  <span>{s.body}</span>
                </div>
              </div>
            )
          )}
        </div>
        <button className="btn primary home-cta" onClick={onEnterDemo}>
          See the agent pipeline demo &rarr;
        </button>
      </div>
    </>
  );
}
