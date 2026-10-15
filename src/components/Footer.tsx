import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer
      id="contact"
      className="mx-auto max-w-6xl scroll-mt-14 border-t border-ink/10 px-4 py-16 text-sm text-ink-2 sm:px-6"
    >
      <p className="text-ink">Get in touch</p>
      <ul className="mt-4 space-y-2">
        <li>
          <a
            href={`mailto:${profile.email}`}
            className="transition hover:text-ink"
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
            className="transition hover:text-ink"
          >
            GitHub
          </a>
          {" · "}
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-ink"
          >
            LinkedIn
          </a>
          {" · "}
          <a
            href={profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-ink"
          >
            Resume
          </a>
        </li>
      </ul>
      <p className="mt-12 text-xs text-ink-2">
        © {new Date().getFullYear()} {profile.name}
      </p>
    </footer>
  );
}
