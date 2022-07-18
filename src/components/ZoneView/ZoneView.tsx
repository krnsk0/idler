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
    <div css={styles.zoneGridContainer} id="zone-outer">
      <div css={styles.zoneOuter} id="zone-outer">
        <div css={styles.zoneBody} id="zone-body">
          <div css={styles.zoneLeft} id="zone-left">
            <div>
              <h2 css={styles.zoneHeader}>{zone.name}</h2>
            </div>
            <ZoneTabView zone={zone} />
          </div>
          <ResourceView zone={zone} />
        </div>
      </div>
    </div>
  );
}

export default observer(ZoneView);
