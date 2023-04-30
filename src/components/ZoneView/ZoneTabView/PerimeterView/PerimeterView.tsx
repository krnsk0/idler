import { observer } from 'mobx-react-lite';

import { Zone } from '../../../../store/zone/zone';
import { styles } from './PerimeterView.styles';
import EnemyRow from './EnemyRow';
import { formatTime } from '../../../../utils/formatTime';
import { spinner } from '../../../../utils/spinner';
import { formatNumber } from '../../../../utils/formatNumber';
import EmptyEmplacement from './EmptyEmplacement';
import TurretBox from './TurretBox';

interface PerimeterViewProps {
  zone: Zone;
}

function PerimeterView({ zone }: PerimeterViewProps) {
  const perimeter = zone.perimeter;

  const enemiesPresent = perimeter.enemies.length > 0;

  return (
    <div css={styles.perimeterContainer} id="perimeter-view-outer">
      <div css={[styles.enemyBox, !enemiesPresent && styles.emptyEnemyBox]}>
        {enemiesPresent ? (
          perimeter.enemies.map((enemy) => {
            return <EnemyRow key={enemy.id} enemy={enemy} />;
          })
        ) : (
          <div css={styles.emptyPerimeterMessage}>
            {zone.radar.isScanning && (
              <>
                <div>scanning...</div>
                <div>{spinner(zone.radar.timeLeft)}</div>
              </>
            )}
            {zone.radar.isCountingDown && (
              <>
                <div>next wave</div>
                <div>{formatTime(zone.radar.timeLeft ?? 0)}</div>
              </>
            )}
          </div>
        )}
      </div>
      <div css={styles.integrityHeader}>perimeter integrity</div>
      <div css={styles.integrityBox}>
        <div
          css={styles.progressBar}
          style={{ width: zone.perimeter.perimeterHealthPercent * 100 + '%' }}
        ></div>
        <div css={styles.integrityText}>
          {formatNumber(zone.perimeter.perimeterHealth)} /{' '}
          {formatNumber(zone.perimeter.maxPerimeterHealth)}
        </div>
      </div>
      <div css={styles.turretHeader}>defensive emplacements</div>
      <div css={styles.turretContainer}>
        {zone.perimeter.canPurchaseTurret && <EmptyEmplacement zone={zone} />}
        {zone.perimeter.turrets.map((turret) => (
          <TurretBox turret={turret} />
        ))}
      </div>
    </div>
  );
}

export default observer(PerimeterView);
