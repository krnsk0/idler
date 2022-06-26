import { observer } from 'mobx-react-lite';
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
          {city.resources[ResourceNames.Nutrients].quantity.toFixed(2)}
        </span>
        <span>
          {city.resources[ResourceNames.Nutrients].estimatedRateDisplay}
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
                {resource}: {quantity.toFixed(2)}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default observer(CityView);
