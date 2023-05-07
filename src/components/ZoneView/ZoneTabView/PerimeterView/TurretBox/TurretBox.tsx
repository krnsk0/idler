import { observer } from 'mobx-react-lite';
import { styles } from './TurretBox.styles';
import { BaseTurret } from '../../../../../store/zone/perimeter/turrets/baseTurret';

function TurretBox({ turret }: { turret: BaseTurret }) {
  const ammoBarWidth = turret.isReloading
    ? turret.reloadProgress
    : turret.ammoPercent;

  return (
    <div css={styles.turretBox}>
      <div css={styles.turretTop}>
        <div css={styles.turretBoxHeader}>{turret.displayName}</div>
        <div css={styles.stateIcon}>{turret.stateIcon}</div>
      </div>
      <div css={styles.turretBottom}>
        <div css={styles.stateBox}>{turret.stateDescriptor}</div>
        <div
          css={(theme) => styles.progressBarBox(theme, turret.isAmmoEmpty)}
          onClick={() => {
            if (turret.isAmmoEmpty) turret.startReload();
          }}
        >
          <div
            css={styles.progressBar}
            style={{ width: ammoBarWidth * 100 + '%' }}
          ></div>
          <div
            css={(theme) => [
              styles.boxText,
              turret.isAmmoEmpty && !turret.isReloading && styles.reload(theme),
            ]}
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
