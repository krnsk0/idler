import { observer } from 'mobx-react-lite';
import { styles } from './TurretBox.styles';

function TurretBox() {
  return <div css={styles.turretBox}></div>;
}

export default observer(TurretBox);
