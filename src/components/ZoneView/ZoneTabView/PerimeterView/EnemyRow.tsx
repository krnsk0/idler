import { observer } from 'mobx-react-lite';
import { BaseEnemy } from '../../../../store/zone/perimeter/baseEnemy';
import { styles } from './EnemyRow.styles';
import { formatTime } from '../../../../utils/formatTime';

interface EnemyRowProps {
  enemy: BaseEnemy;
}

function EnemyRow({ enemy }: EnemyRowProps) {
  const health = enemy.remainingHitPointsPercent * 100;
  console.log('health: ', health);

  return (
    <div
      css={styles.enemyRow}
      onClick={() => {
        enemy.expandEnemy();
      }}
    >
      <div css={styles.progressBar} style={{ width: health + '%' }} />
      <div
        css={styles.caret}
        style={{ transform: enemy.isExpanded ? 'rotate(90deg)' : 'none' }}
      >
        {'>'}
      </div>
      <div css={styles.enemyRowRight}>
        <div>phase worm</div>
        <div>{formatTime(enemy.cooldown)}</div>
      </div>
    </div>
  );
}

export default observer(EnemyRow);
