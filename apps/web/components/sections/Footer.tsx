"use client";

import { motion } from "motion/react";
function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}

const LINKS = [
  { label: "Features",    href: "#features"      },
  { label: "How it works", href: "#how-it-works" },
  { label: "Docs",        href: "#docs"          },
];

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="border-t border-[var(--color-border)] py-10 px-6"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md bg-[var(--color-accent)] flex items-center justify-center shrink-0">
            <span className="text-white text-xs font-black">C</span>
          </div>
          <span className="text-[var(--color-muted)] text-sm font-medium">
            Cara
          </span>
          <span className="text-[var(--color-subtle)] text-xs">· MIT License</span>
        </div>

        {/* Nav */}
        <div className="flex items-center gap-6">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-[var(--color-subtle)] hover:text-[var(--color-muted)] text-sm transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="https://github.com/TusharChauhan09/Cara-Plugin"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-subtle)] hover:text-[var(--color-muted)] transition-colors flex items-center gap-1.5 text-sm"
          >
            <GithubIcon />
            GitHub
          </a>
        </div>
      </div>
    </motion.footer>
  );
}
