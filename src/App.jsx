import { useEffect, useRef, useState } from "react";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import ScheduleBoard from "./components/ScheduleBoard.jsx";
import Tracker from "./components/Tracker.jsx";
import Report from "./components/Report.jsx";
import EventConsole from "./components/EventConsole.jsx";
import Drawer from "./components/Drawer.jsx";
import PacketPages from "./components/PacketPages.jsx";
import QnaStrip from "./components/QnaStrip.jsx";
import FaqModal from "./components/FaqModal.jsx";
import FaqPage from "./components/FaqPage.jsx";
import GuideCallout from "./components/GuideCallout.jsx";
import { SCHEDULE } from "./data/schedule.js";
import { REPORTS } from "./data/reports.js";
import { FAQ_TOPICS } from "./data/faq.js";
import { createRunEventSource } from "./lib/eventSource.js";
import { deriveRunState } from "./lib/deriveRunState.js";

const emptyRunState = () => ({ status: "none", events: [], derived: null, outcome: null, approved: false });

export default function App() {
  const [view, setView] = useState("schedule");
  const [focusId, setFocusId] = useState(null);
  const [runStates, setRunStates] = useState({});
  const [drawer, setDrawer] = useState(null);
  const [navOpen, setNavOpen] = useState(false);
  const [qnaItem, setQnaItem] = useState(null);
  const [faqSelected, setFaqSelected] = useState(FAQ_TOPICS[0].questions[0].id);
  const [guideOpen, setGuideOpen] = useState(true);
  const sources = useRef({});
  const startedAt = useRef({});

  // Lock background scroll while the mobile flyout nav or the Q&A modal is open.
  useEffect(() => {
    document.body.style.overflow = (navOpen || qnaItem) ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [navOpen, qnaItem]);

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
  let activeAgent = null;
  if (focusState && focusState.derived) {
    activeAgent = STAGE_AGENT[focusState.derived.active] || null;
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
        />

        {view === "faq" && (
          <FaqPage topics={FAQ_TOPICS} initialId={faqSelected} />
        )}

        {view === "schedule" && (
          <>
            <h3 className="view-head">Brightview Eye Care Daily Schedule</h3>
            <ScheduleBoard
              runStates={runStatesForBoard}
              focusId={focusId}
              onSubmit={submit}
              onViewPackets={id => setDrawer({ type: "packet", personaId: id })}
              onViewReport={id => { setFocusId(id); setDrawer({ type: "report", personaId: id }); }}
            />
          </>
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

        <QnaStrip onPick={setQnaItem} />

        <p className="site-foot">
          Intake Crew — a portfolio project by Mike Bruno, built in partnership with Claude (Anthropic),
          with additional implementation support from Codex.
        </p>
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

      <FaqModal
        item={qnaItem}
        onClose={() => setQnaItem(null)}
        onReadMore={id => { setFaqSelected(id); setView("faq"); setQnaItem(null); }}
      />

      {guideOpen && <GuideCallout onClose={() => setGuideOpen(false)} />}
    </div>
  );
}
