import { styles } from './EntityRow.styles';

export function EntityRow() {
  return (
    <div css={styles.entityRow}>
      <span css={styles.caret}>{'>'}</span> phase worm
    </div>
  );
}
