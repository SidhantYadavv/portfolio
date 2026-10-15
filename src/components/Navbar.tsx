"use client";

import { motion, MotionConfig } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";

const links = [
  { label: "Stack", id: "stack" },
  { label: "Experience", id: "experience" },
  { label: "Projects", id: "work" },
];

const HEX = "0123456789ABCDEF";

/** A tiny scope screen with a live trace: the site's logo mark. */
function ScopeMark() {
  return (
    <span
      aria-hidden
      className="relative block h-7 w-10 shrink-0 overflow-hidden rounded-[5px] border border-ch1/30 bg-screen shadow-[inset_0_0_8px_rgb(0_0_0/0.8),0_0_12px_-4px_var(--ch1)]"
    >
      <span className="absolute inset-y-0 left-1/2 w-px bg-screen-dim/20" />
      <span className="absolute inset-x-0 top-1/2 h-px bg-screen-dim/20" />
      <svg
        viewBox="0 0 80 28"
        preserveAspectRatio="none"
        className="nav-mark-trace absolute inset-y-0 left-0 h-full w-[200%]"
      >
        <path
          d="M0 14 Q5 4 10 14 T20 14 T30 14 T40 14 T50 14 T60 14 T70 14 T80 14"
          fill="none"
          stroke="var(--ch1)"
          strokeWidth="1.6"
          vectorEffect="non-scaling-stroke"
          style={{ filter: "drop-shadow(0 0 2px var(--ch1))" }}
        />
      </svg>
    </span>
  );
}

/** The name in the bar. Hovering or focusing re-runs the hero's hex decode. */
function NavName() {
  const full = profile.name.toUpperCase();
  const [shown, setShown] = useState(full);
  const timer = useRef<number | null>(null);

  const scramble = () => {
    if (timer.current !== null) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const start = performance.now();
    timer.current = window.setInterval(() => {
      const locked = Math.floor((performance.now() - start) / 45);
      setShown(
        full
          .split("")
          .map((c, i) =>
            c === " " || i < locked ? c : HEX[Math.floor(Math.random() * 16)],
          )
          .join(""),
      );
      if (locked >= full.length && timer.current !== null) {
        window.clearInterval(timer.current);
        timer.current = null;
        setShown(full);
      }
    }, 40);
  };

  useEffect(
    () => () => {
      if (timer.current !== null) window.clearInterval(timer.current);
    },
    [],
  );

  const words = shown.split(" ");
  const fullWords = full.split(" ");

  return (
    <a
      href="#top"
      onPointerEnter={scramble}
      onFocus={scramble}
      className="flex items-center gap-2.5 rounded-[6px]"
    >
      <ScopeMark />
      <span className="sr-only">{profile.name}, back to top</span>
      <span
        aria-hidden
        className="flex gap-[0.3em] font-display text-[1.375rem] leading-none font-extrabold tracking-[0.02em] text-ch1 [text-shadow:0_0_14px_rgb(242_194_48/0.45)] sm:text-[1.5rem]"
      >
        {words.map((word, w) => (
          <span
            key={w}
            className={`relative inline-flex ${w > 0 ? "max-sm:hidden" : ""}`}
          >
            {/* The real letters reserve width so hex glyphs never shift the bar */}
            {fullWords[w].split("").map((c, i) => (
              <span key={i} className="relative inline-block">
                <span className="invisible">{c}</span>
                <span className="absolute inset-0 text-center">{word[i]}</span>
              </span>
            ))}
          </span>
        ))}
      </span>
    </a>
  );
}

export function Navbar() {
  const [active, setActive] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () =>
      setScrolled(window.scrollY > window.innerHeight * 0.5);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Scroll spy: the section crossing the middle band of the screen is "active"
    const visible = new Map<string, boolean>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visible.set(e.target.id, e.isIntersecting);
        const current = links.find((l) => visible.get(l.id));
        setActive(current ? current.id : null);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    for (const l of links) {
      const el = document.getElementById(l.id);
      if (el) io.observe(el);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b border-ch1/20 backdrop-blur-md transition-[background-color,box-shadow] duration-300 ${
          scrolled
            ? "bg-panel-2/90 shadow-[0_10px_30px_-18px_rgb(0_0_0/0.9)]"
            : "bg-panel/80"
        }`}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6"
        >
          <NavName />

          <div className="flex items-center gap-3">
            <ul className="flex items-center gap-0.5 rounded-[8px] border border-ink/10 bg-screen/60 p-1 shadow-[inset_0_1px_3px_rgb(0_0_0/0.6)]">
              {links.map((link) => {
                const isActive = active === link.id;
                return (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      aria-current={isActive ? "location" : undefined}
                      className={`relative flex h-8 items-center gap-1.5 rounded-[5px] px-2 text-[0.8125rem] transition-colors sm:px-3 sm:text-[0.9375rem] ${
                        isActive ? "text-ch1" : "text-ink-2 hover:text-ink"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-active"
                          aria-hidden
                          className="absolute inset-0 rounded-[5px] border border-ch1/35 bg-screen shadow-[inset_0_0_10px_rgb(242_194_48/0.12)]"
                          transition={{
                            type: "spring",
                            stiffness: 420,
                            damping: 34,
                          }}
                        />
                      )}
                      <span
                        aria-hidden
                        className={`relative size-1.5 rounded-full transition-all duration-300 max-sm:hidden ${
                          isActive
                            ? "bg-ch1 shadow-[0_0_6px_var(--ch1)]"
                            : "bg-ink-2/30"
                        }`}
                      />
                      <span className="relative">{link.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>

            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center rounded-[6px] bg-ch1 px-3.5 text-[0.9375rem] font-medium text-screen shadow-[0_0_16px_-4px_var(--ch1)] transition-colors hover:bg-[#ffd659] max-md:hidden"
            >
              Resume
            </a>
          </div>
        </nav>
      </header>
    </MotionConfig>
  );
}
