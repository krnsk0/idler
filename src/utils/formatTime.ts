/**
 * Takes a time in seconds and returns a string in the Hh:Mm:Ss format
 */
function formatTime(time: number): string {
  if (time === 0) return '';

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  const parts = [];

  if (hours > 0) {
    parts.push(`${hours}h`);
  }
  if (minutes > 0) {
    parts.push(`${minutes}m`);
  } else if (seconds > 0 && hours > 0) {
    parts.push(`0m`);
  }
  if (seconds > 0 || parts.length === 0) {
    parts.push(`${seconds}s`);
  }

  return parts.join(' ');
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it('should convert some times correctly', () => {
    expect(formatTime(0)).toBe('');
    expect(formatTime(1)).toBe('1s');
    expect(formatTime(60)).toBe('1m');
    expect(formatTime(61)).toBe('1m 1s');
    expect(formatTime(3600)).toBe('1h');
    expect(formatTime(3601)).toBe('1h 0m 1s');
    expect(formatTime(3661)).toBe('1h 1m 1s');
    expect(formatTime(3661 + 60)).toBe('1h 2m 1s');
    expect(formatTime(3661 + 60 * 60 + 60)).toBe('2h 2m 1s');
  });
}
