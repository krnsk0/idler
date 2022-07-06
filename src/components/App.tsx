import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import ZoneView from './ZoneView/ZoneView';
import { useStoreTick } from './useStoreTick';
import { useStore } from '../store/Provider';
import { Zone } from '../store/zone/zone';
import DebugView from './DebugView/DebugView';
import TechModal from './TechModal/TechModal';

function App() {
  const root = useStore();
  const [activeZone, setActiveZone] = useState<Zone>(root.zones[0]);

  const { techModalOpen, closeTechModal } = root.gui;

  useStoreTick();

  return (
    <>
      <ZoneView zone={activeZone} />
      <DebugView setActiveZone={setActiveZone} />
      <TechModal isOpen={techModalOpen} closeModal={closeTechModal} />
    </>
  );
}

export default observer(App);
