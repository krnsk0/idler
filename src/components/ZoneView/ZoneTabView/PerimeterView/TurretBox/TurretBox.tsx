import { observer } from 'mobx-react-lite';
import { styles } from './TurretBox.styles';
import { Zone } from '../../../../../store/zone/zone';
import { BaseTurret } from '../../../../../store/zone/perimeter/turrets/baseTurret';

function TurretBox({ turret, zone }: { turret: BaseTurret; zone: Zone }) {
  const ammoBarWidth = turret.isReloading
    ? turret.reloadProgress
    : turret.ammoPercent;

  return (
    <div css={styles.turretBox}>
      <div css={styles.turretTop}>
        <div css={styles.turretBoxHeader}>{turret.displayName}</div>
        <div css={[styles.stateIcon, turret.isAttacking && styles.bump]}>
          {turret.stateIcon}
        </div>
      </div>
      <div css={styles.turretBottom}>
        <div
          css={(theme) => [
            styles.stateBox,
            turret.isAmmoEmpty && !turret.isReloading && styles.flasher(theme),
          ]}
        >
          {turret.stateDescriptor}
        </div>
        <div
          css={(theme) =>
            styles.progressBarBox(
              theme,
              turret.isAmmoEmpty && turret.canAffordReload,
            )
          }
          onClick={() => {
            if (
              turret.isAmmoEmpty &&
              !turret.isReloading &&
              turret.canAffordReload
            )
              turret.startReload();
          }}
        >
          <div
            css={styles.progressBar}
            style={{ width: ammoBarWidth * 100 + '%' }}
          ></div>
          <div
            css={(theme) =>
              styles.boxText(
                theme,
                !turret.isAmmoEmpty || turret.canAffordReload,
              )
            }
          >
            {turret.isAmmoEmpty && !turret.isReloading && 'reload'}
            {!turret.isAmmoEmpty && `${turret.ammo} / ${turret.ammoCapacity}`}
            {turret.isReloading && ''}
          </div>
        </div>
      </div>
    </div>
  );
}

export default observer(TurretBox);
