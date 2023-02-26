import { observer } from 'mobx-react-lite';
import ZoneView from './ZoneView/ZoneView';
import { useStoreTick } from './useStoreTick';
import { useStore } from '../store/Provider';
import DebugView from './DebugView/DebugView';
import TechModal from './Modals/TechModal/TechModal';
import { useLocalSave } from './useLocalSave';
import { useLocalLoad } from './useLocalLoad';
import { useUser } from './useUser';
import OptionsModal from './Modals/OptionsModal/OptionsModal';
import OptionsButton from './OptionsButton/OptionsButton';
import PerimeterWarningModal from './Modals/PerimeterWarningModal/PerimeterWarningModal';

function App() {
  const root = useStore();
  const selectedZone = root.game.selectedZone;
  useLocalLoad();
  useLocalSave();
  useStoreTick();
  useUser();

  return (
    <>
      <DebugView />
      <OptionsButton />
      {selectedZone && <ZoneView zone={selectedZone} />}
      <TechModal />
      <OptionsModal />
      <PerimeterWarningModal />
    </>
  );
}

export default observer(App);
