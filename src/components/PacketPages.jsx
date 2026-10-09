import { PAGE_COUNT, packetPageSrc } from "../data/schedule.js";

export default function PacketPages({ personaId }) {
  const pages = Array.from({ length: PAGE_COUNT }, (_, i) => i + 1);
  return (
    <div className="pages">
      {pages.map(n => (
        <figure key={n}>
          <img src={packetPageSrc(personaId, n)} alt={`Packet page ${n}`} loading="lazy" />
          <figcaption>Page {n} of {PAGE_COUNT}</figcaption>
        </figure>
      ))}
    </div>
  );
}
