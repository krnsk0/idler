import { observer } from 'mobx-react-lite';
import { useStore } from '../store/Provider';
import { styles } from './App.styles';
import CityView from './CityView/CityView';
import { useStoreTick } from './useStoreTick';

function App() {
  const root = useStore();

  useStoreTick();

  return (
    <div css={styles.centerOuter}>
      <div css={styles.centerInner}>
        {root.cities.map((city) => (
          <CityView key={city.id} city={city} />
        ))}
        <button
          type="button"
          onClick={() => {
            root.addCity();
          }}
        >
          add city
        </button>
      </div>
    </div>
  );
}

export default observer(App);
