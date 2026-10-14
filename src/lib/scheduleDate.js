// Schedule date: defaults to "tomorrow," rolled forward to Monday when tomorrow
// lands on a weekend, so the demo always reads as a normal weekday clinic day
// no matter when someone loads the page.
export function getScheduleDate() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  const day = d.getDay(); // 0 = Sun, 6 = Sat
  if (day === 6) d.setDate(d.getDate() + 2); // Sat -> Mon
  if (day === 0) d.setDate(d.getDate() + 1); // Sun -> Mon
  return d;
}

export function formatScheduleDate(date) {
  return date.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
}

// The static demo copy in reports.js has this date baked into each "line"
// string; we swap it for the live computed date at render time (see Report.jsx)
// rather than hand-editing that copy every day.
export const PLACEHOLDER_DATE = "Friday, October 2";
