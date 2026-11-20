// Architecture diagrams for the "Architecture diagrams" nav page. "Context / Container" and
// "Run flow" are standalone Azure-icon-style SVGs living in /public/diagrams/. "The crew" and
// "Agents & AI tier" render as live HTML (see Diagrams.jsx's component registry) instead of a
// static image, so their card layouts reflow on mobile the same way the rest of the app does.
// comingSoon entries hold the slot for a diagram that doesn't exist yet and render as a
// non-interactive placeholder card.
export const DIAGRAMS = [
  {
    id: "context-container",
    title: "Context / Container",
    src: "/diagrams/context-container.svg",
    caption:
      "Every Azure resource this app actually runs on — frontend, compute/integration, agents & AI, and data tiers. No request flow here; see Run flow for that."
  },
  {
    id: "run-flow",
    title: "Run flow — one packet",
    src: "/diagrams/run-flow.svg",
    caption:
      "From a visitor submitting a packet through the four-agent crew to front-desk approval, with every step and tool call streaming live the whole time."
  },
  {
    id: "the-crew",
    title: "The crew",
    caption: "Each agent's responsibilities, tools, and model tier, side by side."
  },
  {
    id: "agents-ai-tier",
    title: "Agents & AI tier — drill-down",
    caption:
      'What\'s inside the "Agents & AI" tier from the Context/Container diagram: the Foundry project, the shared Azure AI Services account behind Document Intelligence and Content Understanding, and the policy file-search capability.'
  },
  {
    id: "packet-tracker",
    title: "What happens when you submit a packet",
    comingSoon: true,
    caption: "The live tracker's stages, expanded into the real tool calls behind each one."
  }
];
