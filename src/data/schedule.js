// Today's appointment board. Only Deborah and Harold have recorded runs wired up right
// now (8.4 scope); the rest light up as 9.2's recorded library fills in per persona.
export const SCHEDULE = [
  { id: "samuel", time: "8:30 AM", first: "Samuel", nick: "Symptoms", last: "Simmons", about: "Reason for visit mentions a symptom", soon: true },
  { id: "deborah", time: "9:00 AM", first: "Deborah", nick: "Do Right", last: "Smith", about: "Complete packet, plus a photo of her work monitors", submitted: "Submitted 1 week ahead, 7:40 PM" },
  { id: "harold", time: "9:30 AM", first: "Harold", nick: "Handwriting", last: "Hanlon", about: "Handwritten prescription from another office", submitted: "Submitted 8 days ahead, 8:12 PM" },
  { id: "eleanor", time: "10:00 AM", first: "Eleanor", nick: "Name Swap", last: "Nash", about: "ID and insurance card disagree on her name", soon: true },
  { id: "katherine", time: "10:30 AM", first: "Katherine", nick: "Kiddo", last: "Kidd", about: "Minor; a parent holds the insurance", soon: true }
];

export const PAGE_COUNT = 7;

export function packetPageSrc(personaId, pageNumber) {
  return `/packets/${personaId}/page-${pageNumber}.jpg`;
}
