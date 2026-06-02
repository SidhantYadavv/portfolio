export type Project = {
  title: string;
  summary: string;
  tags: string[];
  href?: string;
  highlight?: string;
  /** Drop your screen recording in public/videos/ with this filename */
  video?: string;
};

export const projects: Project[] = [
  {
    title: "Clawd Video Platform",
    summary:
      "Full-stack AI video generation platform (clawdvideo.com) for Modiva Studios in the Google Accelerator. Built with React, Vite, and Node.js/Express, integrating Google's Veo models through a custom REST API and server-side agent pipeline for prompt-to-video synthesis. Includes Clerk authentication, cinematic responsive layouts, and glass morphism UI with micro-animations. The platform also ships an integrated agent chat interface — Next.js and TypeScript with a bottom-anchored composer, live response panel, and API routes for real-time orchestration alongside the video workflow.",
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
    highlight: "Software developer intern · Jan–Apr 2026",
  },
  {
    title: "Financial News ETL & Dashboard",
    summary:
      "Production-grade ETL pipeline that extracts daily financial news via REST APIs, transforms data with Pandas, runs VADER sentiment analysis, and loads structured records into a relational database. Designed a schema with SQLAlchemy, containerized the backend with Docker, and built a Next.js/React dashboard with a glassmorphism UI for live sentiment trends and macroeconomic insights pulled directly from the database — fully hands-off after deployment.",
    tags: ["Python", "Prefect", "Pandas", "SQLAlchemy", "Docker", "Next.js"],
    href: "https://github.com/SidhantYadavv/financial-etl-pipeline",
    highlight: "Hands-off automation after deployment",
    video: "/videos/financial-etl.mov",
  },
  {
    title: "RAG Knowledge Chatbot",
    summary:
      "Retrieval-Augmented Generation application that ingests large PDF documents, chunks and embeds them in ChromaDB, and answers questions with Google Gemini — grounded in retrieved context to reduce hallucinations. LangChain orchestrates ingestion and retrieval; Streamlit powers a real-time chat UI with sub-second vector search and citation-backed answers across hundreds of pages of dense documentation.",
    tags: ["Python", "LangChain", "ChromaDB", "Gemini", "Streamlit"],
    href: "https://github.com/SidhantYadavv/rag-knowledge-chatbot",
    highlight: "Citation-backed, document-grounded answers",
    video: "/videos/rag-chatbot.mov",
  },
  {
    title: "Embedded Traffic Control System",
    summary:
      "Real-time traffic intersection controller in C++ using finite state machines and deterministic timing algorithms. Custom hardware prototypes with transistors, ICs, and breadboards bridge microcontroller firmware to electromechanical systems, using PWM, digital/analog I/O, and low-level logic to process sensor telemetry and drive sequential outputs.",
    tags: ["C++", "FSM", "Embedded", "PWM", "Hardware"],
    highlight: "Hardware–software co-design",
  },
];
