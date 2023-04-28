/**
 * Translates a time in seconds to a spinner using the characters
 * | / - \
 */
export function spinner(time: number): string {
  const chars = ['|', '\\', '-', '/'];
  const index = Math.floor(time / 0.1) % chars.length;
  return chars[index];
}
