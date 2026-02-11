/**
 * WPM = (characters / 5) / (minutes)
 * Standard word = 5 characters.
 */
export function computeWpm(charCount: number, durationMs: number): number {
  if (durationMs <= 0) return 0;
  const minutes = durationMs / 60_000;
  const words = charCount / 5;
  return Math.round(words / minutes);
}

export function formatDuration(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}
