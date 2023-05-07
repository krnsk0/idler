import { observer } from 'mobx-react-lite';
import { BaseEnemy } from '../../../../store/zone/perimeter/enemies/baseEnemy';
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
  const cooldown =
    enemy.attackCooldownRemaining > 0
      ? formatTime(enemy.attackCooldownRemaining)
      : '-';
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
        <div>distance: {formatNumber(enemy.distanceFromPerimeter)} meters</div>
        <div>speed: {formatNumber(enemy.movementSpeed)} meters per second</div>
        <div>attack: {formatNumber(enemy.attackDamage)}</div>
        <div>range: {formatNumber(enemy.attackRange)} meters</div>
        <div>cooldown: {cooldown}</div>
      </TooltipText>
    </>
  );
});

function EnemyRow({ enemy }: EnemyRowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const health = enemy.remainingHitPointsPercent * 100;

  const isExpanded = enemy.isExpanded;

  return (
    <>
      <TooltipPortalRenderer containerRef={containerRef}>
        {<EnemyRowTooltip enemy={enemy} />}
      </TooltipPortalRenderer>
      <div
        css={(theme) => [
          styles.enemyRow(theme),
          isExpanded && styles.noBottomBorder,
        ]}
        ref={containerRef}
        onClick={() => {
          enemy.expandEnemy();
        }}
      >
        <div css={styles.progressBar} style={{ width: health + '%' }} />
        <div
          css={styles.caret}
          style={{ transform: isExpanded ? 'rotate(90deg)' : 'none' }}
        >
          {'>'}
        </div>
        <div css={styles.enemyRowRight}>
          <div>{enemy.displayName}</div>
          <div css={[enemy.isAttacking && styles.bump]}>
            {enemy.stateDescriptor}
          </div>
        </div>
      </div>
      {enemy.isExpanded && (
        <div css={styles.expandedResourceTooltip}>
          <EnemyRowTooltip enemy={enemy} />
        </div>
      )}
    </>
  );
}

export default observer(EnemyRow);
