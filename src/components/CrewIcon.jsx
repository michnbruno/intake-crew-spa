// Ported verbatim (JSX-ified) from the v4 prototype's Pose()/Crew() functions —
// capsule bodies, stick limbs, one prop each: Triage (cap + clipboard), Extractor
// (glasses + hammer), Validator (magnifying glass), Summary (megaphone).
// size <= 28 renders the small badge style (used inline, e.g. AgentLine);
// anything larger renders the full posed figure (used in the Hero crew strip).
const COLS = {
  triage: ["#1D9E75", "#0F6E56", "#085041"],
  extractor: ["#EF9F27", "#BA7517", "#633806"],
  validator: ["#7F77DD", "#534AB7", "#26215C"],
  summary: ["#D4537E", "#993556", "#72243E"]
};

function Legs({ x1, x2, d }) {
  return (
    <>
      <g stroke={d} strokeWidth="3.5" strokeLinecap="round">
        <line x1={x1} y1="80" x2={x1 - 4} y2="102" />
        <line x1={x2} y1="80" x2={x2 + 4} y2="102" />
      </g>
      <ellipse cx={x1 - 6} cy="104" rx="6" ry="3" fill={d} />
      <ellipse cx={x2 + 6} cy="104" rx="6" ry="3" fill={d} />
    </>
  );
}

function FullPose({ agent, color }) {
  const [c, d, k] = COLS[agent] || COLS.triage;

  if (agent === "triage") {
    return (
      <>
        <rect x="28" y="80" width="42" height="5" rx="2" fill="#9A9890" />
        <line x1="33" y1="85" x2="31" y2="106" stroke="#9A9890" strokeWidth="3" />
        <line x1="65" y1="85" x2="67" y2="106" stroke="#9A9890" strokeWidth="3" />
        <g stroke={d} strokeWidth="3.5" strokeLinecap="round">
          <line x1="42" y1="78" x2="30" y2="92" />
          <line x1="54" y1="78" x2="44" y2="94" />
        </g>
        <rect x="30" y="32" width="36" height="50" rx="18" fill={c} />
        <rect x="32" y="25" width="32" height="12" rx="6" fill={k} />
        <rect x="56" y="31" width="17" height="4.5" rx="2.2" fill={k} />
        <circle cx="42" cy="52" r="4.5" fill="#fff" /><circle cx="54" cy="52" r="4.5" fill="#fff" />
        <circle cx="44" cy="54" r="2" fill="#2C2C2A" /><circle cx="56" cy="54" r="2" fill="#2C2C2A" />
        <path d="M43 65 Q48 69 53 65" fill="none" stroke={k} strokeWidth="2" strokeLinecap="round" />
        <g stroke={d} strokeWidth="3.5" strokeLinecap="round">
          <line x1="32" y1="60" x2="22" y2="72" />
          <line x1="64" y1="58" x2="78" y2="62" />
        </g>
        <rect x="76" y="50" width="15" height="19" rx="1.5" fill="#F1EFE8" stroke="#888780" transform="rotate(12 83 60)" />
        <g fill="#F1EFE8" stroke="#B4B2A9">
          <rect x="76" y="98" width="24" height="5" rx="1" />
          <rect x="78" y="92" width="24" height="5" rx="1" />
          <rect x="75" y="86" width="24" height="5" rx="1" />
        </g>
      </>
    );
  }

  if (agent === "extractor") {
    return (
      <>
        <Legs x1={44} x2={56} d={d} />
        <rect x="32" y="34" width="36" height="48" rx="18" fill={c} />
        <circle cx="43" cy="52" r="7" fill="#fff" stroke="#2C2C2A" strokeWidth="2" />
        <circle cx="57" cy="52" r="7" fill="#fff" stroke="#2C2C2A" strokeWidth="2" />
        <path d="M48 51 Q50 49 52 51" fill="none" stroke="#2C2C2A" strokeWidth="2" />
        <circle cx="44" cy="53" r="2.6" fill="#2C2C2A" /><circle cx="58" cy="53" r="2.6" fill="#2C2C2A" />
        <line x1="45" y1="68" x2="55" y2="68" stroke={k} strokeWidth="2" strokeLinecap="round" />
        <g stroke={d} strokeWidth="3.5" strokeLinecap="round">
          <line x1="34" y1="62" x2="26" y2="76" />
          <line x1="66" y1="56" x2="80" y2="40" />
        </g>
        <line x1="80" y1="40" x2="84" y2="22" stroke="#854F0B" strokeWidth="3.5" strokeLinecap="round" />
        <rect x="73" y="13" width="23" height="9" rx="1.5" fill="#5F5E5A" transform="rotate(14 84 17)" />
        <rect x="72" y="94" width="26" height="12" rx="1.5" fill="#FAC775" stroke="#BA7517" />
        <rect x="74" y="91" width="9" height="4" rx="1" fill="#FAC775" stroke="#BA7517" />
      </>
    );
  }

  if (agent === "validator") {
    return (
      <>
        <Legs x1={40} x2={54} d={d} />
        <rect x="28" y="34" width="36" height="48" rx="18" fill={c} />
        <circle cx="39" cy="53" r="4.5" fill="#fff" /><circle cx="40" cy="53" r="2" fill="#2C2C2A" />
        <line x1="33" y1="44" x2="44" y2="46" stroke={k} strokeWidth="2.2" strokeLinecap="round" />
        <path d="M40 70 Q45 67 50 70" fill="none" stroke={k} strokeWidth="2" strokeLinecap="round" />
        <g stroke={d} strokeWidth="3.5" strokeLinecap="round">
          <line x1="30" y1="62" x2="22" y2="76" />
          <line x1="62" y1="64" x2="74" y2="72" />
        </g>
        <line x1="66" y1="61" x2="75" y2="73" stroke="#444441" strokeWidth="4" strokeLinecap="round" />
        <circle cx="58" cy="52" r="11" fill="#E6F1FB" stroke="#444441" strokeWidth="2.5" />
        <circle cx="57" cy="52" r="6" fill="#fff" /><circle cx="58" cy="52" r="3" fill="#2C2C2A" />
      </>
    );
  }

  // summary
  return (
    <>
      <Legs x1={38} x2={50} d={d} />
      <rect x="24" y="34" width="36" height="48" rx="18" fill={c} />
      <circle cx="36" cy="52" r="4.5" fill="#fff" /><circle cx="48" cy="52" r="4.5" fill="#fff" />
      <circle cx="37.5" cy="52" r="2" fill="#2C2C2A" /><circle cx="49.5" cy="52" r="2" fill="#2C2C2A" />
      <circle cx="44" cy="66" r="3" fill={k} />
      <g stroke={d} strokeWidth="3.5" strokeLinecap="round">
        <line x1="26" y1="62" x2="18" y2="76" />
        <line x1="58" y1="66" x2="64" y2="76" />
      </g>
      <rect x="56" y="57" width="6" height="9" rx="1.5" fill="#993556" />
      <polygon points="61,57 84,46 84,78 61,66" fill="#F4C0D1" stroke="#993556" strokeWidth="1.5" strokeLinejoin="round" />
      <g fill="none" stroke={c} strokeWidth="2" strokeLinecap="round">
        <path d="M89 54 Q94 62 89 70" />
        <path d="M95 49 Q102 62 95 75" />
      </g>
    </>
  );
}

