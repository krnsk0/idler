import { observer } from 'mobx-react-lite';
import { BaseEnemy } from '../../../../store/zone/perimeter/baseEnemy';
import { styles } from './EnemyRow.styles';
import { formatTime } from '../../../../utils/formatTime';
import {
  DesktopTooltipTitle,
  TooltipDivider,
  TooltipPortalRenderer,
  TooltipText,
} from '../../../shared/Tooltip/Tooltip';
import { useRef } from 'react';
import { formatNumber } from '../../../../utils/formatNumber';

interface EnemyRowProps {
  enemy: BaseEnemy;
}

const EnemyRowTooltip = observer(({ enemy }: EnemyRowProps) => {
  return (
    <>
      <DesktopTooltipTitle showDivider={true}>
        {enemy.displayName}
      </DesktopTooltipTitle>
      <TooltipText italic={true} align={'center'}>
        {enemy.description}
      </TooltipText>
      <TooltipDivider smallMargin={true} />

      <TooltipText>
        <div>
          health: {formatNumber(enemy.remainingHitPoints)} /{' '}
          {formatNumber(enemy.maxHitPoints)}
        </div>
        <div>attack: {formatNumber(enemy.attackDamage)}</div>
        <div>speed: {formatNumber(enemy.movementSpeed)}</div>
        <div>distance: {formatNumber(enemy.distanceFromPerimeter)}</div>
        <div>cooldown: {formatTime(enemy.attackCooldownRemaining)}</div>
      </TooltipText>
    </>
  );
});

function EnemyRow({ enemy }: EnemyRowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const health = enemy.remainingHitPointsPercent * 100;

  return (
    <>
      <TooltipPortalRenderer containerRef={containerRef}>
        {<EnemyRowTooltip enemy={enemy} />}
      </TooltipPortalRenderer>
      <div
        css={styles.enemyRow}
        ref={containerRef}
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
          <div>{enemy.displayName}</div>
          <div>{enemy.state}</div>
        </div>
      </div>
      {enemy.isExpanded && (
        <div css={[styles.expandedResourceTooltip]}>
          <EnemyRowTooltip enemy={enemy} />
        </div>
      )}
    </>
  );
}

export default observer(EnemyRow);
