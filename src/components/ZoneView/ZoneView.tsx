import { observer } from 'mobx-react-lite';
import { Zone } from '../../store/zone/zone';
import { styles } from './ZoneView.styles';
import ResourceView from './ResourceView/ResourceView';
import BuildingView from './BuildingView/BuildingView';

interface ZoneViewProps {
  zone: Zone;
}

function ZoneView({ zone }: ZoneViewProps) {
  return (
    <div css={styles.zoneOuter}>
      <div css={styles.zoneBody}>
        <BuildingView zone={zone} />
        <ResourceView zone={zone} />
      </div>
    </div>
  );
}

export default observer(ZoneView);
