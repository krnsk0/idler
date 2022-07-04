import { observer } from 'mobx-react-lite';
import { formatNumber } from '../../../../helpers/formatNumber';
import { Zone } from '../../../../store/zone/zone';
import { styles } from './ProdutionView.styles';

interface BuildingViewProps {
  zone: Zone;
}

function BuildingView({ zone }: BuildingViewProps) {
  return (
    <div css={styles.buildingsContainer}>
      {zone.buildings.asArray.map((building) => {
        return (
          <button
            key={building.buildingName}
            css={styles.buildingBox}
            type="button"
            onClick={() => building.buy(1)}
            disabled={!building.affordable}
          >
            <span>
              {building.displayName} (
              {formatNumber(building.quantity, { digits: 0 })})
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
      })}
    </div>
  );
}

export default observer(BuildingView);
