// From the Work Experience section of public/resume.pdf. Newest first.
export type Experience = {
  role: string;
  company: string;
  href?: string;
  start: string;
  end: string;
  /** Role is ongoing: lights the timeline marker */
  current?: boolean;
  location?: string;
  summary?: string;
  points: string[];
  tags: string[];
};

export const experience: Experience[] = [
  {
    role: "Software Engineering Intern",
    company: "Mercury Mortgages",
    start: "Sept 2026",
    end: "Jan 2027",
    current: true,
    points: [
      "Engineered a production accounts-payable platform with Next.js, TypeScript, FastAPI, and PostgreSQL, automating invoice intake, vendor verification, and multi-level approvals across multiple corporations with role-based access and Microsoft SSO.",
      "Built an AI document-extraction pipeline on the Claude API that auto-fills invoice fields and GL codes from PDFs and scanned images, with a per-vendor feedback loop that learns from user corrections.",
      "Integrated the Sage 300 ERP API to auto-sync each corporation's chart of accounts, replacing manual GL code entry.",
      "Developed automated lease PDF generation, amortization schedules, and SharePoint document sync for an internal real-estate portfolio app using Next.js and Prisma.",
    ],
    tags: [
      "Next.js",
      "TypeScript",
      "FastAPI",
      "PostgreSQL",
      "Claude API",
      "Sage 300",
      "Prisma",
      "SharePoint",
      "Microsoft SSO",
    ],
  },
  {
    role: "Software Engineer",
    company: "Modiva Studios",
    start: "Jan 2026",
    end: "Apr 2026",
    points: [
      "Built a full-stack AI video generation platform using React, Vite, Node.js, and Express, delivering a production-grade web app from scratch for a startup in the Google Accelerator.",
      "Integrated Google Veo through a custom REST API to power prompt-to-video generation.",
      "Developed responsive UI components with Tailwind CSS, custom animations, and mobile-first layouts.",
      "Added Clerk authentication and worked across a multi-branch Git release workflow.",
      "Led end-to-end UI/UX design, building interactive prototypes, design systems, ambient glow effects, and micro-animations.",
    ],
    tags: [
      "React",
      "Vite",
      "Node.js",
      "Express",
      "Tailwind CSS",
      "Clerk",
      "Google Veo",
      "Git",
    ],
  },
];
