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
      <div css={styles.container}>
        coal: {city.resources[ResourceNames.Coal].displayQuantity()}
      </div>
      <div css={styles.container}>
        mines: {city.mines.quantity}{' '}
        <button type="button" onClick={() => city.mines.buy(1)}>
          buy
        </button>
      </div>
    </div>
  );
}

export default observer(CityView);
