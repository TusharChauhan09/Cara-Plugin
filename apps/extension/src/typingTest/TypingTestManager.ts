import * as vscode from "vscode";
import { formatDuration, computeWpm } from "../utils/metrics";
import type { StatusBarProvider } from "../StatusBarProvider";

const COMMENT_PREFIX = "// ";
const PROMPT_LINES = [
  "const fetchUserData = async (userId: string) => {",
  "  const response = await fetch(`/api/users/${userId}`);",
  "  return response.json();",
  "};",
];

function getExpectedText(): string {
  return PROMPT_LINES.join("\n");
}

function buildDocumentContent(): { fullContent: string; expectedText: string } {
  const expectedText = getExpectedText();
  const commentBlock =
    "// ═══════════════════════════════════════════════════════════════════\n" +
    "// 🎯 CODEPULSE TYPING TEST\n" +
    "// ═══════════════════════════════════════════════════════════════════\n" +
    "// Type the text below. Timer starts when you begin typing.\n" +
    "// ═══════════════════════════════════════════════════════════════════\n" +
    PROMPT_LINES.map((line) => COMMENT_PREFIX + line).join("\n") +
    "\n// ═══════════════════════════════════════════════════════════════════\n\n";
  return { fullContent: commentBlock, expectedText };
}

export class TypingTestManager implements vscode.Disposable {
  private statusBar: StatusBarProvider;
  private docUri: vscode.Uri | undefined;
  private expectedText: string = "";
  private commentBlockLength: number = 0;
  private startTimeMs: number = 0;
  private totalKeysPressed: number = 0;
  private backspaceCount: number = 0;
  private subscription: vscode.Disposable | undefined;

  constructor(statusBar: StatusBarProvider) {
    this.statusBar = statusBar;
  }

  isTypingTestDocument(uri: vscode.Uri): boolean {
    return this.docUri?.toString() === uri.toString();
  }

  async start(): Promise<void> {
    const { fullContent, expectedText } = buildDocumentContent();
    this.expectedText = expectedText;
    this.commentBlockLength = fullContent.length;
    this.startTimeMs = 0;
    this.totalKeysPressed = 0;
    this.backspaceCount = 0;

    const doc = await vscode.workspace.openTextDocument({
      content: fullContent,
      language: "plaintext",
    });
    this.docUri = doc.uri;

    await vscode.window.showTextDocument(doc, { viewColumn: vscode.ViewColumn.One });
    this.subscription = vscode.workspace.onDidChangeTextDocument((e) => {
      if (e.document.uri.toString() !== this.docUri?.toString()) return;
      this.onDocumentChange(e);
    });
    this.updateStatusBar();
  }

  private onDocumentChange(e: vscode.TextDocumentChangeEvent): void {
    const doc = e.document;
    const fullText = doc.getText();
    const typingRegion = fullText.slice(this.commentBlockLength);

    for (const change of e.contentChanges) {
      const isInTypingRegion = change.rangeOffset >= this.commentBlockLength;
      if (!isInTypingRegion) continue;

      const added = change.text.length;
      const removed = change.rangeLength;
      if (removed > 0) {
        this.backspaceCount += removed;
      }
      if (added > 0) {
        this.totalKeysPressed += added;
        if (this.startTimeMs === 0) {
          this.startTimeMs = Date.now();
        }
      }
    }

    this.updateStatusBar(typingRegion);
  }

  private updateStatusBar(typedSoFar?: string): void {
    const now = Date.now();
    const durationMs = this.startTimeMs > 0 ? now - this.startTimeMs : 0;
    const durationStr = formatDuration(durationMs);

    let wpm = 0;
    let accuracy = 100;
    let errors = 0;

    if (typedSoFar !== undefined && this.startTimeMs > 0) {
      const correctChars = this.countCorrectChars(typedSoFar);
      const totalTyped = typedSoFar.length;
      wpm = computeWpm(correctChars, durationMs);
      if (totalTyped > 0) {
        accuracy = Math.round((correctChars / totalTyped) * 100);
        errors = totalTyped - correctChars;
      }
    }

    this.statusBar.setTypingTestStats({
      duration: durationStr,
      wpm,
      accuracy,
      errors,
      backspaces: this.backspaceCount,
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
    if (!this.docUri) return;
    const { fullContent, expectedText } = buildDocumentContent();
    this.expectedText = expectedText;
    this.commentBlockLength = fullContent.length;
    this.startTimeMs = 0;
    this.totalKeysPressed = 0;
    this.backspaceCount = 0;
    const edit = new vscode.WorkspaceEdit();
    const doc = vscode.workspace.textDocuments.find(
      (d) => d.uri.toString() === this.docUri!.toString()
    );
    if (doc) {
      const fullRange = new vscode.Range(
        doc.positionAt(0),
        doc.positionAt(doc.getText().length)
      );
      edit.replace(this.docUri, fullRange, fullContent);
      vscode.workspace.applyEdit(edit).then(() => this.updateStatusBar());
    }
  }

  dispose(): void {
    this.subscription?.dispose();
    this.subscription = undefined;
    this.docUri = undefined;
  }
}
