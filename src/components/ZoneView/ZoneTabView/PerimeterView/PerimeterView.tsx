import { observer } from 'mobx-react-lite';
import { useStore } from '../../../../store/Provider';

import { Zone } from '../../../../store/zone/zone';
import { styles } from './PerimeterView.styles';

interface PerimeterViewProps {
  zone: Zone;
}

function UpgradeView({ zone }: PerimeterViewProps) {
  const root = useStore();

  return (
    <>
      <div css={styles.perimeterContainer} id="perimeter-view-outer">
        perimeter
      </div>
    </>
  );
}

export default observer(UpgradeView);
