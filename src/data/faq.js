// Single source of truth for both the featured on-page questions (short answers, opened via
// modal) and the full "How this was built" page (same questions plus more, grouped by topic).
// Featured questions are marked with `featured: true` below and pulled out via FEATURED.

export const FAQ_TOPICS = [
  {
    id: "agents",
    title: "Agent design & persistence",
    questions: [
      {
        id: "why-four-agents",
        featured: true,
        q: "Why four separate agents?",
        a: "Separation of concerns: each agent has one job, so a bad extraction doesn't silently poison validation, and failures are traceable to a specific stage. And to demonstrate the multi-agent architecture for workflows with additional complexity.",
        learnLabel: "Azure AI Foundry Agent Service overview",
        learnUrl: "https://learn.microsoft.com/en-us/azure/ai-services/agents/overview"
      },
      {
        id: "persisted-vs-fresh",
        featured: true,
        q: "What's actually persisted vs. generated fresh each run?",
        a: "The four agents persist in the Foundry project itself — created once through an idempotent, hash-checked publish step, so redeploying the app doesn't recreate them if their definition hasn't changed. Every run's events land in Azure SQL.",
        learnLabel: "Azure AI Foundry Agent Service overview",
        learnUrl: "https://learn.microsoft.com/en-us/azure/ai-services/agents/overview"
      },
      {
        id: "agent-roles",
        q: "What does each agent actually do?",
        a: "Triage classifies each uploaded page. Extractor pulls structured fields out of it. Validator cross-checks those fields against policy and runs an eligibility check. Summary drafts the front-desk-facing report."
      }
    ]
  },
  {
    id: "extraction",
    title: "Content Understanding & Document Intelligence",
    questions: [
      {
        id: "cu-vs-di",
        q: "Why use both Content Understanding and Document Intelligence instead of just one?",
        a: "They answer different questions. Content Understanding looks at a page and figures out what it is — an insurance card, a photo ID, a handwritten note. Document Intelligence then extracts the structured fields once the page's type is known.",
        learnLabel: "Azure AI Content Understanding overview",
        learnUrl: "https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/overview"
      },
      {
        id: "handwriting",
        q: "Does the system actually read handwriting?",
        a: "Yes — one of the test packets includes a handwritten page, and Triage captures it as patient context for the doctor rather than failing the packet outright.",
        learnLabel: "Azure AI Document Intelligence overview",
        learnUrl: "https://learn.microsoft.com/en-us/azure/ai-services/document-intelligence/overview"
      }
    ]
  },
  {
    id: "orchestration",
    title: "Orchestration & handoff",
    questions: [
      {
        id: "handoff",
        q: "How do agents hand off work to each other?",
        a: "Each stage runs as its own agent session. The orchestrator builds the next agent's input from the previous stage's actual tool-call results, not by re-parsing the prior agent's prose output."
      },
      {
        id: "human-in-the-loop",
        featured: true,
        q: "How does the system know when a human needs to step in?",
        a: "The Validator checks extracted fields against policy. Anything that fails a check, or comes back low-confidence, gets flagged for front-desk review instead of silently passing through.",
        learnLabel: "Azure AI Content Understanding overview",
        learnUrl: "https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/overview"
      }
    ]
  },
  {
    id: "security",
    title: "Keyless security",
    questions: [
      {
        id: "no-secrets",
        q: "Are there any API keys or secrets in this project?",
        a: "No. Every service — SQL, Storage, Web PubSub, Foundry — is called using Azure managed identity. There's no connection string or key stored anywhere, in code or in app settings.",
        learnLabel: "Microsoft Entra authentication for Azure SQL",
        learnUrl: "https://learn.microsoft.com/en-us/azure/azure-sql/database/authentication-aad-overview"
      },
      {
        id: "why-keyless",
        q: "Why keyless, specifically?",
        a: "A past project leaked an API key and took on a wave of unauthorized usage before it was caught. Every project since has been built so that failure mode is structurally impossible — there's simply no key to leak."
      }
    ]
  },
  {
    id: "streaming",
    title: "Live event streaming",
    questions: [
      {
        id: "live-tracker",
        q: "How does the tracker update in real time?",
        a: "A queue-triggered Azure Function runs the pipeline. Each step writes a run event to Azure SQL and broadcasts it over Azure Web PubSub, which the browser is already subscribed to — no polling.",
        learnLabel: "Azure Web PubSub service overview",
        learnUrl: "https://learn.microsoft.com/en-us/azure/azure-web-pubsub/overview"
      }
    ]
  },
  {
    id: "payer",
    title: "Mock payer & eligibility",
    questions: [
      {
        id: "mock-payer",
        q: "Is the insurance eligibility check real?",
        a: "It's a self-hosted mock payer endpoint — the same Function App exposes it — built to mirror what a real payer handshake looks like (request shape, latency, a pending-to-active state transition) without hitting a live insurance system."
      }
    ]
  },
  {
    id: "safety",
    title: "Recorded demo & cost safety",
    questions: [
      {
        id: "real-or-mocked",
        featured: true,
        q: "Is this really calling Azure AI Foundry, or is it mocked?",
        a: "What you see by default is a recorded run, by design. A password-gated path runs the real, live pipeline for demos and interviews.",
        learnLabel: "Azure AI Foundry Agent Service overview",
        learnUrl: "https://learn.microsoft.com/en-us/azure/ai-services/agents/overview"
      },
      {
        id: "cost-guardrail",
        featured: true,
        q: "What keeps a public demo like this from running up a real Azure bill?",
        a: "The default path never touches a live model — it replays a recorded run. The real pipeline sits behind a short-lived, server-verified token, not just a client-side check, so it can't be reached by guessing a URL.",
        learnLabel: "Azure Cost Management + Billing overview",
        learnUrl: "https://learn.microsoft.com/en-us/azure/cost-management-billing/cost-management-billing-overview"
      }
    ]
  }
];

const FEATURED_ORDER = ["why-four-agents", "real-or-mocked", "persisted-vs-fresh", "human-in-the-loop", "cost-guardrail"];

export const FEATURED = FEATURED_ORDER
  .map(id => {
    for (const topic of FAQ_TOPICS) {
      const found = topic.questions.find(q => q.id === id);
      if (found) return { ...found, topic: topic.title };
    }
    return null;
  })
  .filter(Boolean);
