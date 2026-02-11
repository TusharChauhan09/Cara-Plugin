import type { Disposable } from "vscode";
import type { SpeedTrackerDelegate } from "./types";

const ROLLING_WINDOW_MS = 60_000; // 1 minute
const UPDATE_INTERVAL_MS = 1500;  // update status bar every 1.5s

interface KeystrokeRecord {
  time: number;
  charsAdded: number;
}

/**
 * Tracks keystrokes in a rolling time window and computes WPM.
 * Not used for typing-test documents (handled separately).
 */
export class SpeedTracker implements Disposable {
  private records: KeystrokeRecord[] = [];
  private intervalId: ReturnType<typeof setInterval> | undefined;
  private delegate: SpeedTrackerDelegate | undefined;
  private disposed = false;

  constructor(delegate?: SpeedTrackerDelegate) {
    this.delegate = delegate;
  }

  setDelegate(delegate: SpeedTrackerDelegate | undefined): void {
    this.delegate = delegate;
  }

  /** Call when text was inserted in the editor (only for non–typing-test docs). */
  recordKeystrokes(charsAdded: number): void {
    if (charsAdded <= 0) return;
    const now = Date.now();
    this.records.push({ time: now, charsAdded });
    this.pruneOld();
  }

  private pruneOld(): void {
    const cutoff = Date.now() - ROLLING_WINDOW_MS;
    this.records = this.records.filter((r) => r.time >= cutoff);
  }

  getWpm(): number {
    this.pruneOld();
    if (this.records.length === 0) return 0;
    const oldest = this.records[0].time;
    const newest = this.records[this.records.length - 1].time;
    let durationMs = newest - oldest;
    // Minimum 1 second so a few keystrokes show a WPM quickly
    if (durationMs < 1000) durationMs = 1000;
    const totalChars = this.records.reduce((s, r) => s + r.charsAdded, 0);
    const minutes = durationMs / 60_000;
    const words = totalChars / 5;
    return Math.round(words / minutes);
  }

  startUpdating(): void {
    this.stopUpdating();
    this.intervalId = setInterval(() => {
      if (this.disposed) return;
      this.pruneOld();
      this.delegate?.onWpmUpdate(this.getWpm());
    }, UPDATE_INTERVAL_MS);
  }

  stopUpdating(): void {
    if (this.intervalId !== undefined) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
    }
  }

  dispose(): void {
    this.disposed = true;
    this.stopUpdating();
    this.records = [];
    this.delegate = undefined;
  }
}
