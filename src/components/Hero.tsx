"use client";

import { motion } from "framer-motion";
import { AnimatedName } from "@/components/AnimatedName";
import { profile } from "@/data/profile";

export function Hero() {
  return (
    <section className="relative flex min-h-[88vh] flex-col justify-center pt-28 pb-16">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-violet-600/20 blur-[120px]"
          animate={{ opacity: [0.35, 0.55, 0.35], scale: [1, 1.08, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 h-[280px] w-[280px] translate-x-1/4 rounded-full bg-cyan-500/10 blur-[100px]"
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="mb-4 text-sm uppercase tracking-[0.2em] text-zinc-500"
      >
        Portfolio
      </motion.p>

      <AnimatedName />

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="mt-3 text-lg text-violet-300/90"
      >
        {profile.role}
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.35,
          duration: 0.65,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="mt-10 max-w-2xl text-base leading-relaxed text-zinc-400"
      >
        {profile.intro[0]}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="mt-12 flex flex-wrap gap-4"
      >
        <a
          href="#projects"
          className="rounded-full bg-zinc-100 px-5 py-2.5 text-sm font-medium text-zinc-900 transition hover:bg-white"
        >
          View projects
        </a>
        <a
          href={profile.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-zinc-700 px-5 py-2.5 text-sm text-zinc-300 transition hover:border-zinc-500 hover:text-white"
        >
          Resume
        </a>
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-zinc-700 px-5 py-2.5 text-sm text-zinc-300 transition hover:border-zinc-500 hover:text-white"
        >
          GitHub
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-zinc-700 px-5 py-2.5 text-sm text-zinc-300 transition hover:border-zinc-500 hover:text-white"
        >
          LinkedIn
        </a>
      </motion.div>
    </section>
  );
}
