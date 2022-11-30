/**
 * Defaults to 2 digits
 */
export const formatNumber = (
  input: number,
  option?: { showSign?: boolean; digits?: number },
) => {
  const digits = typeof option?.digits === 'number' ? option.digits : 2;
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
    //@ts-ignore
    signDisplay: option?.showSign ? 'exceptZero' : 'auto',
  }).format(input);
};

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest;
  it('should default to no sign and two digits', () => {
    expect(formatNumber(20)).toBe('20.00');
  });

  it('should show the sign', () => {
    expect(formatNumber(20, { showSign: true })).toBe('+20.00');
    expect(formatNumber(-20, { showSign: true })).toBe('-20.00');
  });

  it('should show N number of digits', () => {
    expect(formatNumber(5 / 3, { digits: 4 })).toBe('1.6667');
    expect(formatNumber(5 / 3, { digits: 0 })).toBe('2');
  });
}
