import { observer } from 'mobx-react-lite';
import { styles } from './TurretBox.styles';
import { BaseTurret } from '../../../../../store/zone/perimeter/turrets/baseTurret';
import { TooltipPortalRenderer } from '../../../../shared/Tooltip/Tooltip';
import { useRef } from 'react';
import { TurretBoxTooltip } from './TurretBoxTooltip';

function TurretBox({ turret }: { turret: BaseTurret }) {
  const {
    canAffordReload,
    displayName,
    isAttacking,
    isAmmoEmpty,
    isReloading,
    ammo,
    ammoCapacity,
    stateIcon,
    stateDescriptor,
    ammoPercent,
    reloadProgress,
  } = turret;

  const ammoBarWidth = turret.isReloading ? reloadProgress : ammoPercent;

  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <TooltipPortalRenderer containerRef={containerRef}>
        {<TurretBoxTooltip turret={turret} />}
      </TooltipPortalRenderer>
      <div css={styles.turretBox} ref={containerRef}>
        <div css={styles.turretTop}>
          <div css={styles.turretBoxHeader}>{displayName}</div>
          <div css={[styles.stateIcon, isAttacking && styles.bump]}>
            {stateIcon}
          </div>
        </div>
        <div css={styles.turretBottom}>
          <div
            css={(theme) => [
              styles.stateBox,
              isAmmoEmpty && !isReloading && styles.flasher(theme),
            ]}
          >
            {stateDescriptor}
          </div>
          <div
            css={(theme) =>
              styles.progressBarBox(theme, isAmmoEmpty && canAffordReload)
            }
            onClick={() => {
              if (isAmmoEmpty && !isReloading && canAffordReload)
                turret.startReload();
            }}
          >
            <div
              css={styles.progressBar}
              style={{ width: ammoBarWidth * 100 + '%' }}
            ></div>
            <div
              css={(theme) =>
                styles.boxText(theme, !isAmmoEmpty || canAffordReload)
              }
            >
              {isAmmoEmpty && !isReloading && 'reload'}
              {!isAmmoEmpty && `${ammo} / ${ammoCapacity}`}
              {isReloading && ''}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default observer(TurretBox);
