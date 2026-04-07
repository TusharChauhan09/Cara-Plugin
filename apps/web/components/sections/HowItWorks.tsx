"use client";

import { motion } from "motion/react";
import { Download, Code2, BarChart2 } from "lucide-react";

const STEPS = [
  {
    num: "01",
    icon: Download,
    color: "text-blue-400",
    iconBg: "bg-blue-950/60 border-blue-900/40",
    title: "Install the extension",
    description:
      'Search "Cara" in the VS Code Extensions tab or install it via the Marketplace. No account, no configuration required.',
  },
  {
    num: "02",
    icon: Code2,
    color: "text-purple-400",
    iconBg: "bg-purple-950/60 border-purple-900/40",
    title: "Code like normal",
    description:
      "Cara activates automatically after VS Code starts. Your live WPM appears in the status bar as soon as you start typing.",
  },
  {
    num: "03",
    icon: BarChart2,
    color: "text-emerald-400",
    iconBg: "bg-emerald-950/60 border-emerald-900/40",
    title: "Explore your stats",
    description:
      'Click the WPM counter or run "Cara: Show Statistics" from the Command Palette to see your language breakdown and speed trends.',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-6">
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
          <p className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-3">
            How it works
          </p>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Up and running in 30 seconds
          </h2>
        </motion.div>

        {/* Steps */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 relative"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-10 left-[calc(33.33%+1rem)] right-[calc(33.33%+1rem)] h-px bg-gradient-to-r from-[var(--color-border)] via-[var(--color-subtle)] to-[var(--color-border)]" />

          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                variants={fadeUp}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative flex flex-col rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-7 hover:border-[var(--color-subtle)] hover:bg-[var(--color-surface-alt)] transition-all duration-300"
              >
                {/* Step number */}
                <span className="absolute top-5 right-5 text-5xl font-black text-white/[0.04] select-none font-mono leading-none">
                  {step.num}
                </span>

                {/* Icon */}
                <div
                  className={`w-11 h-11 rounded-xl border flex items-center justify-center mb-5 ${step.iconBg}`}
                >
                  <Icon className={`w-5 h-5 ${step.color}`} />
                </div>

                <h3 className="text-white font-bold text-lg mb-2 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-[var(--color-muted)] text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
