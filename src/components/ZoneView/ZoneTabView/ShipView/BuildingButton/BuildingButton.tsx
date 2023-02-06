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
      showEntranceAnimation={building.showEntranceAnimation()}
      buttonText={`${building.displayName} (${
        building.numberActive < building.quantity
          ? formatNumber(building.numberActive, { digits: 0 }) + '/'
          : ''
      }${formatNumber(building.quantity, { digits: 0 })})`}
      enableEntity={
        building.canSomeBeTurnedOff ? () => building.enableEntity() : undefined
      }
      disableEntity={
        building.canSomeBeTurnedOff ? () => building.disableEntity() : undefined
      }
      canEnableEntity={building.canEnableEntity}
      canDisableEntity={building.canDisableEntity}
      isButtonExpanded={building.isExpanded}
      expandButton={() => building.expandButton()}
    />
  );
}

export default observer(BuildingButton);
