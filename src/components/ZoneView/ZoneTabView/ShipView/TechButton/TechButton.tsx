import { getSnapshot } from 'mobx-keystone';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../../../store/Provider';
import ZoneEntityButton from '../../../../shared/ZoneEntityButton/ZoneEntityButton';

function TechButton() {
  const root = useStore();
  const selectedTech = root.tech.selectedTech;

  if (!root.tech.unlocked) return null;
  return (
    <ZoneEntityButton
      tooltip={<></>}
      onClick={() => {
        root.gui.openTechModal();
      }}
      progress={selectedTech?.progress ?? 0}
    >
      <div>databanks</div>
      {selectedTech && <div>{selectedTech.displayName}</div>}
    </ZoneEntityButton>
  );
}

export default observer(TechButton);
