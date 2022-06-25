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
      <div css={styles.innerContainer}>
        food: {city.resources[ResourceNames.Food].displayQuantity()}
      </div>
      <div css={styles.innerContainer}>
        farms: {city.farms.quantity}{' '}
        <button type="button" onClick={() => city.farms.buy(1)}>
          buy
        </button>
      </div>
    </div>
  );
}

export default observer(CityView);
