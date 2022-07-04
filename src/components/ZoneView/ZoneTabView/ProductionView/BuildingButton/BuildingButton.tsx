import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { formatNumber } from '../../../../../helpers/formatNumber';
import { BaseBuilding } from '../../../../../store/zone/buildings/baseBuilding';
import Tooltip, {
  TooltipText,
  TooltipDivider,
} from '../../../../Debug/shared/Tooltip/Tooltip';
import { styles } from './BuildingButton.styles';

interface BuildingButtonProps {
  building: BaseBuilding;
}

function BuildingButton({ building }: BuildingButtonProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      {hovered && (
        <Tooltip top={12} left={190} width={200}>
          <TooltipText italic={true} center={true} light={true}>
            {building.description}
          </TooltipText>
          <TooltipDivider text={'cost'} />
          <TooltipText>
            {building.currentCostDisplay.map(
              ({ resourceDisplayName, quantity }) => {
                return (
                  <div key={resourceDisplayName}>
                    {resourceDisplayName}: {formatNumber(quantity)}
                  </div>
                );
              },
            )}
          </TooltipText>
          <TooltipDivider text={'effects'} />
          <TooltipText light={true}>
            {building.displayEffects.map(
              ({ resourceDisplayName, quantityPerSecond }) => {
                return (
                  <div key={resourceDisplayName}>
                    {resourceDisplayName}:{' '}
                    {formatNumber(quantityPerSecond, { showSign: true })}/sec
                  </div>
                );
              },
            )}
          </TooltipText>
        </Tooltip>
      )}
      <button
        key={building.buildingName}
        css={styles.buildingBox}
        type="button"
        onClick={() => building.buy(1)}
        disabled={!building.affordable}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <span>
          {building.displayName} (
          {formatNumber(building.quantity, { digits: 0 })})
        </span>
      </button>
    </>
  );
}

export default observer(BuildingButton);
