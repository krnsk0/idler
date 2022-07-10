import { getSnapshot } from 'mobx-keystone';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../store/Provider';
import { Zone } from '../../store/zone/zone';
import { styles } from './DebugView.styles';

interface DebugProps {}

const DebugView = () => {
  const root = useStore();

  return (
    <div css={styles.debug}>
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
          root.game.addZone();
        }}
      >
        add zone
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
      <button type="button" onClick={() => root.debug.toggleHyperMode()}>
        {root.debug.hyperMode ? 'disable hyper' : 'enable hyper'}
      </button>
    </div>
  );
};

export default observer(DebugView);
