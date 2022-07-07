import { getSnapshot } from 'mobx-keystone';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../store/Provider';
import { Zone } from '../../store/zone/zone';
import { styles } from './DebugView.styles';

interface DebugProps {
  setActiveZone: React.Dispatch<React.SetStateAction<Zone>>;
}

const DebugView = ({ setActiveZone }: DebugProps) => {
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
          root.addZone();
        }}
      >
        add zone
      </button>
      {root.zones.map((zone, index) => {
        return (
          <button
            key={zone.id}
            type="button"
            onClick={() => setActiveZone(zone)}
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
