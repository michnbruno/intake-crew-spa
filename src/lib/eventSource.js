// Event-source abstraction: the UI asks for "the events for this run" and gets
// a subscribe/stop handle back, with no idea whether those events were replayed
// from a recorded script or streamed live off Web PubSub. Today only the recorded
// player exists (8.4 scope); Step 8.5 adds a live implementation with the same
// shape and swaps it in behind createRunEventSource — Tracker, Report, and the
// console never change.
//
// Contract: createRunEventSource(personaId) returns { start(onEvent, onDone), stop() }.
// onEvent(event) fires once per event, in order, matching the backend's RunEvent
// shape. onDone() fires once after the last event.

import { RECORDED_RUNS } from "../data/recordedRuns.js";

export function createRunEventSource(personaId) {
  const script = RECORDED_RUNS[personaId];
  let timers = [];
  let stopped = false;

  function start(onEvent, onDone) {
    if (!script) { onDone && onDone(); return; }
    let elapsed = 0;
    script.events.forEach(([delay, event]) => {
      elapsed += delay;
      const t = setTimeout(() => {
        if (stopped) return;
        onEvent(event);
      }, elapsed);
      timers.push(t);
    });
    const doneTimer = setTimeout(() => { if (!stopped) onDone && onDone(); }, elapsed + 50);
    timers.push(doneTimer);
  }

  function stop() {
    stopped = true;
    timers.forEach(clearTimeout);
    timers = [];
  }

  return { start, stop, runId: script ? script.runId : null, ref: script ? script.ref : null };
}
