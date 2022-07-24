function randomInt(max: number): number {
  return Math.round(Math.random() * (max - 1)) + 1;
}

export function pickRandomEnumValue<
  O extends object,
  K extends keyof O = keyof O,
>(obj: O): O[K] {
  const keys = Object.keys(obj);
  const randomKeyIndex = randomInt(keys.length) - 1;
  return obj[keys[randomKeyIndex] as K];
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

  enum TestEnum {
    First = 'first',
    Second = 'second',
    Third = 'third',
  }
  it('should pick and return each of the three keys', () => {
    spy.mockImplementationOnce(() => 0);
    expect(pickRandomEnumValue(TestEnum)).toBe(TestEnum.First);
    spy.mockImplementationOnce(() => 0.5);
    expect(pickRandomEnumValue(TestEnum)).toBe(TestEnum.Second);
    spy.mockImplementationOnce(() => 0.9);
    expect(pickRandomEnumValue(TestEnum)).toBe(TestEnum.Third);
  });
}
