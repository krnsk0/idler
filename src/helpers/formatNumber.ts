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
