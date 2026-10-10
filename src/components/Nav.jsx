// Sidebar on desktop, hamburger-triggered flyout on mobile — same markup both ways, CSS
// repositions it under 900px.
const GROUPS = [
  {
    title: "Views",
    items: [
      { id: "schedule", label: "Today's schedule" },
      { id: "tracker", label: "Agent tracker" },
      { id: "console", label: "Event console" }
    ]
  },
  {
    title: "About",
    items: [
      { id: "faq", label: "How this was built" }
    ]
  }
];

export default function Nav({ active, onSelect, open, onOpenChange }) {
  function pick(id) {
    onSelect(id);
    onOpenChange(false);
  }

  return (
    <>
      <div className="nav-top">
        <button className="hamburger" aria-label="Open menu" onClick={() => onOpenChange(true)}>
          <span /><span /><span />
        </button>
        <div className="nav-top-brand">
          <strong>Intake Crew</strong>
          <span>Brightview Eye Care · front desk</span>
        </div>
      </div>

      {open && <div className="scrim" onClick={() => onOpenChange(false)} />}

      <nav className={`nav${open ? " open" : ""}`}>
        <div className="nav-head">
          <div className="brand">
            <h1>Intake Crew</h1>
            <p>Brightview Eye Care · front desk</p>
          </div>
          <button className="nav-close" aria-label="Close menu" onClick={() => onOpenChange(false)}>✕</button>
        </div>
        {GROUPS.map(group => (
          <div className="groups" key={group.title}>
            <h2>{group.title}</h2>
            <ul>
              {group.items.map(item => (
                <li
                  key={item.id}
                  className={item.id === active ? "active" : ""}
                  onClick={() => pick(item.id)}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </>
  );
}
