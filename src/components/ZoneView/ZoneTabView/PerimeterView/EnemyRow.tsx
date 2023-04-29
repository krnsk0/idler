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

function EnemyRowTooltip({ enemy }: EnemyRowProps) {
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
        vigor: {formatNumber(enemy.remainingHitPoints)} /{' '}
        {formatNumber(enemy.maxHitPoints)}
      </TooltipText>
      <TooltipText>
        attack power: {formatNumber(enemy.attackDamage)}
      </TooltipText>
    </>
  );
}

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
          <div>{formatTime(enemy.cooldown)}</div>
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
