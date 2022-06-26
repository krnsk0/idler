export const formatNumber = (input: number, option?: { showSign: boolean }) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    //@ts-ignore
    signDisplay: option?.showSign ? 'exceptZero' : 'auto',
  }).format(input);
};
