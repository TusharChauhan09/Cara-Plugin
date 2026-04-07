/* ─────────────────────────────────────────────
   Cara VS Code Extension — Landing Page
   ───────────────────────────────────────────── */

/* ── Icons ─────────────────────────────────── */
function IconKeyboard() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <rect x="2" y="6" width="20" height="12" rx="2" />
      <path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M6 14h12" />
    </svg>
  );
}
function IconChart() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M3 3v18h18" />
      <path d="M18 9l-5 5-4-4-3 3" />
    </svg>
  );
}
function IconZap() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}
function IconCode() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  );
}
function IconCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
function IconGithub() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
    </svg>
  );
}
function IconArrow() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}
function IconDownload() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
    </svg>
  );
}

/* ── Nav ────────────────────────────────────── */
function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] backdrop-blur-xl bg-[#0a0a0a]/80">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white text-xs font-black">C</span>
          </div>
          <span className="font-bold text-white tracking-tight">Cara</span>
          <span className="text-white/20 text-xs font-mono ml-1">v0.0.1</span>
        </div>
        <div className="flex items-center gap-3">
          <a href="#docs" className="text-sm text-white/50 hover:text-white/90 transition-colors hidden sm:block">
            Docs
          </a>
          <a href="#features" className="text-sm text-white/50 hover:text-white/90 transition-colors hidden sm:block">
            Features
          </a>
          <a
            href="https://github.com/TusharChauhan09/Cara-Plugin"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/50 hover:text-white/90 transition-colors"
          >
            <IconGithub />
          </a>
          <a
            href="#install"
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors"
          >
            <IconDownload />
            Install
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ── Editor mockup ──────────────────────────── */
function EditorMockup() {
  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Window chrome */}
      <div className="rounded-xl overflow-hidden border border-white/10 shadow-2xl shadow-black/60">
        {/* Title bar */}
        <div className="bg-[#1e1e1e] px-4 py-2.5 flex items-center gap-2 border-b border-white/[0.06]">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          </div>
          <span className="ml-2 text-white/30 text-xs font-mono">index.ts — Cara</span>
        </div>

        {/* Code area */}
        <div className="bg-[#1e1e1e] px-6 py-5 font-mono text-sm leading-7">
          <div className="flex gap-4">
            {/* Line numbers */}
            <div className="text-white/20 text-right select-none" style={{ minWidth: "1.5rem" }}>
              {[1,2,3,4,5,6,7].map(n => <div key={n}>{n}</div>)}
            </div>
            {/* Code */}
            <div className="text-white/80">
              <div><span className="text-[#569cd6]">const</span> <span className="text-[#9cdcfe]">fetchUser</span> <span className="text-white/50">=</span> <span className="text-[#569cd6]">async</span> <span className="text-white/80">(</span><span className="text-[#9cdcfe]">id</span><span className="text-white/50">:</span> <span className="text-[#4ec9b0]">string</span><span className="text-white/80">)</span> <span className="text-[#569cd6]">=&gt;</span> <span className="text-white/80">{"{"}</span></div>
              <div>&nbsp;&nbsp;<span className="text-[#569cd6]">const</span> <span className="text-[#9cdcfe]">res</span> <span className="text-white/50">=</span> <span className="text-[#569cd6]">await</span> <span className="text-[#dcdcaa]">fetch</span><span className="text-white/80">(</span><span className="text-[#ce9178]">{"`/api/users/${id}`"}</span><span className="text-white/80">);</span></div>
              <div>&nbsp;&nbsp;<span className="text-[#c586c0]">if</span> <span className="text-white/80">(!</span><span className="text-[#9cdcfe]">res</span><span className="text-white/80">.</span><span className="text-[#9cdcfe]">ok</span><span className="text-white/80">)</span> <span className="text-[#c586c0]">throw</span> <span className="text-[#569cd6]">new</span> <span className="text-[#4ec9b0]">Error</span><span className="text-white/80">(</span><span className="text-[#9cdcfe]">res</span><span className="text-white/80">.</span><span className="text-[#9cdcfe]">statusText</span><span className="text-white/80">);</span></div>
              <div>&nbsp;&nbsp;<span className="text-[#c586c0]">return</span> <span className="text-[#9cdcfe]">res</span><span className="text-white/80">.</span><span className="text-[#dcdcaa]">json</span><span className="text-white/80">();</span></div>
              <div><span className="text-white/80">{"}"}</span><span className="text-white/50">;</span></div>
              <div />
              <div className="opacity-40 italic text-[#6a9955]">{'// typing test snippet above ↑'}</div>
            </div>
          </div>
        </div>

        {/* Status bar */}
        <div className="bg-[#0078d4] px-4 py-1 flex items-center justify-between text-white text-xs font-medium">
          <div className="flex items-center gap-4">
            <span>main</span>
            <span className="opacity-70">TypeScript</span>
          </div>
          <div className="flex items-center gap-4 opacity-90">
            <span className="flex items-center gap-1.5 font-semibold">
              <span>⌨</span>
              <span className="text-yellow-200">67 wpm</span>
              <span className="opacity-60 font-normal">· Good speed</span>
            </span>
            <span className="opacity-60">Ln 5, Col 3</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Hero ───────────────────────────────────── */
function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[300px] rounded-full bg-purple-600/8 blur-[100px]" />
      </div>

      <div className="relative max-w-6xl mx-auto">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            VS Code Extension · Free & Open Source
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-center text-4xl sm:text-5xl md:text-6xl font-black leading-[1.08] tracking-tight mb-6">
          <span className="text-white">Know how fast</span>
          <br />
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
            you actually type
          </span>
        </h1>

        <p className="text-center text-white/50 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          Cara lives in your VS Code status bar — tracking your real-time WPM,
          language time, and letting you run typing tests without leaving your editor.
        </p>

        {/* CTAs */}
        <div id="install" className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
          <a
            href="https://marketplace.visualstudio.com/items?itemName=cara.cara"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm transition-colors shadow-lg shadow-blue-600/25"
          >
            <IconDownload />
            Install from Marketplace
            <IconArrow />
          </a>
          <a
            href="https://github.com/TusharChauhan09/Cara-Plugin"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 hover:border-white/20 bg-white/[0.04] hover:bg-white/[0.07] text-white/80 font-semibold text-sm transition-all"
          >
            <IconGithub />
            View on GitHub
          </a>
        </div>

        {/* Editor mockup */}
        <EditorMockup />

        {/* Compat row */}
        <div className="flex flex-wrap justify-center gap-6 mt-10 text-white/30 text-xs font-mono">
          {["VS Code 1.109+", "TypeScript", "Python", "Rust", "Go", "30+ languages"].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <span className="text-green-500">✓</span> {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Features ───────────────────────────────── */
const FEATURES = [
  {
    icon: <IconZap />,
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
    title: "Real-time WPM",
    desc: "Your typing speed appears live in the VS Code status bar, recalculated every 1.5 seconds using a rolling 1-minute window. Click it to open your full stats.",
  },
  {
    icon: <IconKeyboard />,
    color: "text-purple-400",
    bg: "bg-purple-500/10 border-purple-500/20",
    title: "In-editor Typing Test",
    desc: "Run a typing test directly inside VS Code. A real code snippet opens in a new tab — type it out and get your WPM, accuracy, grade, and error breakdown instantly.",
  },
  {
    icon: <IconChart />,
    color: "text-green-400",
    bg: "bg-green-500/10 border-green-500/20",
    title: "Language Breakdown",
    desc: "Cara tracks how long you spend in each language per session. The Statistics panel shows a ranked table with time, percentage bars, and language icons.",
  },
  {
    icon: <IconCode />,
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
    title: "Smart Status Bar",
    desc: "The status bar icon changes based on your speed: keyboard at normal pace, rocket at 60+ wpm, lightning bolt at 90+ wpm. Speed tier labels from Beginner to Elite.",
  },
];

function Features() {
  return (
    <section id="features" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-3">Features</p>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Everything you need to improve
          </h2>
          <p className="mt-3 text-white/40 max-w-md mx-auto">
            Four focused features that work silently in the background — no setup, no dashboards to open.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="group rounded-2xl border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.04] p-6 transition-all"
            >
              <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl border ${f.bg} ${f.color} mb-4`}>
                {f.icon}
              </div>
              <h3 className="text-white font-bold text-lg mb-2">{f.title}</h3>
              <p className="text-white/45 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Speed Scale ────────────────────────────── */
const SPEEDS = [
  { range: "0 – 29", label: "Beginner", color: "bg-red-500", text: "text-red-400", w: "w-[20%]" },
  { range: "30 – 49", label: "Average", color: "bg-amber-500", text: "text-amber-400", w: "w-[36%]" },
  { range: "50 – 69", label: "Good", color: "bg-yellow-400", text: "text-yellow-300", w: "w-[52%]" },
  { range: "70 – 89", label: "Fast", color: "bg-blue-500", text: "text-blue-400", w: "w-[74%]" },
  { range: "90+", label: "Elite", color: "bg-gradient-to-r from-blue-500 to-purple-500", text: "text-purple-400", w: "w-full" },
];

function SpeedScale() {
  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-8 sm:p-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <p className="text-blue-400 text-xs font-bold uppercase tracking-widest mb-1">WPM Scale</p>
              <h2 className="text-2xl font-black text-white">Where do you rank?</h2>
            </div>
            <p className="text-white/40 text-sm max-w-xs">
              Average developer types 40–60 wpm. Professional typists reach 80+.
            </p>
          </div>
          <div className="space-y-4">
            {SPEEDS.map((s) => (
              <div key={s.label} className="flex items-center gap-4">
                <div className="w-16 text-right text-xs font-mono text-white/30 shrink-0">{s.range}</div>
                <div className="flex-1 h-2 bg-white/[0.06] rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${s.color} ${s.w}`} />
                </div>
                <div className={`w-20 text-sm font-bold ${s.text}`}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── How it works ───────────────────────────── */
const STEPS = [
  {
    num: "01",
    title: "Install the extension",
    desc: "Search for \"Cara\" in the VS Code Extension Marketplace, or install it via the command line with the vsce tool.",
  },
  {
    num: "02",
    title: "Start coding normally",
    desc: "Cara activates automatically after VS Code loads. Your WPM appears in the bottom-left status bar as you type.",
  },
  {
    num: "03",
    title: "Explore your stats",
    desc: "Click the WPM display or run \"Cara: Show Statistics\" from the command palette to see your language breakdown and speed history.",
  },
];

function HowItWorks() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-purple-400 text-xs font-bold uppercase tracking-widest mb-3">How it works</p>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Up and running in seconds</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {STEPS.map((s, i) => (
            <div key={s.num} className="relative rounded-2xl border border-white/[0.07] bg-white/[0.02] p-7">
              {i < STEPS.length - 1 && (
                <div className="hidden md:block absolute top-10 -right-2 text-white/10 text-lg">→</div>
              )}
              <div className="text-4xl font-black text-white/8 mb-4 font-mono">{s.num}</div>
              <h3 className="text-white font-bold text-lg mb-2">{s.title}</h3>
              <p className="text-white/40 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Documentation ──────────────────────────── */
const COMMANDS = [
  { cmd: "Cara: Start Typing Test", desc: "Opens a new file with a random code snippet to type. Timer starts on first keystroke." },
  { cmd: "Cara: Reset Typing Test", desc: "Abandons the current test and immediately starts a fresh one with a new snippet." },
  { cmd: "Cara: Show Statistics", desc: "Opens the Statistics panel — WPM, total coding time, and per-language breakdown." },
  { cmd: "Cara: Show Status Bar", desc: "Restores the Cara status bar item if it was hidden or not yet visible." },
];

const CONFIG = [
  {
    key: "cara.showSpeedInStatusBar",
    type: "boolean",
    default: "true",
    desc: "Show or hide the live WPM counter in the VS Code status bar.",
  },
];

function Docs() {
  return (
    <section id="docs" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-green-400 text-xs font-bold uppercase tracking-widest mb-3">Documentation</p>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">Commands & configuration</h2>
          <p className="mt-3 text-white/40 max-w-sm mx-auto text-sm">
            Open the Command Palette with <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-xs text-white/60">Ctrl+Shift+P</kbd> (or <kbd className="px-1.5 py-0.5 rounded bg-white/10 font-mono text-xs text-white/60">⌘⇧P</kbd> on Mac) to access all commands.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Commands */}
          <div>
            <h3 className="text-white/50 text-xs font-bold uppercase tracking-widest mb-4">Commands</h3>
            <div className="rounded-2xl border border-white/[0.07] overflow-hidden">
              {COMMANDS.map((c, i) => (
                <div
                  key={c.cmd}
                  className={`p-5 ${i < COMMANDS.length - 1 ? "border-b border-white/[0.06]" : ""}`}
                >
                  <div className="flex items-start gap-3 mb-1.5">
                    <span className="mt-0.5 text-green-500 shrink-0"><IconCheck /></span>
                    <code className="text-blue-300 text-xs font-mono font-semibold leading-relaxed">{c.cmd}</code>
                  </div>
                  <p className="text-white/40 text-sm pl-7 leading-relaxed">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Config + Typing test info */}
          <div className="flex flex-col gap-6">
            {/* Settings */}
            <div>
              <h3 className="text-white/50 text-xs font-bold uppercase tracking-widest mb-4">Configuration</h3>
              <div className="rounded-2xl border border-white/[0.07] overflow-hidden">
                {CONFIG.map((c) => (
                  <div key={c.key} className="p-5">
                    <div className="flex items-center justify-between gap-3 mb-1.5">
                      <code className="text-amber-300 text-xs font-mono font-semibold">{c.key}</code>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-white/25 text-xs font-mono">{c.type}</span>
                        <span className="px-1.5 py-0.5 rounded bg-white/[0.06] text-white/40 text-xs font-mono">{c.default}</span>
                      </div>
                    </div>
                    <p className="text-white/40 text-sm leading-relaxed">{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Typing test grades */}
            <div>
              <h3 className="text-white/50 text-xs font-bold uppercase tracking-widest mb-4">Typing Test Grades</h3>
              <div className="rounded-2xl border border-white/[0.07] overflow-hidden">
                {[
                  { grade: "S", threshold: "98%+ accuracy", color: "text-green-400 bg-green-500/10" },
                  { grade: "A", threshold: "95 – 97% accuracy", color: "text-blue-400 bg-blue-500/10" },
                  { grade: "B", threshold: "90 – 94% accuracy", color: "text-purple-400 bg-purple-500/10" },
                  { grade: "C", threshold: "80 – 89% accuracy", color: "text-amber-400 bg-amber-500/10" },
                  { grade: "D", threshold: "Below 80% accuracy", color: "text-red-400 bg-red-500/10" },
                ].map((g, i, arr) => (
                  <div key={g.grade} className={`flex items-center gap-4 px-5 py-3.5 ${i < arr.length - 1 ? "border-b border-white/[0.06]" : ""}`}>
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-black shrink-0 ${g.color}`}>{g.grade}</span>
                    <span className="text-white/40 text-sm">{g.threshold}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Install block */}
        <div className="mt-8 rounded-2xl border border-white/[0.07] bg-white/[0.02] p-7">
          <h3 className="text-white/50 text-xs font-bold uppercase tracking-widest mb-5">Requirements & Installation</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <p className="text-white/60 text-sm font-semibold mb-3">Requirements</p>
              <ul className="space-y-2">
                {["VS Code 1.109 or later", "No external runtime required", "No account or login needed", "Works fully offline"].map((r) => (
                  <li key={r} className="flex items-center gap-2 text-white/40 text-sm">
                    <span className="text-green-500"><IconCheck /></span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-white/60 text-sm font-semibold mb-3">Install via CLI</p>
              <div className="rounded-xl bg-black/40 border border-white/[0.06] p-4">
                <code className="text-green-400 text-xs font-mono block leading-7">
                  <span className="text-white/25"># Via VS Code CLI</span><br />
                  <span className="text-white/60">code </span>--install-extension cara.cara<br />
                  <br />
                  <span className="text-white/25"># Or search in Extensions tab</span><br />
                  <span className="text-white/60">Ctrl+Shift+X </span>→ search &quot;Cara&quot;
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Footer ─────────────────────────────────── */
function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-10 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white text-xs font-black">C</span>
          </div>
          <span className="text-white/40 text-sm">Cara · MIT License</span>
        </div>
        <div className="flex items-center gap-6 text-white/30 text-sm">
          <a href="#features" className="hover:text-white/60 transition-colors">Features</a>
          <a href="#docs" className="hover:text-white/60 transition-colors">Docs</a>
          <a
            href="https://github.com/TusharChauhan09/Cara-Plugin"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/60 transition-colors flex items-center gap-1.5"
          >
            <IconGithub />
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ── Page ───────────────────────────────────── */
export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Nav />
      <Hero />
      <Features />
      <SpeedScale />
      <HowItWorks />
      <Docs />
      <Footer />
    </div>
  );
}
