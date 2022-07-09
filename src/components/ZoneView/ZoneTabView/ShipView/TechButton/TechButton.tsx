import { observer } from 'mobx-react-lite';
import { useStore } from '../../../../../store/Provider';
import ZoneEntityButton from '../../../../shared/ZoneEntityButton/ZoneEntityButton';

function TechButton() {
  const root = useStore();
  const selectedTech = root.tech.selectedTech;

  if (!root.tech.unlocked) return null;
  return (
    <ZoneEntityButton
      tooltipTop={12}
      tooltipLeft={190}
      tooltip={<>test</>}
      onClick={() => {
        root.gui.openTechModal();
      }}
      progress={selectedTech?.progress ?? 0}
    >
      {selectedTech ? (
        <div>{selectedTech.displayName}</div>
      ) : (
        <div>pick compute target</div>
      )}
    </ZoneEntityButton>
  );
}

export default observer(TechButton);
