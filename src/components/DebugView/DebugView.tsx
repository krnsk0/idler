import { getSnapshot } from 'mobx-keystone';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../store/Provider';
import { Zone } from '../../store/zone/zone';
import { styles } from './DebugView.styles';

interface DebugProps {}

const DebugView = () => {
  const root = useStore();
  const urlParams = new URLSearchParams(window.location.search);
  const debug = urlParams.get('debug') === 'true';

  if (!debug) return null;

  return (
    <div css={styles.debug}>
      <div css={styles.debugRow}>
        <button
          type="button"
          onClick={() => {
            console.log('ROOT:', JSON.stringify(getSnapshot(root), null, 2));
          }}
        >
          print snapshot
        </button>
        <button
          type="button"
          onClick={() => {
            root.reset();
            localStorage.removeItem('save');
            console.log('reset complete');
          }}
        >
          reset
        </button>

        <button type="button" onClick={() => root.debug.toggleHyperMode()}>
          {root.debug.hyperMode ? 'disable hyper' : 'enable hyper'}
        </button>
      </div>
      <div css={styles.debugRow}>
        <button
          type="button"
          onClick={() => {
            root.game.addZone();
          }}
        >
          add zone
        </button>
        {root.game.zones.map((zone) => {
          return (
            <button
              key={zone.id}
              type="button"
              onClick={() => root.game.selectZone(zone)}
            >
              {zone.name}
            </button>
          );
        })}
      </div>
      <div css={styles.debugRow}>
        <button
          type="button"
          onClick={() => {
            // TODO
          }}
        >
          phase 1
        </button>
      </div>
    </div>
  );
};

export default observer(DebugView);
