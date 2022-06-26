import { observer } from 'mobx-react-lite';
import { formatNumber } from '../../helpers/formatNumber';
import { Zone } from '../../store/zone/zone';
import { ResourceNames } from '../../store/zone/resources/resourceNames';
import { styles } from './ZoneView.styles';

interface ZoneViewProps {
  zone: Zone;
}

function ZoneView({ zone }: ZoneViewProps) {
  return (
    <div css={styles.container}>
      <div>{zone.name}</div>
      <div css={styles.resourceContainer}>
        <span>Nutrients:</span>
        <span>
          {formatNumber(zone.resources[ResourceNames.Nutrients].quantity)}
        </span>
        <span>
          {formatNumber(zone.resources[ResourceNames.Nutrients].estimatedRate, {
            showSign: true,
          })}
        </span>
      </div>
      <div css={styles.innerContainer}>
        Farms: {zone.farms.quantity}{' '}
        <button
          type="button"
          disabled={!zone.farms.affordable}
          onClick={() => zone.farms.buy(1)}
        >
          Buy
        </button>
        <div>
          {zone.farms.currentCost.map(({ resource, quantity }) => {
            return (
              <div key={resource}>
                {resource}: {formatNumber(quantity)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default observer(ZoneView);
