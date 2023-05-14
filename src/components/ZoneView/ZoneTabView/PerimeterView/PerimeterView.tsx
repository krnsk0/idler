import { observer } from 'mobx-react-lite';

import { Zone } from '../../../../store/zone/zone';
import { styles } from './PerimeterView.styles';
import EnemyRow from './EnemyRow';
import { formatTime } from '../../../../utils/formatTime';
import { spinner } from '../../../../utils/spinner';
import { formatNumber } from '../../../../utils/formatNumber';
import SelectTurret from './TurretBox/SelectTurret';
import TurretBox from './TurretBox/TurretBox';
import ConstructEmplacement from './TurretBox/ConstructEmplacement';
import InvisiblePlaceholder from './TurretBox/InvisiblePlaceholder';
import { EMPLACEMENT_LIMIT } from '../../../../store/zone/perimeter/perimeter';
import { HealthBar } from '../../../shared/HealthBar/HealthBar';
import TurretPurchaseModal from './TurretPurchaseModal/TurretPurchaseModal';

interface PerimeterViewProps {
  zone: Zone;
}

function PerimeterView({ zone }: PerimeterViewProps) {
  const perimeter = zone.perimeter;
  const radar = zone.radar;

  const enemiesPresent = perimeter.enemies.length > 0;

  return (
    <>
      <div css={styles.perimeterContainer} id="perimeter-view-outer">
        <div css={[styles.enemyBox, !enemiesPresent && styles.emptyEnemyBox]}>
          {enemiesPresent ? (
            perimeter.enemies.map((enemy) => {
              return <EnemyRow key={enemy.id} enemy={enemy} />;
            })
          ) : (
            <div css={styles.emptyPerimeterMessage}>
              {radar.isScanning && (
                <>
                  <div>scanning...</div>
                  <div>{spinner(radar.timeLeft)}</div>
                </>
              )}
              {radar.isCountingDown && (
                <>
                  <div>next wave</div>
                  <div>{formatTime(radar.timeLeft ?? 0)}</div>
                </>
              )}
            </div>
          )}
        </div>
        <div css={styles.integrityHeader}>perimeter integrity</div>
        <div css={styles.integrityBox}>
          <HealthBar
            healthPercent={zone.perimeter.perimeterHealthPercent * 100}
          />
          <div css={styles.integrityText}>
            {formatNumber(perimeter.perimeterHealth)} /{' '}
            {formatNumber(perimeter.maxPerimeterHealth)}
          </div>
        </div>
        <div css={styles.turretHeader}>
          emplacements ({perimeter.turrets.length} / {EMPLACEMENT_LIMIT})
        </div>
        <div css={styles.turretContainer}>
          {perimeter.turrets.map((turret) => (
            <TurretBox key={turret.id} turret={turret} zone={zone} />
          ))}
          {perimeter.canPurchaseTurret && <SelectTurret zone={zone} />}
          {perimeter.newEmplacementAvailable && (
            <ConstructEmplacement zone={zone} />
          )}
          {/* render the <InvisiblePlaceholder /> component if we have an odd number of turrets */}
          {perimeter.turrets.length === 2 &&
            (perimeter.canPurchaseTurret ||
              perimeter.newEmplacementAvailable) && <InvisiblePlaceholder />}
        </div>
      </div>
      <TurretPurchaseModal zone={zone} />
    </>
  );
}

export default observer(PerimeterView);
