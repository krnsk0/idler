import { observer } from 'mobx-react-lite';
import { useStore } from '../store/Provider';
import { styles } from './App.styles';
import ZoneView from './ZoneView/ZoneView';
import { useStoreTick } from './useStoreTick';

function App() {
  const root = useStore();

  useStoreTick();

  return (
    <div css={styles.centerOuter}>
      <div css={styles.centerInner}>
        {root.zones.map((zone) => (
          <ZoneView key={zone.id} zone={zone} />
        ))}
        <button
          type="button"
          onClick={() => {
            root.addZone();
          }}
        >
          add zone
        </button>
      </div>
    </div>
  );
}

export default observer(App);
