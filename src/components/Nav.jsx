// Left nav. No "coming soon" badges or toast triggers — every item is a real,
// live view in this build (per Mike's instruction to strip construction/soon UI).
const ITEMS = [
  { id: "schedule", label: "Today's schedule" },
  { id: "tracker", label: "Agent tracker" },
  { id: "console", label: "Event console" }
];

export default function Nav({ active, onSelect }) {
  return (
    <nav className="nav">
      <div className="brand">
        <h1>Intake Crew</h1>
        <p>Brightview Eye Care · front desk</p>
      </div>
      <div className="groups">
        <h2>Views</h2>
        <ul>
          {ITEMS.map(item => (
            <li
              key={item.id}
              className={item.id === active ? "active" : ""}
              onClick={() => onSelect(item.id)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
