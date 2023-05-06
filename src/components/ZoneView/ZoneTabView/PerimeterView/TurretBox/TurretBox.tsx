import { observer } from 'mobx-react-lite';
import { styles } from './TurretBox.styles';
import { BaseTurret } from '../../../../../store/zone/perimeter/turrets/baseTurret';

function TurretBox({ turret }: { turret: BaseTurret }) {
  return (
    <div css={styles.turretBox}>
      <div css={styles.turretTop}>
        <div css={styles.turretBoxHeader}>{turret.displayName}</div>
      </div>
      <div css={styles.turretBottom}>
        <div css={styles.ammoDisplay}>
          ammo: {turret.ammo} / {turret.ammoCapacity}
        </div>
        <div css={styles.progressBarBox}>
          <div css={styles.progressBar} style={{ width: 50 + '%' }}></div>
          <div css={styles.boxText}>{turret.stateDescriptor}</div>
        </div>
      </div>
    </div>
  );
}

export default observer(TurretBox);
