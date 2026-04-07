"use client";

import { motion } from "motion/react";
import { ArrowRight, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

function EditorMockup() {
  return (
    <motion.div
      variants={fadeUp}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="rounded-xl overflow-hidden border border-[var(--color-border)] shadow-2xl shadow-black/80">
        {/* Title bar */}
        <div className="bg-[#111111] px-4 py-2.5 flex items-center gap-3 border-b border-[var(--color-border-muted)]">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          </div>
          <span className="text-[var(--color-subtle)] text-xs font-mono mx-auto">
            index.ts — workspace
          </span>
        </div>

        {/* Code */}
        <div className="bg-[#0d0d0d] px-5 py-5 font-mono text-[13px] leading-[1.7]">
          <div className="flex gap-5">
            <div className="text-[var(--color-subtle)] text-right select-none leading-[1.7]" style={{ minWidth: "1.25rem" }}>
              {[1,2,3,4,5,6,7,8].map((n) => <div key={n}>{n}</div>)}
            </div>
            <div className="text-white/80 overflow-x-auto">
              <div>
                <span className="text-[#569cd6]">const</span>{" "}
                <span className="text-[#9cdcfe]">fetchUser</span>{" "}
                <span className="text-white/40">=</span>{" "}
                <span className="text-[#569cd6]">async</span>{" "}
                <span className="text-white/70">(</span>
                <span className="text-[#9cdcfe]">id</span>
                <span className="text-white/40">: </span>
                <span className="text-[#4ec9b0]">string</span>
                <span className="text-white/70">) =&gt; {"{"}</span>
              </div>
              <div>
                {"  "}
                <span className="text-[#569cd6]">const</span>{" "}
                <span className="text-[#9cdcfe]">res</span>{" "}
                <span className="text-white/40">=</span>{" "}
                <span className="text-[#569cd6]">await</span>{" "}
                <span className="text-[#dcdcaa]">fetch</span>
                <span className="text-white/70">(</span>
                <span className="text-[#ce9178]">{"`/api/users/${id}`"}</span>
                <span className="text-white/70">);</span>
              </div>
              <div>
                {"  "}
                <span className="text-[#c586c0]">if</span>
                <span className="text-white/70"> (!</span>
                <span className="text-[#9cdcfe]">res</span>
                <span className="text-white/70">.</span>
                <span className="text-[#9cdcfe]">ok</span>
                <span className="text-white/70">)</span>{" "}
                <span className="text-[#c586c0]">throw</span>{" "}
                <span className="text-[#569cd6]">new</span>{" "}
                <span className="text-[#4ec9b0]">Error</span>
                <span className="text-white/70">(</span>
                <span className="text-[#9cdcfe]">res</span>
                <span className="text-white/70">.</span>
                <span className="text-[#9cdcfe]">statusText</span>
                <span className="text-white/70">);</span>
              </div>
              <div>
                {"  "}
                <span className="text-[#c586c0]">return</span>{" "}
                <span className="text-[#9cdcfe]">res</span>
                <span className="text-white/70">.</span>
                <span className="text-[#dcdcaa]">json</span>
                <span className="text-white/70">();</span>
              </div>
              <div>
                <span className="text-white/70">{"}"}</span>
                <span className="text-white/40">;</span>
              </div>
              <div />
              <div className="text-[var(--color-subtle)] italic">
                {"// ↑ type this snippet — timer starts on first keystroke"}
              </div>
              <div className="flex items-center gap-1">
                <span className="inline-block w-0.5 h-[1em] bg-blue-400 animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Status bar */}
        <div className="bg-[#1a1a2e] px-4 py-1.5 flex items-center justify-between text-xs font-medium border-t border-white/5">
          <div className="flex items-center gap-4 text-white/50">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              main
            </span>
            <span>TypeScript</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-semibold">
              <span className="text-blue-400">⌨</span>
              <span className="text-white">67</span>
              <span className="text-[var(--color-subtle)]">wpm</span>
              <span className="text-[var(--color-subtle)] font-normal">· Good speed</span>
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-16 px-6 overflow-hidden">
      {/* Radial glow background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-[0.07]"
          style={{ background: "radial-gradient(circle, #3b82f6, transparent 70%)" }}
        />
        <div
          className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] rounded-full opacity-[0.04]"
          style={{ background: "radial-gradient(circle, #8b5cf6, transparent 70%)" }}
        />
        {/* subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage:
              "linear-gradient(var(--color-border) 1px, transparent 1px), linear-gradient(90deg, var(--color-border) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <motion.div
        className="relative w-full max-w-6xl mx-auto flex flex-col items-center gap-8"
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.1 }}
      >
        {/* Badge */}
        <motion.div variants={fadeUp}>
          <Badge variant="default">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            VS Code Extension · Free &amp; Open Source
          </Badge>
        </motion.div>

        {/* Headline */}
        <motion.div variants={fadeUp} className="text-center">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-[1.05] tracking-tight text-white">
            Know exactly
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #06b6d4 100%)" }}
            >
              how fast you type
            </span>
          </h1>
        </motion.div>

        {/* Subtext */}
        <motion.p
          variants={fadeUp}
          className="text-center text-[var(--color-muted)] text-lg max-w-lg leading-relaxed"
        >
          Cara lives in your VS Code status bar — tracking real-time WPM,
          language time, and running typing tests without leaving your editor.
        </motion.p>

        {/* CTAs */}
        <motion.div
          id="install"
          variants={fadeUp}
          className="flex flex-col sm:flex-row items-center gap-3"
        >
          <a
            href="https://marketplace.visualstudio.com/items?itemName=cara.cara"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg">
              <Download className="w-4 h-4" />
              Install from Marketplace
              <ArrowRight className="w-4 h-4" />
            </Button>
          </a>
          <a
            href="https://github.com/TusharChauhan09/Cara-Plugin"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="lg">
              View on GitHub
            </Button>
          </a>
        </motion.div>

        {/* Compat chips */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap justify-center gap-x-6 gap-y-2"
        >
          {[
            "VS Code 1.109+",
            "TypeScript",
            "Python",
            "Rust",
            "Go",
            "30+ languages",
          ].map((item) => (
            <span
              key={item}
              className="flex items-center gap-1.5 text-xs text-[var(--color-subtle)] font-mono"
            >
              <span className="text-emerald-500">✓</span>
              {item}
            </span>
          ))}
        </motion.div>

        {/* Editor mockup */}
        <motion.div variants={fadeUp} className="w-full">
          <EditorMockup />
        </motion.div>
      </motion.div>
    </section>
  );
}
