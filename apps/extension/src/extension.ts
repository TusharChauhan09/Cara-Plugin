import * as vscode from "vscode";
import { SpeedTracker } from "./trackers/SpeedTracker.js";
import { LanguageTracker } from "./trackers/LanguageTracker.js";
import { StatusBarProvider } from "./StatusBarProvider.js";
import { TypingTestManager } from "./typingTest/TypingTestManager.js";
import { showStatsPanel } from "./webview/StatsPanel.js";

export function activate(context: vscode.ExtensionContext) {
  try {
    // --- Rest of extension ---
    const statusBar = new StatusBarProvider();
    let activeDocUri: vscode.Uri | undefined;
    const typingTestManager = new TypingTestManager(statusBar);
    const speedTracker = new SpeedTracker({
      onWpmUpdate(wpm) {
        if (
          !activeDocUri ||
          !typingTestManager.isTypingTestDocument(activeDocUri)
        ) {
          statusBar.setWpm(wpm);
        }
      },
    });
    const languageTracker = new LanguageTracker(context);

    speedTracker.startUpdating();

    const updateActiveDoc = (editor: vscode.TextEditor | undefined) => {
      activeDocUri = editor?.document?.uri;
      languageTracker.onActiveEditorChanged(editor);
      if (
        activeDocUri &&
        !typingTestManager.isTypingTestDocument(activeDocUri)
      ) {
        const wpm = speedTracker.getWpm();
        statusBar.setWpm(wpm);
      }
    };

    updateActiveDoc(vscode.window.activeTextEditor);
    statusBar.setWpm(0);

    setTimeout(() => {
      statusBar.setWpm(speedTracker.getWpm());
    }, 200);
    setTimeout(() => {
      statusBar.setWpm(speedTracker.getWpm());
    }, 1000);

    const docChangeSub = vscode.workspace.onDidChangeTextDocument((e) => {
      const uri = e.document.uri;
      if (typingTestManager.isTypingTestDocument(uri)) return;
      const isActive =
        uri.toString() === activeDocUri?.toString() ||
        vscode.window.activeTextEditor?.document?.uri.toString() ===
          uri.toString();
      if (!isActive) return;
      for (const change of e.contentChanges) {
        speedTracker.recordKeystrokes(change.text.length);
      }
      languageTracker.onDocumentChanged(uri.toString(), e.document.languageId);
    });

    const editorChangeSub =
      vscode.window.onDidChangeActiveTextEditor(updateActiveDoc);

    context.subscriptions.push(
      statusBar,
      speedTracker,
      typingTestManager,
      languageTracker,
      docChangeSub,
      editorChangeSub,
      vscode.commands.registerCommand("cara.startTypingTest", () =>
        typingTestManager.start(),
      ),
      vscode.commands.registerCommand("cara.resetTypingTest", () =>
        typingTestManager.reset(),
      ),
      vscode.commands.registerCommand("cara.showStats", () => {
        const ranking = languageTracker.getRanking();
        const wpm = speedTracker.getWpm();
        showStatsPanel(ranking, wpm, context.extensionUri);
      }),
      vscode.commands.registerCommand("cara.showStatusBar", () => {
        const wpm = speedTracker.getWpm();
        statusBar.forceShow();
        statusBar.setWpm(wpm);
      }),
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    vscode.window.showErrorMessage("Cara failed to activate: " + msg);
  }
}

export function deactivate() {}
