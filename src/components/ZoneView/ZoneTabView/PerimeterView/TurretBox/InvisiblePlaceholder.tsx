import { observer } from 'mobx-react-lite';
import { styles } from './TurretBox.styles';

function InvisiblePlaceholder() {
  return <div css={[styles.turretBox, styles.invisiblePlaceholder]}></div>;
}

export default observer(InvisiblePlaceholder);
