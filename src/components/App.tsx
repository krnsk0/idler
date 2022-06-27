import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { styles } from './App.styles';
import ZoneView from './ZoneView/ZoneView';
import { useStoreTick } from './useStoreTick';
import { useStore } from '../store/Provider';
import { Zone } from '../store/zone/zone';

function App() {
  const root = useStore();
  const [activeZone, setActiveZone] = useState<Zone>(root.zones[0]);

  useStoreTick();

  return (
    <div css={styles.centerOuter}>
      <ZoneView zone={activeZone} />
      <div css={styles.debugButtons}>
        <button
          type="button"
          onClick={() => {
            root.addZone();
          }}
        >
          add zone
        </button>
        {root.zones.map((zone, index) => {
          return (
            <button
              key={zone.id}
              type="button"
              onClick={() => setActiveZone(zone)}
            >
              view zone {zone.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default observer(App);