function BadgeCrew({ agent, color, busy }) {
  const c = color;
  let prop = null;
  if (agent === "triage") prop = <rect x="3" y="0" width="14" height="4" rx="2" fill={c} opacity="0.55" />;
  if (agent === "extractor") prop = (
    <g fill="none" stroke="#2C2C2A" strokeWidth="1.2">
      <circle cx="7.5" cy="8" r="2.8" /><circle cx="13" cy="8" r="2.8" />
    </g>
  );
  if (agent === "validator") prop = (
    <g>
      <line x1="17" y1="13" x2="19.5" y2="16.5" stroke="#444441" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="18" cy="10" r="3" fill="#E6F1FB" stroke="#444441" strokeWidth="1.2" />
    </g>
  );
  if (agent === "summary") prop = <path d="M16 10 L21 7 L21 14 Z" fill={c} opacity="0.6" />;
  const eyes = agent === "extractor" ? null : (
    <g fill="#fff"><circle cx="7.5" cy="8" r="2" /><circle cx="13" cy="8" r="2" /></g>
  );
  return (
    <svg className={busy ? "crew busy" : "crew"} width="20" height="24" viewBox="0 0 22 26" aria-hidden="true">
      <line x1="7" y1="19" x2="5.5" y2="25" stroke={c} strokeWidth="2" strokeLinecap="round" />
      <line x1="13.5" y1="19" x2="15" y2="25" stroke={c} strokeWidth="2" strokeLinecap="round" />
      <rect x="2.5" y="2" width="16" height="19" rx="8" fill={c} />
      {eyes}{prop}
    </svg>
  );
}

export default function CrewIcon({ agent, color, size = 56, busy = false }) {
  if (size <= 28) return <BadgeCrew agent={agent} color={color} busy={busy} />;
  return (
    <svg width={size} height={size * (110 / 108)} viewBox="0 0 108 110" aria-hidden="true">
      <FullPose agent={agent} color={color} />
    </svg>
  );
}
