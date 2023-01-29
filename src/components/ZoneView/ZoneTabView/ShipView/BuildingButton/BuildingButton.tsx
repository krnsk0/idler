import { observer } from 'mobx-react-lite';
import { formatNumber } from '../../../../../utils/formatNumber';
import { BaseBuilding } from '../../../../../store/zone/buildings/baseBuilding';
import ZoneEntityButton from '../../../../shared/ZoneEntityButton/ZoneEntityButton';
import BuildingTooltip from './BuildingTooltip';
import { styles } from './BuildingButton.styles';

interface BuildingButtonProps {
  building: BaseBuilding;
  tooltipPosition: 'RIGHT' | 'LEFT';
}

function BuildingButton({ building, tooltipPosition }: BuildingButtonProps) {
  if (!building.unlocked) return null;

  return (
    <ZoneEntityButton
      tooltipPosition={tooltipPosition}
      tooltip={<BuildingTooltip building={building} />}
      onClick={() => building.buy(1)}
      disabled={!building.affordable}
      showEntranceAnimation={building.showEntranceAnimation}
      entranceAnimationDuration={building.entranceAnimationDuration}
    >
      <>
        <span>
          {building.displayName} (
          {building.numberActive < building.quantity &&
            formatNumber(building.numberActive, { digits: 0 }) + '/'}
          {formatNumber(building.quantity, { digits: 0 })})
        </span>
        {building.quantity > 0 && building.canSomeBeTurnedOff && (
          <div css={styles.onOff}>
            <div
              onClick={(e) => {
                e.stopPropagation();
                building.enableEntity();
              }}
            >
              +
            </div>
            <div
              onClick={(e) => {
                e.stopPropagation();
                building.disableEntity();
              }}
            >
              -
            </div>
          </div>
        )}
      </>
    </ZoneEntityButton>
  );
}

export default observer(BuildingButton);
