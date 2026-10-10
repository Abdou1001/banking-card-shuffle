/**
 * Format seconds into mm:ss string (e.g. 00:30, 01:15)
 */
export function formatTime(totalSeconds: number): string {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;

  const mm = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const ss = seconds < 10 ? `0${seconds}` : `${seconds}`;

  return `${mm}:${ss}`;
}

/**
 * Format duration in seconds to Arabic text representation.
 */
export function formatDurationArabic(seconds: number): string {
  const safe = Math.max(0, Math.round(seconds));
  if (safe === 0) return 'أقل من ثانية';
  if (safe === 1) return 'ثانية واحدة';
  if (safe === 2) return 'ثانيتان';
  if (safe >= 3 && safe <= 10) return `${safe} ثوانٍ`;
  if (safe === 60) return 'دقيقة واحدة';
  if (safe > 60) {
    const mins = Math.floor(safe / 60);
    const remSecs = safe % 60;
    if (remSecs === 0) return `${mins} دقيقة`;
    return `${mins} دقيقة و ${remSecs} ثانية`;
  }
  return `${safe} ثانية`;
}
