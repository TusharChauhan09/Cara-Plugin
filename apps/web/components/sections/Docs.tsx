"use client";

import { motion } from "motion/react";
import { Check, Terminal } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const COMMANDS = [
  {
    cmd: "Cara: Start Typing Test",
    desc: "Opens a new editor tab with a random code snippet. Timer starts on your first keystroke.",
    badge: "Test",
    badgeVariant: "purple" as const,
  },
  {
    cmd: "Cara: Reset Typing Test",
    desc: "Abandons the current test and immediately starts a fresh one with a new snippet.",
    badge: "Test",
    badgeVariant: "purple" as const,
  },
  {
    cmd: "Cara: Show Statistics",
    desc: "Opens the Statistics panel — current WPM, total coding time, and per-language breakdown.",
    badge: "Stats",
    badgeVariant: "success" as const,
  },
  {
    cmd: "Cara: Show Status Bar",
    desc: "Restores the Cara status bar item if it was hidden or has not yet appeared.",
    badge: "UI",
    badgeVariant: "secondary" as const,
  },
];

const GRADES = [
  { grade: "S", threshold: "98%+ accuracy",    color: "text-emerald-400", ring: "ring-emerald-900/60 bg-emerald-950/40" },
  { grade: "A", threshold: "95 – 97% accuracy", color: "text-blue-400",   ring: "ring-blue-900/60   bg-blue-950/40"   },
  { grade: "B", threshold: "90 – 94% accuracy", color: "text-purple-400", ring: "ring-purple-900/60 bg-purple-950/40" },
  { grade: "C", threshold: "80 – 89% accuracy", color: "text-amber-400",  ring: "ring-amber-900/60  bg-amber-950/40"  },
  { grade: "D", threshold: "Below 80%",          color: "text-red-400",    ring: "ring-red-900/60    bg-red-950/40"    },
];

const REQUIREMENTS = [
  "VS Code 1.109 or later",
  "No external runtime needed",
  "No account or login",
  "Works fully offline",
];

export function Docs() {
  return (
    <section id="docs" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-3">
            Documentation
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Commands &amp; configuration
          </h2>
          <p className="mt-3 text-[var(--color-muted)] text-sm max-w-sm mx-auto">
            Open the Command Palette with{" "}
            <kbd className="px-1.5 py-0.5 rounded bg-[var(--color-surface)] border border-[var(--color-border)] font-mono text-xs text-[var(--color-muted)]">
              Ctrl+Shift+P
            </kbd>{" "}
            /{" "}
            <kbd className="px-1.5 py-0.5 rounded bg-[var(--color-surface)] border border-[var(--color-border)] font-mono text-xs text-[var(--color-muted)]">
              ⌘⇧P
            </kbd>{" "}
            to access all commands.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          {/* Commands — takes 3 cols */}
          <motion.div
            className="lg:col-span-3 flex flex-col gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
          >
            <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-subtle)]">
              Commands
            </p>
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
              {COMMANDS.map((c, i) => (
                <motion.div
                  key={c.cmd}
                  variants={fadeUp}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className={`p-5 ${i < COMMANDS.length - 1 ? "border-b border-[var(--color-border-muted)]" : ""}`}
                >
                  <div className="flex items-start gap-3 mb-1.5 flex-wrap">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <code className="text-blue-300 text-xs font-mono font-semibold leading-snug flex-1">
                      {c.cmd}
                    </code>
                    <Badge variant={c.badgeVariant} className="shrink-0">
                      {c.badge}
                    </Badge>
                  </div>
                  <p className="text-[var(--color-muted)] text-sm pl-6 leading-relaxed">
                    {c.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Config */}
            <motion.div variants={fadeUp} transition={{ duration: 0.4, ease: "easeOut" }}>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-subtle)] mb-3">
                Configuration
              </p>
              <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
                <div className="flex items-start justify-between gap-4 mb-2 flex-wrap">
                  <code className="text-amber-300 text-xs font-mono font-semibold">
                    cara.showSpeedInStatusBar
                  </code>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[var(--color-subtle)] text-xs font-mono">
                      boolean
                    </span>
                    <kbd className="px-1.5 py-0.5 rounded bg-[var(--color-surface-alt)] border border-[var(--color-border)] font-mono text-xs text-[var(--color-muted)]">
                      true
                    </kbd>
                  </div>
                </div>
                <p className="text-[var(--color-muted)] text-sm leading-relaxed">
                  Show or hide the live WPM counter in the VS Code status bar.
                  Adjustable via VS Code Settings.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right column — 2 cols */}
          <motion.div
            className="lg:col-span-2 flex flex-col gap-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
          >
            {/* Grade table */}
            <motion.div variants={fadeUp} transition={{ duration: 0.4, ease: "easeOut" }}>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-subtle)] mb-3">
                Typing Test Grades
              </p>
              <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
                {GRADES.map((g, i) => (
                  <div
                    key={g.grade}
                    className={`flex items-center gap-3 px-5 py-3.5 ${
                      i < GRADES.length - 1
                        ? "border-b border-[var(--color-border-muted)]"
                        : ""
                    }`}
                  >
                    <span
                      className={`w-8 h-8 rounded-full ring-1 flex items-center justify-center text-sm font-black shrink-0 ${g.color} ${g.ring}`}
                    >
                      {g.grade}
                    </span>
                    <span className="text-[var(--color-muted)] text-sm">
                      {g.threshold}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Requirements */}
            <motion.div variants={fadeUp} transition={{ duration: 0.4, ease: "easeOut" }}>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-subtle)] mb-3">
                Requirements
              </p>
              <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5 space-y-3">
                {REQUIREMENTS.map((r) => (
                  <div key={r} className="flex items-center gap-2.5">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span className="text-[var(--color-muted)] text-sm">{r}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CLI install */}
            <motion.div variants={fadeUp} transition={{ duration: 0.4, ease: "easeOut" }}>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-subtle)] mb-3">
                Install via CLI
              </p>
              <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[var(--color-border-muted)] bg-[var(--color-surface-alt)]">
                  <Terminal className="w-3.5 h-3.5 text-[var(--color-subtle)]" />
                  <span className="text-[10px] font-mono text-[var(--color-subtle)] uppercase tracking-wide">
                    Terminal
                  </span>
                </div>
                <div className="p-4 font-mono text-xs leading-7">
                  <div className="text-[var(--color-subtle)]"># VS Code CLI</div>
                  <div>
                    <span className="text-[var(--color-muted)]">code </span>
                    <span className="text-emerald-400">--install-extension</span>{" "}
                    <span className="text-white">cara.cara</span>
                  </div>
                  <div className="mt-2 text-[var(--color-subtle)]">
                    # Or: Ctrl+Shift+X → search &ldquo;Cara&rdquo;
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
