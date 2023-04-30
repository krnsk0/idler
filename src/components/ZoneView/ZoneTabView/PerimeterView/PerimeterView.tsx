import { observer } from 'mobx-react-lite';

import { Zone } from '../../../../store/zone/zone';
import { styles } from './PerimeterView.styles';
import EnemyRow from './EnemyRow';
import { formatTime } from '../../../../utils/formatTime';
import { spinner } from '../../../../utils/spinner';
import PerimeterIntegrity from '../../../shared/PerimeterIntegrity/PerimeterIntegrity';

interface PerimeterViewProps {
  zone: Zone;
}

function PerimeterView({ zone }: PerimeterViewProps) {
  const perimeter = zone.perimeter;

  return (
    <div css={styles.perimeterContainer} id="perimeter-view-outer">
      <div css={styles.enemyBoxHeader}>
        {perimeter.enemies.length > 0 ? (
          <>
            <div>entities remaining</div>
            <div>{perimeter.enemies.length}</div>
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
      <div css={styles.enemyBox}>
        {perimeter.enemies.map((enemy) => {
          return <EnemyRow key={enemy.id} enemy={enemy} />;
        })}
      </div>
      <PerimeterIntegrity zone={zone} />
    </div>
  );
}

export default observer(PerimeterView);
