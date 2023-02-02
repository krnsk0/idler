import { observer } from 'mobx-react-lite';
import { Zone } from '../../store/zone/zone';
import { styles } from './ZoneView.styles';
import ResourceView from './ResourceView/ResourceView';
import ZoneTabView from './ZoneTabView/ZoneTabView';

interface ZoneViewProps {
  zone: Zone;
}

function ZoneView({ zone }: ZoneViewProps) {
  return (
    <div css={styles.zoneOuter} id="zone-outer">
      <h2 css={styles.zoneHeader}>{zone.name}</h2>
      <ZoneTabView zone={zone} />
      <ResourceView zone={zone} />
    </div>
  );
}

export default observer(ZoneView);
