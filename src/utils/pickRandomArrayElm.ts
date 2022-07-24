function randomInt(max: number): number {
  return Math.round(Math.random() * (max - 1)) + 1;
}

export function pickRandomArrayElm<T>(array: T[]): T {
  const randomElmIndex = randomInt(array.length) - 1;
  return array[randomElmIndex];
}

if (import.meta.vitest) {
  const { it, expect, vi, beforeEach, afterEach } = import.meta.vitest;
  let spy: any;
  beforeEach(() => {
    spy = vi.spyOn(Math, 'random');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const array = ['first', 'second', 'third'];
  it('should pick and return each of the three keys', () => {
    spy.mockImplementationOnce(() => 0);
    expect(pickRandomArrayElm(array)).toBe('first');
    spy.mockImplementationOnce(() => 0.5);
    expect(pickRandomArrayElm(array)).toBe('second');
    spy.mockImplementationOnce(() => 0.9);
    expect(pickRandomArrayElm(array)).toBe('third');
  });
}
