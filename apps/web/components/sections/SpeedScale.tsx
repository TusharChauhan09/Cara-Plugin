"use client";

import { motion } from "motion/react";

const TIERS = [
  { range: "0 – 29 wpm", label: "Beginner",   color: "bg-red-500",                    pct: 18,  text: "text-red-400"   },
  { range: "30 – 49 wpm", label: "Average",    color: "bg-amber-500",                  pct: 36,  text: "text-amber-400"  },
  { range: "50 – 69 wpm", label: "Good",       color: "bg-yellow-400",                 pct: 54,  text: "text-yellow-300" },
  { range: "70 – 89 wpm", label: "Fast",       color: "bg-blue-500",                   pct: 74,  text: "text-blue-400"  },
  { range: "90+ wpm",     label: "Elite",      color: "bg-gradient-to-r from-blue-500 to-purple-500", pct: 100, text: "text-purple-400" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export function SpeedScale() {
  return (
    <section className="py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-8 sm:p-10"
        >
          {/* Header row */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2">
                WPM Scale
              </p>
              <h2 className="text-2xl font-black text-white tracking-tight">
                Where do you rank?
              </h2>
            </div>
            <p className="text-[var(--color-muted)] text-sm max-w-xs leading-relaxed">
              The average developer types 40–60 wpm. Cara shows your tier live
              in the status bar as you code.
            </p>
          </div>

          {/* Bars */}
          <div className="space-y-5">
            {TIERS.map((t, i) => (
              <motion.div
                key={t.label}
                className="flex items-center gap-4"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4, ease: "easeOut" }}
              >
                <div className="w-24 text-right shrink-0">
                  <span className="text-xs font-mono text-[var(--color-subtle)]">
                    {t.range}
                  </span>
                </div>
                <div className="flex-1 h-2.5 bg-[var(--color-border)] rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${t.color}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${t.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.08, duration: 0.7, ease: "easeOut" }}
                  />
                </div>
                <div className={`w-20 text-sm font-bold shrink-0 ${t.text}`}>
                  {t.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
