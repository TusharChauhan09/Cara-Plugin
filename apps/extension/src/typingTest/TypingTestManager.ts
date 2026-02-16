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

    panel.webview.html = /* html */ `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Typing Test Results</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--bg:var(--vscode-editor-background,#0d1117);--sf:var(--vscode-editorWidget-background,#161b22);--bd:var(--vscode-widget-border,#21262d);--tx:var(--vscode-foreground,#e6edf3);--t2:var(--vscode-descriptionForeground,#7d8590)}
body{font-family:var(--vscode-font-family,-apple-system,'Segoe UI',sans-serif);color:var(--tx);background:var(--bg);padding:36px 40px;line-height:1.5;max-width:520px;margin:0 auto}

h1{font-size:22px;font-weight:700;margin-bottom:6px}
h1 b{color:#3b82f6}
.sub{font-size:13px;color:var(--t2);margin-bottom:28px}

.grade-box{text-align:center;margin-bottom:28px}
.grade{display:inline-flex;align-items:center;justify-content:center;width:80px;height:80px;border-radius:50%;font-size:36px;font-weight:900;color:#fff;background:${gradeColor};box-shadow:0 0 24px ${gradeColor}44}
.grade-label{margin-top:8px;font-size:14px;color:var(--t2)}

.grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:24px}
.stat{background:var(--sf);border:1px solid var(--bd);border-radius:10px;padding:16px 18px}
.stat-l{font-size:11px;text-transform:uppercase;letter-spacing:.6px;color:var(--t2);margin-bottom:3px;font-weight:600}
.stat-v{font-size:24px;font-weight:800;font-variant-numeric:tabular-nums}
.stat-v .u{font-size:12px;font-weight:500;color:var(--t2);margin-left:2px}
.stat.blue .stat-v{color:#3b82f6}
.stat.green .stat-v{color:#10b981}
.stat.red .stat-v{color:#ef4444}
.stat.purple .stat-v{color:#8b5cf6}

.tip{text-align:center;font-size:13px;color:var(--t2);margin-top:20px;padding-top:16px;border-top:1px solid var(--bd)}
</style>
</head><body>

<h1><b>Cara</b> Typing Test</h1>
<p class="sub">Test complete! Here are your results.</p>

<div class="grade-box">
  <div class="grade">${grade}</div>
  <div class="grade-label">${speedLabel}</div>
</div>

<div class="grid">
  <div class="stat blue">
    <div class="stat-l">Speed</div>
    <div class="stat-v">${stats.wpm}<span class="u">wpm</span></div>
  </div>
  <div class="stat green">
    <div class="stat-l">Accuracy</div>
    <div class="stat-v">${stats.accuracy}<span class="u">%</span></div>
  </div>
  <div class="stat purple">
    <div class="stat-l">Duration</div>
    <div class="stat-v">${stats.duration}</div>
  </div>
  <div class="stat red">
    <div class="stat-l">Errors</div>
    <div class="stat-v">${stats.errors}</div>
  </div>
  <div class="stat">
    <div class="stat-l">Characters</div>
    <div class="stat-v">${stats.correctChars}<span class="u">/ ${stats.totalChars}</span></div>
  </div>
  <div class="stat">
    <div class="stat-l">Backspaces</div>
    <div class="stat-v">${stats.backspaces}</div>
  </div>
</div>

<div class="tip">Run <b>Cara: Start Typing Test</b> from the command palette to try again.</div>

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
  const divider = "// " + "━".repeat(60);
  const lines = [
    divider,
    "//  🎯  CARA TYPING TEST",
    divider,
    "//  Type the code shown below as fast and accurately as you can.",
    "//  The timer starts when you type your first character.",
    "//  Results appear automatically when you finish.",
    divider,
    "//",
    ...promptLines.map((l) => "//  " + l),
    "//",
    divider,
    "//  👇 START TYPING HERE (below this line)",
    divider,
    "", // newline so cursor lands on a blank line
  ];
  return lines.join("\n");
}
