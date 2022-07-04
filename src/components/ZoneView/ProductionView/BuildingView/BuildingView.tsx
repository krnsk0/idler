import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { formatNumber } from '../../../../helpers/formatNumber';
import { BaseBuilding } from '../../../../store/zone/buildings/baseBuilding';
import { styles } from '../ProdutionView.styles';

interface BuildingViewProps {
  building: BaseBuilding;
}

function BuildingView({ building }: BuildingViewProps) {
  const [hovered, setHovered] = useState(false);

  return (
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
        {building.displayName} ({formatNumber(building.quantity, { digits: 0 })}
        )
      </span>
      <div>
        {building.currentCost.map(({ resource, quantity }) => {
          return (
            <div key={resource}>
              {resource}: {formatNumber(quantity)}
            </div>
          );
        })}
      </div>
    </button>
  );
}

export default observer(BuildingView);
