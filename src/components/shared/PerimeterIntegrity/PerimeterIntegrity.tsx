import { observer } from 'mobx-react-lite';
import { styles } from './PerimeterIntegrity.styles';
import { Zone } from '../../../store/zone/zone';

interface PerimeterIntegrityProps {
  zone: Zone;
}

function PerimeterIntegrity({ zone }: PerimeterIntegrityProps) {
  return (
    <div css={styles.integrityBox}>
      <div
        css={styles.progressBar}
        style={{ width: zone.perimeter.perimeterHealthPercent * 100 + '%' }}
      ></div>
      <div css={styles.integrityText}>
        perimeter integrity {zone.perimeter.perimeterHealth} /{' '}
        {zone.perimeter.maxPerimeterHealth}
      </div>
    </div>
  );
}

export default observer(PerimeterIntegrity);
