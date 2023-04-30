import { observer } from 'mobx-react-lite';
import { styles } from './TurretBox.styles';
import { Zone } from '../../../../store/zone/zone';

function EmptyEmplacement({ zone }: { zone: Zone }) {
  return (
    <div
      css={[styles.turretBox, styles.emptyTurretBox]}
      onClick={() => zone.perimeter.constructTurret()}
    >
      <div css={styles.plusSign}>+</div>
      <div>construct</div>
      <div>turret</div>
    </div>
  );
}

export default observer(EmptyEmplacement);
