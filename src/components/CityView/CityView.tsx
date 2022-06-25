import { observer } from 'mobx-react-lite';
import { City } from '../../store/city/city';
import { CoalName } from '../../store/city/resources/coal';
import { styles } from './CityView.styles';

interface CityViewProps {
  city: City;
}

function CityView({ city }: CityViewProps) {
  return (
    <div css={styles.container}>
      <div>{city.name}</div>
      <div css={styles.container}>coal: {city.resources[CoalName].qty}</div>
      <div css={styles.container}>
        mines: {city.mines.qty}{' '}
        <button type="button" onClick={() => city.mines.buy(1)}>
          buy
        </button>
      </div>
    </div>
  );
}

export default observer(CityView);
