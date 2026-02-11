import * as vscode from "vscode";

// Left side + high priority so "⌨️ X WPM" appears early on the left and is visible without scrolling
const CODEPULSE_STATUS_PRIORITY = 100;

export class StatusBarProvider implements vscode.Disposable {
  private statusBarItem: vscode.StatusBarItem;
  private configListener: vscode.Disposable;
  private showSpeed: boolean = true;
  private disposed = false;

  constructor() {
    this.statusBarItem = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Left,
      CODEPULSE_STATUS_PRIORITY
    );
    this.updateShowSpeed();
    this.configListener = vscode.workspace.onDidChangeConfiguration((e) => {
      if (this.disposed) return;
      if (e.affectsConfiguration("codepulse.showSpeedInStatusBar")) {
        this.updateShowSpeed();
      }
    });
  }

  private updateShowSpeed(): void {
    const config = vscode.workspace.getConfiguration("codepulse");
    this.showSpeed = config.get<boolean>("showSpeedInStatusBar", true);
    // Note: console.log may not appear in Debug Console, use Output channel instead
    if (!this.showSpeed) {
      this.statusBarItem.hide();
    }
  }

  setWpm(wpm: number): void {
    if (this.disposed) {
      return;
    }
    // Always show, even if setting is false (user can hide via settings later)
    this.statusBarItem.text = `CodePulse: $(pencil) ${wpm} WPM`;
    this.statusBarItem.tooltip = "CodePulse: Real-time typing speed (rolling 1 min)";
    this.statusBarItem.show();
  }
  
  forceShow(): void {
    if (this.disposed) return;
    this.statusBarItem.text = `CodePulse: $(pencil) 0 WPM`;
    this.statusBarItem.tooltip = "CodePulse: Real-time typing speed";
    this.statusBarItem.show();
  }

  setTypingTestStats(stats: {
    duration: string;
    wpm: number;
    accuracy: number;
    errors: number;
    backspaces: number;
  }): void {
    if (this.disposed) return;
    this.statusBarItem.text = `$(watch) ${stats.duration} | $(pencil) ${stats.wpm} WPM | $(check-all) ${stats.accuracy}% | $(error) ${stats.errors} err | $(arrow-left) ${stats.backspaces} bs`;
    this.statusBarItem.tooltip = "CodePulse Typing Test – Reset from command palette: CodePulse: Reset Typing Test";
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
