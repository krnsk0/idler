import { BaseEnemy } from '../../../../store/zone/perimeter/baseEnemy';
import { styles } from './EnemyRow.styles';

interface EnemyRowProps {
  enemy: BaseEnemy;
}

export function EnemyRow({ enemy }: EnemyRowProps) {
  return (
    <div
      css={styles.enemyRow}
      onClick={() => {
        enemy.expandEnemy();
      }}
    >
      <span
        css={styles.caret}
        style={{ transform: enemy.isExpanded ? 'rotate(90deg)' : 'none' }}
      >
        {'>'}
      </span>
      <span>phase worm</span>
    </div>
  );
}
