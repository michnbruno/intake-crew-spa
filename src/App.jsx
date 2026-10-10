import { useEffect, useRef, useState } from "react";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import ScheduleBoard from "./components/ScheduleBoard.jsx";
import Tracker from "./components/Tracker.jsx";
import Report from "./components/Report.jsx";
import EventConsole from "./components/EventConsole.jsx";
import Drawer from "./components/Drawer.jsx";
import PacketPages from "./components/PacketPages.jsx";
import { SCHEDULE } from "./data/schedule.js";
import { REPORTS } from "./data/reports.js";
import { createRunEventSource } from "./lib/eventSource.js";
import { deriveRunState } from "./lib/deriveRunState.js";

const emptyRunState = () => ({ status: "none", events: [], derived: null, outcome: null, approved: false });

export default function App() {
  const [view, setView] = useState("schedule");
  const [focusId, setFocusId] = useState(null);
  const [runStates, setRunStates] = useState({});
  const [drawer, setDrawer] = useState(null);
  const [navOpen, setNavOpen] = useState(false);
  const sources = useRef({});
  const startedAt = useRef({});

  // Lock background scroll while the mobile flyout nav is open.
  useEffect(() => {
    document.body.style.overflow = navOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [navOpen]);

  function patchRun(personaId, patch) {
    setRunStates(prev => ({
      ...prev,
      [personaId]: { ...(prev[personaId] || emptyRunState()), ...patch }
    }));
  }

  function submit(personaId) {
    // Stop any prior run for this persona before starting a fresh one.
    if (sources.current[personaId]) sources.current[personaId].stop();

    const source = createRunEventSource(personaId);
    sources.current[personaId] = source;
    startedAt.current[personaId] = Date.now();

    patchRun(personaId, { status: "running", events: [], derived: deriveRunState([]), outcome: null, approved: false });
    setFocusId(personaId);
    setView("tracker");

    const collected = [];
    source.start(
      event => {
        const withTime = { ...event, _t: Date.now() - startedAt.current[personaId] };
        collected.push(withTime);
        const derived = deriveRunState(collected);
        patchRun(personaId, { events: [...collected], derived, outcome: derived.outcome });
      },
      () => {
        patchRun(personaId, { status: "done" });
      }
    );
  }

  function approve(personaId) {
    const rs = runStates[personaId];
    if (!rs) return;
    const collected = [...rs.events, { type: "approved", _t: Date.now() - (startedAt.current[personaId] || Date.now()) }];
    const derived = deriveRunState(collected);
    patchRun(personaId, { events: collected, derived, approved: true });
  }

  const focusState = focusId ? runStates[focusId] : null;
  const focusPersonaMeta = focusId ? SCHEDULE.find(p => p.id === focusId) : null;

  // Map active stage id -> agent id, for highlighting the right crew member in the Hero strip.
  const STAGE_AGENT = { triage: "triage", extract: "extractor", validate: "validator", summary: "summary" };
  let captionText = null;
  let captionLevel = "run";
  let activeAgent = null;
  if (focusState && focusState.derived) {
    activeAgent = STAGE_AGENT[focusState.derived.active] || null;
    captionText = focusState.derived.lastText;
    captionLevel = focusState.status === "done" ? (focusState.outcome && focusState.outcome.level === "warn" ? "warn" : "ok") : "run";
  }

  const runStatesForBoard = {};
  Object.keys(runStates).forEach(id => {
    runStatesForBoard[id] = { status: runStates[id].status, outcome: runStates[id].outcome };
  });

  return (
    <div className="app">
      <Nav active={view} onSelect={setView} open={navOpen} onOpenChange={setNavOpen} />
      <main>
        <Hero
          activeAgent={activeAgent}
          running={focusState ? focusState.status === "running" : false}
          captionText={captionText}
          captionLevel={captionLevel}
        />

        {view === "schedule" && (
          <ScheduleBoard
            runStates={runStatesForBoard}
            focusId={focusId}
            onSubmit={submit}
            onViewPackets={id => setDrawer({ type: "packet", personaId: id })}
            onViewReport={id => { setFocusId(id); setDrawer({ type: "report", personaId: id }); }}
          />
        )}

        {view === "tracker" && (
          <Tracker
            persona={focusPersonaMeta ? { name: `${focusPersonaMeta.first} ${focusPersonaMeta.last}`, ref: focusId } : null}
            runState={focusState && focusState.derived ? focusState.derived : { stages: {}, active: null }}
          />
        )}

        {view === "console" && (
          <EventConsole events={focusState ? focusState.events : []} />
        )}

        <p className="site-foot">Intake Crew — a portfolio project by Mike Bruno.</p>
      </main>

      {drawer && drawer.type === "packet" && (
        <Drawer
          title="Packet pages"
          subtitle={SCHEDULE.find(p => p.id === drawer.personaId)?.first}
          onClose={() => setDrawer(null)}
        >
          <PacketPages personaId={drawer.personaId} />
        </Drawer>
      )}

      {drawer && drawer.type === "report" && (
        <Drawer
          title="Front desk summary"
          subtitle={SCHEDULE.find(p => p.id === drawer.personaId)?.first}
          onClose={() => setDrawer(null)}
        >
          <Report
            report={REPORTS[drawer.personaId]}
            approved={runStates[drawer.personaId]?.approved}
            onApprove={() => approve(drawer.personaId)}
          />
        </Drawer>
      )}
    </div>
  );
}
