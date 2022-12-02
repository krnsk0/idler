import { getSnapshot } from 'mobx-keystone';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../store/Provider';
import { styles } from './DebugView.styles';

interface DebugProps {}

const DebugView = () => {
  const root = useStore();
  const debug = root.debug;
  const urlParams = new URLSearchParams(window.location.search);
  const debugParam = urlParams.get('debug') === 'true';

  if (!debugParam) return null;

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
            root.game.systemRegistry.executeTick(1);
          }}
        >
          1sec tick
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

        <button type="button" onClick={() => debug.toggleHyperMode()}>
          {debug.hyperMode ? 'disable hyper' : 'enable hyper'}
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
            debug.phaseOne();
          }}
        >
          phase 1
        </button>
        <button
          type="button"
          onClick={() => {
            debug.phaseTwo();
          }}
        >
          phase 2
        </button>
        <button
          type="button"
          onClick={() => {
            debug.bugRepro();
          }}
        >
          bug repo
        </button>
      </div>
    </div>
  );
};

export default observer(DebugView);
