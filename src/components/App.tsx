import { observer } from 'mobx-react-lite';
import ZoneView from './ZoneView/ZoneView';
import { useStoreTick } from './useStoreTick';
import { useStore } from '../store/Provider';
import DebugView from './DebugView/DebugView';
import TechModal from './TechModal/TechModal';
import { useLocalSave } from './useLocalSave';
import { useLocalLoad } from './useLocalLoad';
import OptionsModal from './OptionsModal/OptionsModal';
import OptionsButton from './OptionsButton/OptionsButton';

function App() {
  const root = useStore();
  const selectedZone = root.game.selectedZone;
  useLocalLoad();
  useLocalSave();
  useStoreTick();

  return (
    <>
      <DebugView />
      <OptionsButton />
      {selectedZone && <ZoneView zone={selectedZone} />}
      <TechModal />
      <OptionsModal />
    </>
  );
}

export default observer(App);
