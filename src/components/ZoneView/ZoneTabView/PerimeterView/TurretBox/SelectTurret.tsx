import { observer } from 'mobx-react-lite';
import { styles } from './TurretBox.styles';
import { Zone } from '../../../../../store/zone/zone';

function SelectTurret({ zone }: { zone: Zone }) {
  const turretIndex = zone.perimeter.turrets.length;

  return (
    <div
      css={[styles.turretBox, styles.emptyTurretBox]}
      onClick={() => zone.perimeter.openTurretPurchaseModal(turretIndex)}
    >
      <div css={styles.plusSign}>+</div>
      <div>install</div>
      <div>turret</div>
    </div>
  );
}

export default observer(SelectTurret);
