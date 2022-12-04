import { observer } from 'mobx-react-lite';
import { formatNumber } from '../../../../../utils/formatNumber';
import { BaseBuilding } from '../../../../../store/zone/buildings/baseBuilding';
import ZoneEntityButton from '../../../../shared/ZoneEntityButton/ZoneEntityButton';
import BuildingTooltip from './BuildingTooltip';

interface BuildingButtonProps {
  building: BaseBuilding;
}

function BuildingButton({ building }: BuildingButtonProps) {
  if (!building.unlocked) return null;

  return (
    <ZoneEntityButton
      tooltip={<BuildingTooltip building={building} />}
      onClick={() => building.buy(1)}
      disabled={!building.affordable}
      showEntranceAnimation={building.showEntranceAnimation}
      entranceAnimationDuration={building.entranceAnimationDuration}
    >
      <span>
        {building.displayName} ({formatNumber(building.quantity, { digits: 0 })}
        )
      </span>
    </ZoneEntityButton>
  );
}

export default observer(BuildingButton);
