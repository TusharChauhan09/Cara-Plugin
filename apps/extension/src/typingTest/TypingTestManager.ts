import * as vscode from "vscode";
import { formatDuration, computeWpm } from "../utils/metrics.js";
import type { StatusBarProvider } from "../StatusBarProvider.js";

/* ── Snippet library ── */
const SNIPPETS = [
  {
    label: "Async Fetch",
    language: "typescript",
    lines: [
      "const fetchUser = async (id: string) => {",
      "  const res = await fetch(`/api/users/${id}`);",
      "  if (!res.ok) throw new Error(res.statusText);",
      "  return res.json();",
      "};",
    ],
  },
  {
    label: "React Component",
    language: "typescriptreact",
    lines: [
      "export function Button({ label, onClick }: Props) {",
      "  return (",
      '    <button className="btn" onClick={onClick}>',
      "      {label}",
      "    </button>",
      "  );",
      "}",
    ],
  },
  {
    label: "Array Helpers",
    language: "typescript",
    lines: [
      "function unique<T>(arr: T[]): T[] {",
      "  return [...new Set(arr)];",
      "}",
      "",
      "function chunk<T>(arr: T[], size: number): T[][] {",
      "  const result: T[][] = [];",
      "  for (let i = 0; i < arr.length; i += size) {",
      "    result.push(arr.slice(i, i + size));",
      "  }",
      "  return result;",
      "}",
    ],
  },
];

function pickSnippet() {
  return SNIPPETS[Math.floor(Math.random() * SNIPPETS.length)];
}

/* ── Manager ── */
export class TypingTestManager implements vscode.Disposable {
  private statusBar: StatusBarProvider;
  private panel: vscode.WebviewPanel | undefined;
  private docUri: vscode.Uri | undefined;
  private expectedText = "";
  private commentBlockLength = 0;
  private startTimeMs = 0;
  private totalKeysPressed = 0;
  private backspaceCount = 0;
  private completed = false;
  private subscription: vscode.Disposable | undefined;

  constructor(statusBar: StatusBarProvider) {
    this.statusBar = statusBar;
  }

  isTypingTestDocument(uri: vscode.Uri): boolean {
    return this.docUri?.toString() === uri.toString();
  }

  async start(): Promise<void> {
    const snippet = pickSnippet();
    const expectedText = snippet.lines.join("\n");
    this.expectedText = expectedText;
    this.startTimeMs = 0;
    this.totalKeysPressed = 0;
    this.backspaceCount = 0;
    this.completed = false;

    // Build the document: instructions block (comments) + blank area to type in
    const header = buildHeader(snippet.lines);
    this.commentBlockLength = header.length;

    const doc = await vscode.workspace.openTextDocument({
      content: header,
      language: snippet.language,
    });
    this.docUri = doc.uri;

    const editor = await vscode.window.showTextDocument(doc, {
      viewColumn: vscode.ViewColumn.One,
    });

    // Place cursor at end (typing area)
    const endPos = doc.positionAt(header.length);
    editor.selection = new vscode.Selection(endPos, endPos);

    // Listen for changes
    this.subscription?.dispose();
    this.subscription = vscode.workspace.onDidChangeTextDocument((e) => {
      if (e.document.uri.toString() !== this.docUri?.toString()) return;
      this.onDocumentChange(e);
    });

    this.updateStatusBar();
  }

  private onDocumentChange(e: vscode.TextDocumentChangeEvent): void {
    if (this.completed) return;

    const fullText = e.document.getText();
    const typingRegion = fullText.slice(this.commentBlockLength);

    for (const change of e.contentChanges) {
      const inTypingArea = change.rangeOffset >= this.commentBlockLength;
      if (!inTypingArea) continue;

      if (change.rangeLength > 0) {
        this.backspaceCount += change.rangeLength;
      }
      if (change.text.length > 0) {
        this.totalKeysPressed += change.text.length;
        if (this.startTimeMs === 0) {
          this.startTimeMs = Date.now();
        }
      }
    }

    this.updateStatusBar(typingRegion);

    // Check completion
    if (
      typingRegion.length >= this.expectedText.length &&
      this.startTimeMs > 0
    ) {
      this.onComplete(typingRegion);
    }
  }

  private onComplete(typedText: string): void {
    this.completed = true;
    const durationMs = Date.now() - this.startTimeMs;
    const correct = this.countCorrectChars(typedText);
    const totalTyped = typedText.length;
    const wpm = computeWpm(correct, durationMs);
    const accuracy =
      totalTyped > 0 ? Math.round((correct / totalTyped) * 100) : 100;
    const errors = totalTyped - correct;

    this.showResultsPanel({
      duration: formatDuration(durationMs),
      durationMs,
      wpm,
      accuracy,
      errors,
      backspaces: this.backspaceCount,
      totalChars: totalTyped,
      correctChars: correct,
    });
  }

