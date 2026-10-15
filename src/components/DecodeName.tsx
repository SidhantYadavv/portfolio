"use client";

import { useEffect, useState } from "react";

type DecodeNameProps = {
  name: string;
  onLocked?: () => void;
  className?: string;
};

const HEX = "0123456789ABCDEF";
const START_MS = 250;
const PER_LETTER_MS = 85;
const TICK_MS = 55;

// Deterministic placeholder so server and client render the same first frame.
const seeded = (i: number) => HEX[(i * 7 + 3) % 16];

/**
 * The name starts as hex noise and locks in left to right,
 * like a scope acquiring a signal. Plays once per page load.
 */
export function DecodeName({ name, onLocked, className }: DecodeNameProps) {
  const words = name.toUpperCase().split(" ");
  const letterCount = words.join("").length;
  const [locked, setLocked] = useState(0);
  const [noise, setNoise] = useState<string[]>(() =>
    Array.from({ length: letterCount }, (_, i) => seeded(i)),
  );

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      const raf = requestAnimationFrame(() => {
        setLocked(letterCount);
        onLocked?.();
      });
      return () => cancelAnimationFrame(raf);
    }

    const start = performance.now();
    const id = window.setInterval(() => {
      const elapsed = performance.now() - start;
      const n = Math.max(
        0,
        Math.min(letterCount, Math.floor((elapsed - START_MS) / PER_LETTER_MS)),
      );
      setLocked(n);
      setNoise(
        Array.from(
          { length: letterCount },
          () => HEX[Math.floor(Math.random() * 16)],
        ),
      );
      if (n >= letterCount) {
        window.clearInterval(id);
        onLocked?.();
      }
    }, TICK_MS);

    return () => window.clearInterval(id);
    // onLocked is a one-shot signal; re-running would replay the decode
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [letterCount]);

  let index = 0;

  return (
    <h1 className={className}>
      <span className="sr-only">{name}</span>
      <span aria-hidden className="block">
        {words.map((word) => (
          <span key={word} className="block whitespace-nowrap">
            {word.split("").map((char) => {
              const i = index++;
              const isLocked = i < locked;
              return (
                <span key={i} className="relative inline-block">
                  <span className={isLocked ? undefined : "invisible"}>
                    {char}
                  </span>
                  {!isLocked && (
                    <span className="absolute inset-0 text-center text-ch1/70">
                      {noise[i]}
                    </span>
                  )}
                </span>
              );
            })}
          </span>
        ))}
      </span>
    </h1>
  );
}
