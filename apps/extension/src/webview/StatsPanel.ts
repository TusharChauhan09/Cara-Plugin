import * as vscode from "vscode";
import type { LanguageStat } from "../trackers/LanguageTracker.js";
import { getLanguageIcon } from "./languageIcons.js";

function formatTimeShort(totalSeconds: number): string {
  const hrs = Math.floor(totalSeconds / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = Math.floor(totalSeconds % 60);
  if (hrs > 0) return `${hrs}h ${mins}m`;
  if (mins > 0) return `${mins}m ${secs}s`;
  return `${secs}s`;
}

function getBarColor(index: number): string {
  const colors = [
    "#3b82f6",
    "#10b981",
    "#8b5cf6",
    "#f59e0b",
    "#ef4444",
    "#06b6d4",
    "#ec4899",
    "#84cc16",
  ];
  return colors[index % colors.length];
}

export function showStatsPanel(
  ranking: LanguageStat[],
  currentWpm: number,
  _extensionUri: vscode.Uri,
): void {
  const panel = vscode.window.createWebviewPanel(
    "caraStats",
    "Cara — Statistics",
    vscode.ViewColumn.One,
    { enableScripts: false },
  );
  panel.webview.html = getWebviewContent(ranking, currentWpm);
}

function getWebviewContent(
  ranking: LanguageStat[],
  currentWpm: number,
): string {
  const totalSec = ranking.reduce((s, r) => s + r.totalSeconds, 0);
  const topLang = ranking.length > 0 ? ranking[0] : null;
  const topPct =
    topLang && totalSec > 0
      ? Math.round((topLang.totalSeconds / totalSec) * 100)
      : 0;

  const langRows = ranking
    .map((r, i) => {
      const pct = totalSec > 0 ? (r.totalSeconds / totalSec) * 100 : 0;
      const color = getBarColor(i);
      return `
        <tr>
          <td class="c-lang">
            <span class="icon">${getLanguageIcon(r.languageId)}</span>
            <span>${esc(capitalize(r.languageId))}</span>
          </td>
          <td class="c-time">${formatTimeShort(r.totalSeconds)}</td>
          <td class="c-bar"><div class="track"><div class="fill" style="width:${Math.max(pct, 3)}%;background:${color}"></div></div></td>
          <td class="c-pct">${Math.round(pct)}%</td>
        </tr>`;
    })
    .join("");

  return /* html */ `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Cara Stats</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{
  --a:#3b82f6;--g:#10b981;
  --bg:var(--vscode-editor-background,#0d1117);
  --sf:var(--vscode-editorWidget-background,#161b22);
  --bd:var(--vscode-widget-border,#21262d);
  --tx:var(--vscode-foreground,#e6edf3);
  --t2:var(--vscode-descriptionForeground,#7d8590);
  --t3:#484f58;
}
body{font-family:var(--vscode-font-family,-apple-system,'Segoe UI',sans-serif);color:var(--tx);background:var(--bg);padding:32px 40px;line-height:1.5;max-width:700px}

h1{font-size:22px;font-weight:700;letter-spacing:-.3px;margin-bottom:4px}
h1 b{color:var(--a);font-weight:800}
.sub{font-size:13px;color:var(--t2);margin-bottom:28px}

/* cards */
.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:32px}
.card{background:var(--sf);border:1px solid var(--bd);border-radius:10px;padding:18px 20px}
.card-l{font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:.7px;color:var(--t2);margin-bottom:4px}
.card-v{font-size:30px;font-weight:800;font-variant-numeric:tabular-nums;line-height:1.15}
.card-v.top-lang{font-size:20px;display:flex;align-items:center;gap:6px}
.card-v.top-lang svg{width:24px;height:24px;flex-shrink:0}
.card-v .u{font-size:13px;font-weight:500;color:var(--t2);margin-left:2px}
.card-s{font-size:12px;color:var(--t3);margin-top:3px}
.card.blue .card-v{color:var(--a)}
.card.green .card-v{color:var(--g)}

/* table */
.lbl{font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:.7px;color:var(--t2);margin-bottom:10px}
table{width:100%;border-collapse:collapse}
tr td{padding:9px 0;border-bottom:1px solid var(--bd);vertical-align:middle}
tr:last-child td{border:none}
.c-lang{display:flex;align-items:center;gap:9px;font-size:14px;font-weight:500;min-width:130px}
.c-lang .icon{display:inline-flex;align-items:center;justify-content:center;width:20px;flex-shrink:0}
.c-lang .icon svg{width:18px;height:18px}
.c-time{font-size:13px;color:var(--t2);text-align:right;padding-right:14px!important;white-space:nowrap;font-variant-numeric:tabular-nums}
.c-bar{width:40%}
.track{height:7px;background:var(--bd);border-radius:4px;overflow:hidden}
.fill{height:100%;border-radius:4px}
.c-pct{font-size:13px;font-weight:600;text-align:right;padding-left:10px!important;white-space:nowrap;min-width:40px;font-variant-numeric:tabular-nums}

/* empty */
.empty{text-align:center;padding:48px 0}
.empty-i{font-size:36px;margin-bottom:10px}
.empty p{font-size:14px;color:var(--t2)}
.empty .h{font-size:12px;color:var(--t3);margin-top:6px}
</style>
</head>
<body>

<h1><b>Cara</b> Statistics</h1>
<p class="sub">Your coding activity at a glance</p>

<div class="cards">
  <div class="card blue">
    <div class="card-l">Speed</div>
    <div class="card-v">${currentWpm}<span class="u">wpm</span></div>
    <div class="card-s">Current typing speed</div>
  </div>
  <div class="card green">
    <div class="card-l">Total Time</div>
    <div class="card-v">${formatTimeShort(totalSec)}</div>
    <div class="card-s">Across all languages</div>
  </div>
  <div class="card">
    <div class="card-l">Top Language</div>
    <div class="card-v top-lang">${topLang ? getLanguageIcon(topLang.languageId) + " " + capitalize(topLang.languageId) : "—"}</div>
    <div class="card-s">${topLang ? topPct + "% of your time" : "Start coding!"}</div>
  </div>
</div>

${
  ranking.length > 0
    ? `
<div class="lbl">Language breakdown &middot; ${ranking.length} language${ranking.length > 1 ? "s" : ""}</div>
<table><tbody>${langRows}</tbody></table>
`
    : `
<div class="empty">
  <div class="empty-i">⌨️</div>
  <p>No language stats yet</p>
  <div class="h">Start editing files and your breakdown will appear here.</div>
</div>
`
}

</body>
</html>`;
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
