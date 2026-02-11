import * as vscode from "vscode";
import { SpeedTracker } from "./trackers/SpeedTracker";
import { LanguageTracker } from "./trackers/LanguageTracker";
import { StatusBarProvider } from "./StatusBarProvider";
import { TypingTestManager } from "./typingTest/TypingTestManager";

export function activate(context: vscode.ExtensionContext) {
  try {
    // --- Minimal status bar first (like official sample) so it always shows ---
    const statusBarItem = vscode.window.createStatusBarItem(
      vscode.StatusBarAlignment.Left,
      100
    );
    statusBarItem.text = "CodePulse: $(pencil) 0 WPM";
    statusBarItem.tooltip = "CodePulse - Real-time typing speed";
    statusBarItem.show();
    context.subscriptions.push(statusBarItem);

    const outputChannel = vscode.window.createOutputChannel("CodePulse");
    outputChannel.appendLine("[CodePulse] Extension activating...");
    context.subscriptions.push(outputChannel);

    vscode.window.showInformationMessage(
      "CodePulse is active. WPM is in the status bar (bottom)."
    );

    // --- Rest of extension ---
    const statusBar = new StatusBarProvider();
    let activeDocUri: vscode.Uri | undefined;
    const typingTestManager = new TypingTestManager(statusBar);
    const speedTracker = new SpeedTracker({
      onWpmUpdate(wpm) {
        if (!activeDocUri || !typingTestManager.isTypingTestDocument(activeDocUri)) {
          statusBar.setWpm(wpm);
          statusBarItem.text = `CodePulse: $(pencil) ${wpm} WPM`;
          statusBarItem.show();
        }
      },
    });
    const languageTracker = new LanguageTracker(context);

    speedTracker.startUpdating();

    const updateActiveDoc = (editor: vscode.TextEditor | undefined) => {
      activeDocUri = editor?.document?.uri;
      languageTracker.onActiveEditorChanged(editor);
      if (activeDocUri && !typingTestManager.isTypingTestDocument(activeDocUri)) {
        const wpm = speedTracker.getWpm();
        statusBar.setWpm(wpm);
        statusBarItem.text = `CodePulse: $(pencil) ${wpm} WPM`;
        statusBarItem.show();
      }
    };

    updateActiveDoc(vscode.window.activeTextEditor);
    statusBar.setWpm(0);

    setTimeout(() => {
      statusBarItem.text = `CodePulse: $(pencil) ${speedTracker.getWpm()} WPM`;
      statusBarItem.show();
    }, 200);
    setTimeout(() => {
      statusBarItem.text = `CodePulse: $(pencil) ${speedTracker.getWpm()} WPM`;
      statusBarItem.show();
    }, 1000);

    const docChangeSub = vscode.workspace.onDidChangeTextDocument((e) => {
      const uri = e.document.uri;
      if (typingTestManager.isTypingTestDocument(uri)) return;
      const isActive =
        uri.toString() === activeDocUri?.toString() ||
        vscode.window.activeTextEditor?.document?.uri.toString() === uri.toString();
      if (!isActive) return;
      for (const change of e.contentChanges) {
        speedTracker.recordKeystrokes(change.text.length);
      }
      languageTracker.onDocumentChanged(uri.toString(), e.document.languageId);
    });

    const editorChangeSub = vscode.window.onDidChangeActiveTextEditor(updateActiveDoc);

    context.subscriptions.push(
      statusBar,
      speedTracker,
      typingTestManager,
      languageTracker,
      docChangeSub,
      editorChangeSub,
      vscode.commands.registerCommand("codepulse.startTypingTest", () => typingTestManager.start()),
      vscode.commands.registerCommand("codepulse.resetTypingTest", () => typingTestManager.reset()),
      vscode.commands.registerCommand("codepulse.showStats", () => {
        const ranking = languageTracker.getRanking();
        if (ranking.length === 0) {
          vscode.window.showInformationMessage("CodePulse: No language stats yet.");
          return;
        }
        const totalSec = ranking.reduce((s, r) => s + r.totalSeconds, 0);
        const lines = ranking.map((r) => {
          const pct = totalSec > 0 ? Math.round((r.totalSeconds / totalSec) * 100) : 0;
          return `${r.languageId}: ${Math.round(r.totalSeconds / 60)} min (${pct}%)`;
        });
        vscode.window.showInformationMessage("CodePulse:\n" + lines.join("\n"));
      }),
      vscode.commands.registerCommand("codepulse.syncNow", () => {
        vscode.window.showInformationMessage("CodePulse: Cloud sync coming later.");
      }),
      vscode.commands.registerCommand("codepulse.showStatusBar", () => {
        const wpm = speedTracker.getWpm();
        statusBarItem.text = `CodePulse: $(pencil) ${wpm} WPM`;
        statusBarItem.show();
        statusBar.forceShow();
        statusBar.setWpm(wpm);
        vscode.window.showInformationMessage(`CodePulse: Status bar updated to ${wpm} WPM.`);
      })
    );

    outputChannel.appendLine("[CodePulse] Extension activated.");
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    vscode.window.showErrorMessage("CodePulse failed to activate: " + msg);
    console.error("[CodePulse] activate error:", err);
  }
}

export function deactivate() {}
