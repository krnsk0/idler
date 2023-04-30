import { observer } from 'mobx-react-lite';
import { styles } from './TurretBox.styles';

function TurretBox() {
  return (
    <div css={[styles.turretBox, styles.emptyTurretBox]}>
      <div css={styles.plusSign}>+</div>
      <div>construct</div>
      <div>turret</div>
    </div>
  );
}

export default observer(TurretBox);
