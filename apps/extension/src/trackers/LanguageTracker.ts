import * as vscode from "vscode";

export interface LanguageStat {
  languageId: string;
  totalSeconds: number;
  lastActiveAt: number;
}

const STORAGE_KEY = "cara.languageStats";
const FLUSH_INTERVAL_MS = 10_000; // persist every 10s

/**
 * Tracks time spent per document language (for ranking).
 * Persists to globalState and accumulates as the user edits.
 */
export class LanguageTracker implements vscode.Disposable {
  private context: vscode.ExtensionContext;
  private currentDocUri: string | undefined;
  private currentLanguageId: string | undefined;
  private sessionStartMs: number = 0;
  private inMemory: Map<string, LanguageStat> = new Map();
  private flushTimeout: ReturnType<typeof setTimeout> | undefined;

  constructor(context: vscode.ExtensionContext) {
    this.context = context;
    this.load();
  }

  private load(): void {
    try {
      const raw = this.context.globalState.get<LanguageStat[]>(STORAGE_KEY);
      if (Array.isArray(raw)) {
        for (const s of raw) {
          this.inMemory.set(s.languageId, { ...s });
        }
      }
    } catch {
      this.inMemory.clear();
    }
  }

  private save(): void {
    const arr = Array.from(this.inMemory.values());
    this.context.globalState.update(STORAGE_KEY, arr);
  }

  private scheduleFlush(): void {
    if (this.flushTimeout) clearTimeout(this.flushTimeout);
    this.flushTimeout = setTimeout(() => {
      this.flushTimeout = undefined;
      this.save();
    }, FLUSH_INTERVAL_MS);
  }

  /** Call when the active editor or document changes. */
  onActiveEditorChanged(editor: vscode.TextEditor | undefined): void {
    this.flushCurrentSession();
    if (!editor?.document) {
      this.currentDocUri = undefined;
      this.currentLanguageId = undefined;
      return;
    }
    this.currentDocUri = editor.document.uri.toString();
    this.currentLanguageId = editor.document.languageId || "plaintext";
    this.sessionStartMs = Date.now();
  }

  /** Call on text document change (only for the active typing session). */
  onDocumentChanged(uri: string, languageId: string): void {
    if (uri !== this.currentDocUri) return;
    const now = Date.now();
    const elapsed = (now - this.sessionStartMs) / 1000;
    this.addTime(this.currentLanguageId ?? languageId, elapsed);
    this.sessionStartMs = now;
    this.scheduleFlush();
  }

  private flushCurrentSession(): void {
    if (!this.currentDocUri || !this.currentLanguageId) return;
    const elapsed = (Date.now() - this.sessionStartMs) / 1000;
    if (elapsed > 0) {
      this.addTime(this.currentLanguageId, elapsed);
    }
    this.save();
  }

  private addTime(languageId: string, seconds: number): void {
    const key = languageId || "plaintext";
    const existing = this.inMemory.get(key) ?? {
      languageId: key,
      totalSeconds: 0,
      lastActiveAt: 0,
    };
    existing.totalSeconds += seconds;
    existing.lastActiveAt = Date.now();
    this.inMemory.set(key, existing);
  }

  /** Get ranking: languages sorted by total time (desc). */
  getRanking(): LanguageStat[] {
    this.flushCurrentSession();
    return Array.from(this.inMemory.values()).sort(
      (a, b) => b.totalSeconds - a.totalSeconds,
    );
  }

  dispose(): void {
    if (this.flushTimeout) clearTimeout(this.flushTimeout);
    this.flushCurrentSession();
  }
}
