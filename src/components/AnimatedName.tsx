"use client";

import { motion, useReducedMotion } from "framer-motion";
import { profile } from "@/data/profile";

const words = profile.name.split(" ");

const letterTransition = {
  duration: 0.55,
  ease: [0.22, 1, 0.36, 1] as const,
};

export function AnimatedName() {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return (
      <h1 className="max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-zinc-50 sm:text-5xl">
        {profile.name}
      </h1>
    );
  }

  let letterIndex = 0;

  return (
    <h1 className="relative max-w-2xl">
      <span
        className="flex flex-wrap items-baseline gap-x-[0.28em] text-4xl font-semibold leading-tight tracking-tight sm:text-5xl"
        aria-label={profile.name}
      >
        {words.map((word, wordIndex) => (
          <span key={word} className="inline-flex whitespace-nowrap">
            {word.split("").map((char) => {
              const i = letterIndex++;
              return (
                <motion.span
                  key={`${wordIndex}-${char}-${i}`}
                  initial={{ opacity: 0, y: 32, rotateX: -40 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{
                    ...letterTransition,
                    delay: 0.08 + i * 0.045,
                  }}
                  className="name-letter inline-block origin-bottom"
                  style={{
                    perspective: 600,
                    animationDelay: `${i * 0.12}s`,
                  }}
                >
                  {char}
                </motion.span>
              );
            })}
          </span>
        ))}
      </span>

      <motion.span
        className="absolute -bottom-2 left-0 h-px origin-left bg-gradient-to-r from-violet-500/80 via-cyan-400/60 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{
          delay: 0.55,
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{ width: "min(100%, 14rem)" }}
        aria-hidden
      />

      <motion.span
        className="pointer-events-none absolute -inset-x-4 -inset-y-2 -z-10 rounded-2xl bg-violet-600/10 blur-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.5, 0.35] }}
        transition={{ delay: 0.4, duration: 1.2 }}
        aria-hidden
      />
    </h1>
  );
}
