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

function speedLabel(wpm: number): string {
  if (wpm === 0) return "Not measured yet";
  if (wpm < 30) return "Beginner";
  if (wpm < 50) return "Average";
  if (wpm < 70) return "Good";
  if (wpm < 90) return "Fast";
  return "Elite";
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
      const rank = i + 1;
      const rankBadge =
        rank === 1
          ? `<span class="badge gold">#1</span>`
          : rank === 2
            ? `<span class="badge silver">#2</span>`
            : rank === 3
              ? `<span class="badge bronze">#3</span>`
              : `<span class="rank-num">#${rank}</span>`;
      return `
        <tr>
          <td class="c-rank">${rankBadge}</td>
          <td class="c-lang">
            <span class="icon">${getLanguageIcon(r.languageId)}</span>
            <span>${esc(capitalize(r.languageId))}</span>
          </td>
          <td class="c-bar"><div class="track"><div class="fill" style="width:${Math.max(pct, 2)}%;background:${color}"></div></div></td>
          <td class="c-pct" style="color:${color}">${Math.round(pct)}%</td>
          <td class="c-time">${formatTimeShort(r.totalSeconds)}</td>
        </tr>`;
    })
    .join("");

  const wpmLabel = speedLabel(currentWpm);

  return /* html */ `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Cara Statistics</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{
  --a:#3b82f6;
  --g:#10b981;
  --p:#8b5cf6;
  --bg:var(--vscode-editor-background,#0d1117);
  --sf:var(--vscode-editorWidget-background,#161b22);
  --bd:var(--vscode-widget-border,#30363d);
  --tx:var(--vscode-foreground,#e6edf3);
  --t2:var(--vscode-descriptionForeground,#7d8590);
  --t3:#484f58;
}
body{
  font-family:var(--vscode-font-family,-apple-system,'Segoe UI',sans-serif);
  color:var(--tx);
  background:var(--bg);
  padding:0;
  line-height:1.5;
  max-width:680px;
}

/* ─── Header ─── */
.header{
  padding:28px 36px 24px;
  border-bottom:1px solid var(--bd);
  position:relative;
  overflow:hidden;
}
.header::before{
  content:"";
  position:absolute;
  top:0;left:0;right:0;
  height:3px;
  background:linear-gradient(90deg,var(--a),var(--p),var(--g));
}
.header-title{display:flex;align-items:baseline;gap:8px;margin-bottom:4px}
h1{font-size:20px;font-weight:700;letter-spacing:-.3px}
h1 .brand{color:var(--a);font-weight:800}
.dot{color:var(--t3)}
.sub{font-size:12px;color:var(--t2)}

/* ─── Cards ─── */
.section{padding:24px 36px}
.section + .section{padding-top:0}
.section-label{
  font-size:10px;font-weight:700;
  text-transform:uppercase;letter-spacing:1px;
  color:var(--t3);margin-bottom:12px;
}
.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.card{
  background:var(--sf);
  border:1px solid var(--bd);
  border-radius:10px;
  padding:16px 18px;
  position:relative;
  overflow:hidden;
}
.card::after{
  content:"";
  position:absolute;
  bottom:0;left:0;right:0;
  height:2px;
  background:var(--card-accent,transparent);
  border-radius:0 0 10px 10px;
}
.card.blue{--card-accent:var(--a)}
.card.green{--card-accent:var(--g)}
.card.purple{--card-accent:var(--p)}
.card-l{font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.8px;color:var(--t2);margin-bottom:6px}
.card-v{font-size:28px;font-weight:800;font-variant-numeric:tabular-nums;line-height:1.1}
.card-v .u{font-size:12px;font-weight:500;color:var(--t2);margin-left:2px}
.card-v.lang-val{font-size:16px;display:flex;align-items:center;gap:6px}
.card-v.lang-val svg{width:22px;height:22px;flex-shrink:0}
.card-s{font-size:11px;color:var(--t3);margin-top:4px}
.card.blue .card-v{color:var(--a)}
.card.green .card-v{color:var(--g)}
.card.purple .card-v{color:var(--p)}

/* ─── Table ─── */
.table-wrap{background:var(--sf);border:1px solid var(--bd);border-radius:10px;overflow:hidden}
table{width:100%;border-collapse:collapse}
tr td{padding:10px 14px;border-bottom:1px solid var(--bd);vertical-align:middle}
tr:last-child td{border:none}
.c-rank{width:40px;text-align:center}
.badge{
  display:inline-block;
  font-size:10px;font-weight:700;
  padding:2px 6px;border-radius:4px;
  letter-spacing:.3px;
}
.badge.gold{background:#f59e0b22;color:#f59e0b}
.badge.silver{background:#94a3b822;color:#94a3b8}
.badge.bronze{background:#cd7f3222;color:#cd7f32}
.rank-num{font-size:11px;color:var(--t3);font-weight:600}
.c-lang{display:flex;align-items:center;gap:8px;font-size:13px;font-weight:500;min-width:120px}
.c-lang .icon{display:inline-flex;align-items:center;justify-content:center;width:18px;flex-shrink:0}
.c-lang .icon svg{width:16px;height:16px}
.c-bar{width:38%}
.track{height:6px;background:var(--bd);border-radius:3px;overflow:hidden}
.fill{height:100%;border-radius:3px;transition:width .3s ease}
.c-pct{font-size:12px;font-weight:700;text-align:right;padding-right:6px!important;white-space:nowrap;min-width:36px;font-variant-numeric:tabular-nums}
.c-time{font-size:12px;color:var(--t2);text-align:right;white-space:nowrap;font-variant-numeric:tabular-nums}

/* ─── Empty state ─── */
.empty{
  background:var(--sf);border:1px solid var(--bd);
  border-radius:10px;padding:48px 32px;
  text-align:center;
}
.empty-icon{font-size:32px;margin-bottom:12px;opacity:.6}
.empty-title{font-size:14px;font-weight:600;margin-bottom:6px}
.empty-hint{font-size:12px;color:var(--t2);line-height:1.6}

/* ─── Footer ─── */
.footer{
  padding:16px 36px;
  border-top:1px solid var(--bd);
  font-size:11px;color:var(--t3);
  display:flex;align-items:center;gap:6px;
}
</style>
</head>
<body>

<div class="header">
  <div class="header-title">
    <h1><span class="brand">Cara</span></h1>
    <span class="dot">·</span>
    <h1 style="font-weight:400;color:var(--t2)">Statistics</h1>
  </div>
  <p class="sub">Your coding activity at a glance</p>
</div>

<div class="section">
  <div class="section-label">Overview</div>
  <div class="cards">
    <div class="card blue">
      <div class="card-l">Current Speed</div>
      <div class="card-v">${currentWpm}<span class="u">wpm</span></div>
      <div class="card-s">${wpmLabel}</div>
    </div>
    <div class="card green">
      <div class="card-l">Total Time</div>
      <div class="card-v">${formatTimeShort(totalSec)}</div>
      <div class="card-s">${ranking.length} language${ranking.length !== 1 ? "s" : ""} tracked</div>
    </div>
    <div class="card purple">
      <div class="card-l">Top Language</div>
      <div class="card-v lang-val">${topLang ? getLanguageIcon(topLang.languageId) + "&nbsp;" + esc(capitalize(topLang.languageId)) : "—"}</div>
      <div class="card-s">${topLang ? topPct + "% of session" : "Start coding!"}</div>
    </div>
  </div>
</div>

<div class="section">
  <div class="section-label">Language Breakdown${ranking.length > 0 ? " &middot; " + ranking.length + " language" + (ranking.length > 1 ? "s" : "") : ""}</div>
  ${
    ranking.length > 0
      ? `<div class="table-wrap"><table><tbody>${langRows}</tbody></table></div>`
      : `<div class="empty">
      <div class="empty-icon">⌨️</div>
      <div class="empty-title">No language data yet</div>
      <div class="empty-hint">Start editing files and your language breakdown<br>will appear here automatically.</div>
    </div>`
  }
</div>

<div class="footer">
  <span>Refreshes each time you open · Rolling session data</span>
</div>

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
