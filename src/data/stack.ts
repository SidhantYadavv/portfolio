// Mirrors the Technical Skills section of public/resume.pdf, in the same order.
// `logo` is a file in public/stack/. Items without one render as a labelled chip
// until a logo is chosen (`code` is the short text printed on the chip).

export type Tool = {
  name: string;
  logo?: string;
  code?: string;
};

export type ToolGroup = {
  title: string;
  tools: Tool[];
};

export const toolkit: ToolGroup[] = [
  {
    title: "Languages",
    tools: [
      { name: "C++", logo: "cplusplus.svg" },
      { name: "C", logo: "c.svg" },
      { name: "Python", logo: "python.svg" },
      { name: "JavaScript", logo: "javascript.svg" },
      { name: "TypeScript", logo: "typescript.svg" },
      { name: "HTML", logo: "html5.svg" },
      { name: "CSS", logo: "css3.svg" },
      { name: "SQL", code: "SQL" },
    ],
  },
  {
    title: "Backend & frameworks",
    tools: [
      { name: "Node.js", logo: "nodejs.svg" },
      { name: "Express.js", logo: "express.svg" },
      { name: "React", logo: "react.svg" },
      { name: "Next.js", logo: "nextjs.svg" },
      { name: "FastAPI", logo: "fastapi.svg" },
      { name: "PostgreSQL", logo: "postgresql.svg" },
      { name: "Prisma", logo: "prisma.svg" },
      { name: "Tailwind CSS", logo: "tailwindcss.svg" },
      { name: "Vite", logo: "vitejs.svg" },
      { name: "Clerk", logo: "clerk.svg" },
      { name: "Microsoft SSO", code: "SSO" },
      { name: "REST APIs", code: "REST" },
    ],
  },
  {
    title: "DevOps & tools",
    tools: [
      { name: "AWS (S3)", logo: "amazonwebservices.svg" },
      { name: "Docker", logo: "docker.svg" },
      { name: "Vercel", logo: "vercel.svg" },
      { name: "Git", logo: "git.svg" },
      { name: "GitHub Actions", logo: "githubactions.svg" },
      { name: "Linux", logo: "linux.svg" },
      { name: "Postman", logo: "postman.svg" },
      { name: "SharePoint", code: "SPNT" },
      { name: "Sage 300 ERP", logo: "sage.svg" },
    ],
  },
  {
    title: "AI & data engineering",
    tools: [
      { name: "LangChain", logo: "langchain.svg" },
      { name: "ChromaDB", code: "CHRM" },
      { name: "Pandas", logo: "pandas.svg" },
      { name: "NLTK (VADER)", code: "NLTK" },
      { name: "RAG", code: "RAG" },
      { name: "Vector databases", code: "VEC" },
      { name: "ETL pipelines", code: "ETL" },
      { name: "Prompt engineering", code: "PRMT" },
      { name: "Claude API", logo: "claude.svg" },
    ],
  },
  {
    title: "Hardware & embedded",
    tools: [
      { name: "Arduino", logo: "arduino.svg" },
      { name: "FPGA", code: "FPGA" },
      { name: "Verilog", code: "VLOG" },
      { name: "Quartus", code: "QRTS" },
      { name: "Altium", code: "ALTM" },
      { name: "LTspice", code: "SPICE" },
      { name: "MATLAB", logo: "matlab.svg" },
    ],
  },
];
