import * as vscode from "vscode";

const CARA_STATUS_PRIORITY = 100;

function speedLabel(wpm: number): string {
  if (wpm === 0) return "No typing activity";
  if (wpm < 30) return "Beginner — keep going!";
  if (wpm < 50) return "Average pace";
  if (wpm < 70) return "Good speed";
  if (wpm < 90) return "Fast typist";
  return "Elite speed!";
}

function speedIcon(wpm: number): string {
  if (wpm >= 90) return "$(zap)";
  if (wpm >= 60) return "$(rocket)";
  return "$(keyboard)";
}

export class StatusBarProvider implements vscode.Disposable {
  private statusBarItem: vscode.StatusBarItem;
  private configListener: vscode.Disposable;
  private showSpeed: boolean = true;
  private disposed = false;

  constructor() {
    this.statusBarItem = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Left,
      CARA_STATUS_PRIORITY,
    );
    this.updateShowSpeed();
    this.configListener = vscode.workspace.onDidChangeConfiguration((e) => {
      if (this.disposed) return;
      if (e.affectsConfiguration("cara.showSpeedInStatusBar")) {
        this.updateShowSpeed();
      }
    });
  }

  private updateShowSpeed(): void {
    const config = vscode.workspace.getConfiguration("cara");
    this.showSpeed = config.get<boolean>("showSpeedInStatusBar", true);
    if (!this.showSpeed) {
      this.statusBarItem.hide();
    }
  }

  setWpm(wpm: number): void {
    if (this.disposed) return;

    const icon = speedIcon(wpm);
    this.statusBarItem.text = `${icon} ${wpm} wpm`;
    this.statusBarItem.tooltip = new vscode.MarkdownString(
      `### Cara — Typing Speed\n\n` +
        `**${wpm} wpm** · ${speedLabel(wpm)}\n\n` +
        `---\n\n` +
        `$(graph) Measured over a rolling 1-minute window\n\n` +
        `$(eye) Click to open Statistics`,
    );
    this.statusBarItem.tooltip.supportThemeIcons = true;
    this.statusBarItem.command = "cara.showStats";
    this.statusBarItem.backgroundColor =
      wpm >= 90
        ? new vscode.ThemeColor("statusBarItem.prominentBackground")
        : undefined;
    this.statusBarItem.show();
  }

  forceShow(): void {
    if (this.disposed) return;
    this.statusBarItem.text = `$(keyboard) 0 wpm`;
    this.statusBarItem.tooltip = "Cara — Real-time typing speed";
    this.statusBarItem.command = "cara.showStats";
    this.statusBarItem.backgroundColor = undefined;
    this.statusBarItem.show();
  }

  setTypingTestStats(stats: {
    duration: string;
    wpm: number;
    accuracy: number;
    errors: number;
    backspaces: number;
    progress: number;
  }): void {
    if (this.disposed) return;

    const accIcon =
      stats.accuracy >= 95
        ? "$(check)"
        : stats.accuracy >= 80
          ? "$(warning)"
          : "$(error)";

    this.statusBarItem.text =
      `$(beaker) ${stats.progress}%` +
      `  $(clock) ${stats.duration}` +
      `  $(keyboard) ${stats.wpm} wpm` +
      `  ${accIcon} ${stats.accuracy}%`;

    this.statusBarItem.tooltip = new vscode.MarkdownString(
      `### Cara Typing Test\n\n` +
        `| | |\n` +
        `|---|---|\n` +
        `| $(beaker) Progress | **${stats.progress}%** |\n` +
        `| $(clock) Time | **${stats.duration}** |\n` +
        `| $(keyboard) Speed | **${stats.wpm} wpm** |\n` +
        `| ${accIcon} Accuracy | **${stats.accuracy}%** |\n` +
        `| $(error) Errors | **${stats.errors}** |\n` +
        `| $(arrow-left) Backspaces | **${stats.backspaces}** |\n\n` +
        `---\n\n` +
        `_Ctrl+Shift+P → **Cara: Reset Typing Test** to restart_`,
    );
    this.statusBarItem.tooltip.supportThemeIcons = true;
    this.statusBarItem.backgroundColor = undefined;
    this.statusBarItem.show();
  }

  hide(): void {
    this.statusBarItem.hide();
  }

  dispose(): void {
    this.disposed = true;
    this.configListener.dispose();
    this.statusBarItem.dispose();
  }
}
