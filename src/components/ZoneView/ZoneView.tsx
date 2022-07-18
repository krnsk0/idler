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
    <div css={styles.zoneOuter}>
      <div css={styles.zoneBody}>
        <div css={styles.zoneLeft}>
          <div>
            <h2 css={styles.zoneHeader}>{zone.name}</h2>
          </div>
          <ZoneTabView zone={zone} />
        </div>
        <ResourceView zone={zone} />
      </div>
    </div>
  );
}

export default observer(ZoneView);
