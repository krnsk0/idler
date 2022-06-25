import { observer } from 'mobx-react-lite';
import { useStore } from '../store/Provider';

function App() {
  const store = useStore();

  return (
    <div>
      {store.cities.map((city) => city.name)}{' '}
      <button
        type="button"
        onClick={() => {
          store.addCity();
        }}
      >
        add city
      </button>
    </div>
  );
}

export default observer(App);
