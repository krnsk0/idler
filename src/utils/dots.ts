/**
 * Translates a time in seconds to a string of one to three dots
 * that we go through once per second
 */
export function dots(time: number): string {
  const chars = ['...', '..', '.'];
  const index = Math.floor((time - 0.001) / 0.3333) % chars.length;
  return chars[index];
}
