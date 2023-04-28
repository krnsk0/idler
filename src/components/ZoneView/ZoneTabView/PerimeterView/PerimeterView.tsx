import { observer } from 'mobx-react-lite';
import { useStore } from '../../../../store/Provider';

import { Zone } from '../../../../store/zone/zone';
import { styles } from './PerimeterView.styles';
import { EntityRow } from './EntityRow';

interface PerimeterViewProps {
  zone: Zone;
}

function PerimeterView({ zone }: PerimeterViewProps) {
  const root = useStore();

  return (
    <>
      <div css={styles.perimeterContainer} id="perimeter-view-outer">
        <div css={styles.entityBox}>
          <EntityRow />
          <EntityRow />
        </div>
      </div>
    </>
  );
}

export default observer(PerimeterView);
