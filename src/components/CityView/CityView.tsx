import { observer } from 'mobx-react-lite';
import { City } from '../../store/city';
import { styles } from './CityView.styles';

interface CityViewProps {
  city: City;
}

function CityView({ city }: CityViewProps) {
  return <div css={styles.container}>{city.name}</div>;
}

export default observer(CityView);
