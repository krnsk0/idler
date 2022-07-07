import { observer } from 'mobx-react-lite';
import { useStore } from '../../../store/Provider';
import ZoneEntityButton from '../../shared/ZoneEntityButton/ZoneEntityButton';
import { styles } from './TechButton.styles';

function TechButton() {
  const root = useStore();
  const selectedTech = root.tech.selectedTech;

  if (!root.tech.unlocked) return null;
  return (
    <ZoneEntityButton
      tooltipTop={45}
      tooltipLeft={-18}
      tooltip={<>test</>}
      onClick={() => {
        root.gui.openTechModal();
      }}
      progress={selectedTech?.progress ?? 0}
    >
      {selectedTech ? (
        <div>{selectedTech.displayName}</div>
      ) : (
        <div>databanks</div>
      )}
    </ZoneEntityButton>
  );
}

export default observer(TechButton);