  private showResultsPanel(stats: {
    duration: string;
    durationMs: number;
    wpm: number;
    accuracy: number;
    errors: number;
    backspaces: number;
    totalChars: number;
    correctChars: number;
  }): void {
    // Restore normal WPM display
    this.statusBar.setWpm(0);

    const panel = vscode.window.createWebviewPanel(
      "caraTypingResults",
      "Cara — Typing Test Results",
      vscode.ViewColumn.Beside,
      { enableScripts: false },
    );

    const grade =
      stats.accuracy >= 98
        ? "S"
        : stats.accuracy >= 95
          ? "A"
          : stats.accuracy >= 90
            ? "B"
            : stats.accuracy >= 80
              ? "C"
              : "D";
    const gradeColor = {
      S: "#10b981",
      A: "#3b82f6",
      B: "#8b5cf6",
      C: "#f59e0b",
      D: "#ef4444",
    }[grade];
    const speedLabel =
      stats.wpm >= 80
        ? "Blazing fast!"
        : stats.wpm >= 60
          ? "Great speed!"
          : stats.wpm >= 40
            ? "Solid pace"
            : "Keep practicing!";

    const accBarWidth = Math.max(stats.accuracy, 2);
    const accBarColor =
      stats.accuracy >= 95 ? "#10b981" : stats.accuracy >= 80 ? "#f59e0b" : "#ef4444";

    panel.webview.html = /* html */ `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Cara — Typing Test Results</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{
  --bg:var(--vscode-editor-background,#0d1117);
  --sf:var(--vscode-editorWidget-background,#161b22);
  --bd:var(--vscode-widget-border,#30363d);
  --tx:var(--vscode-foreground,#e6edf3);
  --t2:var(--vscode-descriptionForeground,#7d8590);
  --t3:#484f58;
}
body{
  font-family:var(--vscode-font-family,-apple-system,'Segoe UI',sans-serif);
  color:var(--tx);background:var(--bg);
  padding:0;line-height:1.5;max-width:500px;
}

/* Header */
.header{
  padding:24px 32px 20px;
  border-bottom:1px solid var(--bd);
  position:relative;overflow:hidden;
}
.header::before{
  content:"";position:absolute;top:0;left:0;right:0;height:3px;
  background:linear-gradient(90deg,${gradeColor},${gradeColor}88);
}
.header-row{display:flex;align-items:center;justify-content:space-between}
h1{font-size:18px;font-weight:700}
h1 .brand{color:#3b82f6;font-weight:800}
.sub{font-size:12px;color:var(--t2);margin-top:3px}

/* Grade badge */
.grade-wrap{display:flex;flex-direction:column;align-items:center;gap:4px}
.grade{
  width:56px;height:56px;border-radius:50%;
  display:flex;align-items:center;justify-content:center;
  font-size:26px;font-weight:900;color:#fff;
  background:${gradeColor};
  box-shadow:0 0 20px ${gradeColor}55;
}
.grade-tag{font-size:10px;font-weight:700;color:${gradeColor};text-transform:uppercase;letter-spacing:.5px}

/* Stats grid */
.section{padding:20px 32px}
.section-label{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:1px;color:var(--t3);margin-bottom:10px}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:16px}
.stat{
  background:var(--sf);border:1px solid var(--bd);
  border-radius:8px;padding:13px 15px;
  position:relative;overflow:hidden;
}
.stat::after{
  content:"";position:absolute;
  bottom:0;left:0;right:0;height:2px;
  background:var(--stat-accent,transparent);
}
.stat.blue{--stat-accent:#3b82f6}
.stat.green{--stat-accent:#10b981}
.stat.amber{--stat-accent:#f59e0b}
.stat.red{--stat-accent:#ef4444}
.stat-l{font-size:10px;text-transform:uppercase;letter-spacing:.7px;color:var(--t2);margin-bottom:4px;font-weight:700}
.stat-v{font-size:22px;font-weight:800;font-variant-numeric:tabular-nums;line-height:1.1}
.stat-v .u{font-size:11px;font-weight:500;color:var(--t2);margin-left:2px}
.stat.blue .stat-v{color:#3b82f6}
.stat.green .stat-v{color:#10b981}
.stat.amber .stat-v{color:#f59e0b}
.stat.red .stat-v{color:#ef4444}

/* Accuracy bar */
.acc-row{margin-bottom:16px}
.acc-label{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px}
.acc-label span{font-size:11px;font-weight:600;color:var(--t2);text-transform:uppercase;letter-spacing:.7px}
.acc-label strong{font-size:13px;font-weight:800;color:${accBarColor}}
.acc-track{height:8px;background:var(--bd);border-radius:4px;overflow:hidden}
.acc-fill{height:100%;width:${accBarWidth}%;background:${accBarColor};border-radius:4px}

/* Footer */
.footer{
  padding:14px 32px;border-top:1px solid var(--bd);
  font-size:11px;color:var(--t3);text-align:center;
}
.footer b{color:var(--t2)}
</style>
</head><body>

<div class="header">
  <div class="header::before"></div>
  <div class="header-row">
    <div>
      <h1><span class="brand">Cara</span> Typing Test</h1>
      <p class="sub">${speedLabel} · Test complete</p>
    </div>
    <div class="grade-wrap">
      <div class="grade">${grade}</div>
      <div class="grade-tag">Grade</div>
    </div>
  </div>
</div>

<div class="section">
  <div class="section-label">Results</div>

  <div class="acc-row">
    <div class="acc-label">
      <span>Accuracy</span>
      <strong>${stats.accuracy}%</strong>
    </div>
    <div class="acc-track"><div class="acc-fill"></div></div>
  </div>

  <div class="grid">
    <div class="stat blue">
      <div class="stat-l">Speed</div>
      <div class="stat-v">${stats.wpm}<span class="u">wpm</span></div>
    </div>
    <div class="stat amber">
      <div class="stat-l">Duration</div>
      <div class="stat-v">${stats.duration}</div>
    </div>
    <div class="stat green">
      <div class="stat-l">Correct</div>
      <div class="stat-v">${stats.correctChars}<span class="u">/ ${stats.totalChars}</span></div>
    </div>
    <div class="stat red">
      <div class="stat-l">Errors</div>
      <div class="stat-v">${stats.errors}</div>
    </div>
  </div>

  <div class="stat" style="margin-bottom:0">
    <div class="stat-l">Backspaces used</div>
    <div class="stat-v" style="font-size:18px">${stats.backspaces}</div>
  </div>
</div>

<div class="footer">
  Open the Command Palette and run <b>Cara: Start Typing Test</b> to try again.
</div>

</body></html>`;
  }

