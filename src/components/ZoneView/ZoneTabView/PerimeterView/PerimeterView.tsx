import { observer } from 'mobx-react-lite';

import { Zone } from '../../../../store/zone/zone';
import { styles } from './PerimeterView.styles';
import { EntityRow } from './EntityRow';
import { formatTime } from '../../../../utils/formatTime';
import { spinner } from '../../../../utils/spinner';

interface PerimeterViewProps {
  zone: Zone;
}

function PerimeterView({ zone }: PerimeterViewProps) {
  const perimeter = zone.perimeter;

  return (
    <>
      <div css={styles.countdown}>
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
      <div css={styles.perimeterContainer} id="perimeter-view-outer">
        <div css={styles.entityBox}>
          <EntityRow />
          <EntityRow />
        </div>
      </div>
    </>
  );
}

export default observer(PerimeterView);
