import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { formatNumber } from '../../../../helpers/formatNumber';
import { BaseBuilding } from '../../../../store/zone/buildings/baseBuilding';
import Tooltip from '../../../Debug/shared/Tooltip/Tooltip';
import { styles } from './BuildingButton.styles';

interface BuildingViewProps {
  building: BaseBuilding;
}

function BuildingView({ building }: BuildingViewProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      {hovered && (
        <Tooltip top={12} left={190}>
          {building.currentCost.map(({ resource, quantity }) => {
            return (
              <div key={resource}>
                {resource}: {formatNumber(quantity)}
              </div>
            );
          })}
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

export default observer(BuildingView);
