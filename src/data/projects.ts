export type Channel = 1 | 2 | 3 | 4;

export type Project = {
  title: string;
  /** Oscilloscope channel — sets the project's accent colour */
  channel: Channel;
  /** One sentence: what it is */
  overview: string;
  /** What I built — specific pieces of the work */
  built: string[];
  /** The headline result or defining trait */
  highlight: string;
  /** Role and dates, when it was paid work */
  role?: string;
  tags: string[];
  href?: string;
  /** Drop your screen recording in public/videos/ with this filename */
  video?: string;
};

export const projects: Project[] = [
  {
    title: "Clawd Video Platform",
    channel: 1,
    role: "Software engineer · Modiva Studios · Jan–Apr 2026",
    overview:
      "Full-stack AI video generation platform (clawdvideo.com) for Modiva Studios in the Google Accelerator.",
    built: [
      "Built with React, Vite, and Node.js/Express, integrating Google's Veo models through a custom REST API and server-side agent pipeline for prompt-to-video synthesis.",
      "An integrated agent chat interface — Next.js and TypeScript with a bottom-anchored composer, live response panel, and API routes for real-time orchestration alongside the video workflow.",
      "Clerk authentication, cinematic responsive layouts, and glass morphism UI with micro-animations.",
    ],
    highlight: "Built for a Google Accelerator startup",
    tags: [
      "React",
      "Vite",
      "Node.js",
      "Express",
      "Next.js",
      "TypeScript",
      "Tailwind",
      "Clerk",
    ],
    href: "https://clawdvideo.com",
  },
  {
    title: "Financial News ETL & Dashboard",
    channel: 2,
    overview:
      "Production-grade ETL pipeline that extracts daily financial news via REST APIs and loads structured records into a relational database.",
    built: [
      "Transforms data with Pandas and runs VADER sentiment analysis on every article.",
      "Designed a schema with SQLAlchemy and containerized the backend with Docker.",
      "A Next.js/React dashboard with a glassmorphism UI for live sentiment trends and macroeconomic insights pulled directly from the database.",
    ],
    highlight: "Hands-off automation after deployment",
    tags: ["Python", "Prefect", "Pandas", "SQLAlchemy", "Docker", "Next.js"],
    href: "https://github.com/SidhantYadavv/financial-etl-pipeline",
    video: "/videos/financial-etl.mov",
  },
  {
    title: "Almagest: Citation-Grounded RAG for Research Papers",
    channel: 3,
    overview:
      "Full-stack RAG app that streams cited answers over research papers via SSE; each citation opens the source PDF with the exact passage highlighted via PDF.js.",
    built: [
      "pgvector retrieval on PostgreSQL with an HNSW index, Alembic migrations, and transactional ingestion.",
      "An ablation of hybrid search and cross-encoder reranking, shipping the top performer at 84% hit@5 and 226 ms median latency.",
      "An LLM-as-judge evaluation harness gated in GitHub Actions — 98.7% answer correctness, 99% claim-level faithfulness, and 100% abstention on 43 questions; benchmarked models to reach 0.65 s to first token.",
    ],
    highlight: "99% claim-level faithfulness",
    tags: [
      "FastAPI",
      "React",
      "TypeScript",
      "PostgreSQL",
      "pgvector",
      "Alembic",
      "PDF.js",
      "SSE",
      "GitHub Actions",
    ],
    href: "https://github.com/SidhantYadavv/rag-knowledge-chatbot",
    video: "/videos/rag-chatbot.mp4",
  },
  {
    title: "Embedded Traffic Control System",
    channel: 4,
    overview:
      "Real-time traffic intersection controller in C++ using finite state machines and deterministic timing algorithms.",
    built: [
      "Custom hardware prototypes with transistors, ICs, and breadboards bridge microcontroller firmware to electromechanical systems.",
      "PWM, digital/analog I/O, and low-level logic process sensor telemetry and drive sequential outputs.",
    ],
    highlight: "Hardware–software co-design",
    tags: ["C++", "FSM", "Embedded", "PWM", "Hardware"],
  },
];
