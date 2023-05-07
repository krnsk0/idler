import { styles } from './HealthBar.styles';

interface HealthBarProps {
  healthPercent: number;
}

export function HealthBar({ healthPercent }: HealthBarProps) {
  return (
    <>
      <div css={styles.slowBar} style={{ width: healthPercent + '%' }} />
      <div css={styles.progressBar} style={{ width: healthPercent + '%' }} />
    </>
  );
}
