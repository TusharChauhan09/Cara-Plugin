"use client";

import { motion } from "motion/react";
import { Zap, Keyboard, BarChart2, Code2 } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const FEATURES = [
  {
    icon: Zap,
    color: "text-blue-400",
    iconBg: "bg-blue-950/60 border-blue-900/50",
    accent: "group-hover:border-blue-900/80",
    title: "Real-time WPM",
    description:
      "Your typing speed appears live in the VS Code status bar, recalculated every 1.5 s over a rolling 1-minute window. Click it to open the full stats panel.",
    tag: "Always on",
  },
  {
    icon: Keyboard,
    color: "text-purple-400",
    iconBg: "bg-purple-950/60 border-purple-900/50",
    accent: "group-hover:border-purple-900/80",
    title: "In-editor Typing Test",
    description:
      "Run a typing test right inside VS Code. A real code snippet opens in a new tab — type it out and immediately get WPM, accuracy, grade, and error breakdown.",
    tag: "No browser needed",
  },
  {
    icon: BarChart2,
    color: "text-emerald-400",
    iconBg: "bg-emerald-950/60 border-emerald-900/50",
    accent: "group-hover:border-emerald-900/80",
    title: "Language Breakdown",
    description:
      "Cara tracks how long you spend in each language per session. The Statistics panel shows a ranked table with time, percentage bars, and language icons.",
    tag: "30+ languages",
  },
  {
    icon: Code2,
    color: "text-amber-400",
    iconBg: "bg-amber-950/60 border-amber-900/50",
    accent: "group-hover:border-amber-900/80",
    title: "Smart Status Bar",
    description:
      "The icon changes based on your speed — keyboard at normal pace, rocket at 60+ wpm, lightning at 90+ wpm. Speed labels from Beginner to Elite keep you motivated.",
    tag: "Adaptive icons",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="text-xs font-bold uppercase tracking-widest text-blue-400 mb-3">
            Features
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Four tools. Zero friction.
          </h2>
          <p className="mt-3 text-[var(--color-muted)] max-w-md mx-auto text-sm leading-relaxed">
            Cara works silently as you code — no dashboards to set up, no data
            to manually enter.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={stagger}
        >
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <motion.div key={f.title} variants={fadeUp} transition={{ duration: 0.5, ease: "easeOut" }}>
                <Card
                  className={`group h-full transition-all duration-300 border-[var(--color-border)] hover:bg-[var(--color-surface-alt)] ${f.accent}`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div
                        className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${f.iconBg}`}
                      >
                        <Icon className={`w-5 h-5 ${f.color}`} />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--color-subtle)] border border-[var(--color-border)] rounded-full px-2 py-0.5 mt-1">
                        {f.tag}
                      </span>
                    </div>
                    <CardTitle className="text-white text-lg">{f.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed">
                      {f.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