  private updateStatusBar(typedSoFar?: string): void {
    if (this.completed) return;

    const now = Date.now();
    const durationMs = this.startTimeMs > 0 ? now - this.startTimeMs : 0;
    const durationStr = formatDuration(durationMs);

    let wpm = 0;
    let accuracy = 100;
    let errors = 0;

    if (typedSoFar !== undefined && this.startTimeMs > 0) {
      const correct = this.countCorrectChars(typedSoFar);
      const totalTyped = typedSoFar.length;
      wpm = computeWpm(correct, durationMs);
      if (totalTyped > 0) {
        accuracy = Math.round((correct / totalTyped) * 100);
        errors = totalTyped - correct;
      }
    }

    const progress = typedSoFar
      ? Math.min(
          100,
          Math.round((typedSoFar.length / this.expectedText.length) * 100),
        )
      : 0;

    this.statusBar.setTypingTestStats({
      duration: durationStr,
      wpm,
      accuracy,
      errors,
      backspaces: this.backspaceCount,
      progress,
    });
  }

  private countCorrectChars(typed: string): number {
    const expected = this.expectedText;
    let correct = 0;
    const len = Math.min(typed.length, expected.length);
    for (let i = 0; i < len; i++) {
      if (typed[i] === expected[i]) correct++;
    }
    return correct;
  }

  reset(): void {
    this.completed = false;
    this.subscription?.dispose();
    this.subscription = undefined;
    this.docUri = undefined;
    this.start();
  }

  dispose(): void {
    this.subscription?.dispose();
    this.subscription = undefined;
    this.panel?.dispose();
    this.panel = undefined;
    this.docUri = undefined;
  }
}

/* ── Helpers ── */

function buildHeader(promptLines: string[]): string {
  const bar = "// " + "─".repeat(58);
  const lines = [
    bar,
    "//",
    "//   Cara Typing Test",
    "//   Type the snippet below as fast and accurately as you can.",
    "//   Timer starts on your first keystroke — results appear when done.",
    "//",
    bar,
    "//",
    ...promptLines.map((l) => "//   " + l),
    "//",
    bar,
    "//   Type below ↓",
    bar,
    "",
  ];
  return lines.join("\n");
}
