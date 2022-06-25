import { observer } from 'mobx-react-lite';
import { useStore } from '../store/Provider';
import CityView from './CityView/CityView';
import { useStoreTick } from './useStoreTick';

function App() {
  const root = useStore();

  useStoreTick();

  return (
    <div>
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
  );
}

export default observer(App);
