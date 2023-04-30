import { observer } from 'mobx-react-lite';
import { styles } from './TurretBox.styles';
import { Zone } from '../../../../store/zone/zone';

function ConstructEmplacement({ zone }: { zone: Zone }) {
  return (
    <div css={[styles.turretBox, styles.emptyTurretBox]} onClick={() => {}}>
      <div css={styles.plusSign}>+</div>
      <div>fortify</div>
    </div>
  );
}

export default observer(ConstructEmplacement);
