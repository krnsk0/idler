import { observer } from 'mobx-react-lite';
import { formatNumber } from '../../helpers/formatNumber';
import { Zone } from '../../store/zone/zone';
import { BuildingNames } from '../../store/zone/buildings/buildingNames';
import { styles } from './ZoneView.styles';
import ResourceView from './ResourceView/ResourceView';
import BuildingView from './BuildingView/BuildingView';

interface ZoneViewProps {
  zone: Zone;
}

function ZoneView({ zone }: ZoneViewProps) {
  return (
    <div css={styles.zoneOuter}>
      <div css={styles.zoneHeader}>{zone.name}</div>
      <div css={styles.zoneBody}>
        <ResourceView zone={zone} />
        <BuildingView zone={zone} />
      </div>
    </div>
  );
}

export default observer(ZoneView);
