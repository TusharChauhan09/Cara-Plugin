import * as vscode from "vscode";

// Left side + high priority so "⌨️ X WPM" appears early on the left and is visible without scrolling
const CARA_STATUS_PRIORITY = 100;

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
    if (this.disposed) {
      return;
    }
    this.statusBarItem.text = `$(dashboard) ${wpm} WPM`;
    this.statusBarItem.tooltip = new vscode.MarkdownString(
      `**Cara** — Typing Speed\n\n$(pencil) **${wpm}** words per minute\n\n_Rolling 1-minute window_`,
    );
    this.statusBarItem.tooltip.supportThemeIcons = true;
    this.statusBarItem.command = "cara.showStats";
    this.statusBarItem.show();
  }

  forceShow(): void {
    if (this.disposed) return;
    this.statusBarItem.text = `$(dashboard) 0 WPM`;
    this.statusBarItem.tooltip = "Cara: Real-time typing speed";
    this.statusBarItem.command = "cara.showStats";
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
    this.statusBarItem.text = `$(beaker) ${stats.progress}%  $(clock) ${stats.duration}  $(pencil) ${stats.wpm} WPM  ${accIcon} ${stats.accuracy}%`;
    this.statusBarItem.tooltip = new vscode.MarkdownString(
      `**Cara Typing Test**\n\n` +
        `| Metric | Value |\n` +
        `|--------|-------|\n` +
        `| $(beaker) Progress | ${stats.progress}% |\n` +
        `| $(clock) Duration | ${stats.duration} |\n` +
        `| $(pencil) Speed | ${stats.wpm} WPM |\n` +
        `| ${accIcon} Accuracy | ${stats.accuracy}% |\n` +
        `| $(error) Errors | ${stats.errors} |\n` +
        `| $(arrow-left) Backspaces | ${stats.backspaces} |\n\n` +
        `_Reset: Ctrl+Shift+P → Cara: Reset Typing Test_`,
    );
    this.statusBarItem.tooltip.supportThemeIcons = true;
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
