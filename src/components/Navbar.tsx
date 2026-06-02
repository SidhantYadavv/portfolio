"use client";

import { motion } from "framer-motion";
import { profile } from "@/data/profile";

const links = [
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-[#07070a]/60 backdrop-blur-xl"
    >
      <nav className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <a
          href="#"
          className="text-sm font-medium tracking-tight text-zinc-100 transition hover:text-white"
        >
          {profile.name.split(" ")[0]}
        </a>
        <ul className="flex items-center gap-6 text-sm text-zinc-400">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="transition hover:text-zinc-100"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}
