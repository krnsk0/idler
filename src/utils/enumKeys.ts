export function enumKeys<O extends object, K extends keyof O = keyof O>(
  obj: O,
): K[] {
  return Object.keys(obj).filter((k) => Number.isNaN(+k)) as K[];
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  enum TestEnum {
    a = '1',
    b = '2',
    c = '3',
  }

  it('should enumerate keys', () => {
    expect(enumKeys(TestEnum)).toEqual(['a', 'b', 'c']);
  });
}
