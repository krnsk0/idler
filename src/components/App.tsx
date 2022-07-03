import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { styles } from './App.styles';
import ZoneView from './ZoneView/ZoneView';
import { useStoreTick } from './useStoreTick';
import { useStore } from '../store/Provider';
import { Zone } from '../store/zone/zone';
import { getSnapshot } from 'mobx-keystone';
import Debug from './Debug/Debug';

function App() {
  const root = useStore();
  const [activeZone, setActiveZone] = useState<Zone>(root.zones[0]);

  useStoreTick();

  return (
    <div css={styles.centerOuter}>
      <ZoneView zone={activeZone} />
      <Debug setActiveZone={setActiveZone} />
    </div>
  );
}

export default observer(App);
