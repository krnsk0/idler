import { observer } from 'mobx-react-lite';
import { formatNumber } from '../../helpers/formatNumber';
import { City } from '../../store/city/city';
import { ResourceNames } from '../../store/city/resources/resourceNames';
import { styles } from './CityView.styles';

interface CityViewProps {
  city: City;
}

function CityView({ city }: CityViewProps) {
  return (
    <div css={styles.container}>
      <div>{city.name}</div>
      <div css={styles.resourceContainer}>
        <span>Nutrients:</span>
        <span>
          {formatNumber(city.resources[ResourceNames.Nutrients].quantity)}
        </span>
        <span>
          {formatNumber(city.resources[ResourceNames.Nutrients].estimatedRate, {
            showSign: true,
          })}
        </span>
      </div>
      <div css={styles.innerContainer}>
        Farms: {city.farms.quantity}{' '}
        <button
          type="button"
          disabled={!city.farms.affordable}
          onClick={() => city.farms.buy(1)}
        >
          Buy
        </button>
        <div>
          {city.farms.currentCost.map(({ resource, quantity }) => {
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

export default observer(CityView);
