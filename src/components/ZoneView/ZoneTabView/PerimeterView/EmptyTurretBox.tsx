import { observer } from 'mobx-react-lite';
import { styles } from './TurretBox.styles';

function TurretBox() {
  return (
    <div css={[styles.turretBox, styles.emptyTurretBox]}>
      <div css={styles.plusSign}>+</div>
      <div>augment</div>
      <div>defenses</div>
    </div>
  );
}

export default observer(TurretBox);
