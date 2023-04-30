import { observer } from 'mobx-react-lite';
import { styles } from './TurretBox.styles';
import { BaseTurret } from '../../../../store/zone/perimeter/turrets/baseTurret';

function TurretBox({ turret }: { turret: BaseTurret }) {
  return <div css={styles.turretBox}>turret!</div>;
}

export default observer(TurretBox);
