import { observer } from 'mobx-react-lite';
import { formatNumber } from '../../helpers/formatNumber';
import { Zone } from '../../store/zone/zone';
import { ResourceNames } from '../../store/zone/resources/resourceNames';
import { ProducerNames } from '../../store/zone/buildings/producers/producerNames';
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
        Farms: {zone.buildings[ProducerNames.Farm].quantity}{' '}
        <button
          type="button"
          disabled={!zone.buildings[ProducerNames.Farm].affordable}
          onClick={() => zone.buildings[ProducerNames.Farm].buy(1)}
        >
          Buy
        </button>
        <div>
          {zone.buildings[ProducerNames.Farm].currentCost.map(
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
