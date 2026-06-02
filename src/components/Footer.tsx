import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer
      id="contact"
      className="scroll-mt-24 border-t border-white/5 py-16 text-sm text-zinc-500"
    >
      <p className="text-zinc-300">Get in touch</p>
      <ul className="mt-4 space-y-2">
        <li>
          <a
            href={`mailto:${profile.email}`}
            className="transition hover:text-zinc-200"
          >
            {profile.email}
          </a>
        </li>
        <li>{profile.phone}</li>
        <li>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-zinc-200"
          >
            GitHub
          </a>
          {" · "}
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-zinc-200"
          >
            LinkedIn
          </a>
          {" · "}
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-zinc-200"
          >
            Resume
          </a>
        </li>
      </ul>
      <p className="mt-12 text-xs text-zinc-600">
        © {new Date().getFullYear()} {profile.name}
      </p>
    </footer>
  );
}
