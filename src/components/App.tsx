import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import ZoneView from './ZoneView/ZoneView';
import { useStoreTick } from './useStoreTick';
import { useStore } from '../store/Provider';
import { Zone } from '../store/zone/zone';
import DebugView from './DebugView/DebugView';
import TechModal from './TechModal/TechModal';
import { useLocalSave } from './useLocalSave';
import { useLocalLoad } from './useLocalLoad';

function App() {
  const root = useStore();
  const [activeZone, setActiveZone] = useState<Zone>(root.zones[0]);

  useLocalLoad();
  useLocalSave();
  useStoreTick();

  return (
    <>
      <ZoneView zone={activeZone} />
      <DebugView setActiveZone={setActiveZone} />
      <TechModal />
    </>
  );
}

export default observer(App);
