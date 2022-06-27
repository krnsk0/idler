import { observer } from 'mobx-react-lite';
import { formatNumber } from '../../helpers/formatNumber';
import { Zone } from '../../store/zone/zone';
import { BuildingNames } from '../../store/zone/buildings/buildingNames';
import { styles } from './ZoneView.styles';
import ResourceView from './ResourceView/ResourceView';
import BuildingView from './BuildingView/BuildingView';

interface ZoneViewProps {
  zone: Zone;
}

function ZoneView({ zone }: ZoneViewProps) {
  return (
    <div css={styles.container}>
      <div>{zone.name}</div>
      <ResourceView zone={zone} />
      <BuildingView zone={zone} />
      <div css={styles.innerContainer}>
        Farms: {zone.buildings[BuildingNames.Farm].quantity}{' '}
        <button
          type="button"
          disabled={!zone.buildings[BuildingNames.Farm].affordable}
          onClick={() => zone.buildings[BuildingNames.Farm].buy(1)}
        >
          Buy
        </button>
        <div>
          {zone.buildings[BuildingNames.Farm].currentCost.map(
            ({ resource, quantity }) => {
              return (
                <div key={resource}>
                  {resource}: {formatNumber(quantity)}
                </div>
              );
            },
          )}
        </div>
      </div>
    </div>
  );
}

export default observer(ZoneView);
