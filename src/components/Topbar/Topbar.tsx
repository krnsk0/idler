import { observer } from 'mobx-react-lite';
import { useStore } from '../../store/Provider';
import { styles } from './Topbar.styles';

const Topbar = () => {
  const root = useStore();
  return (
    <div css={styles.topbarContainer}>
      <button
        css={styles.button}
        onClick={() => {
          root.gui.openOptionsModal();
        }}
      >
        options
      </button>
    </div>
  );
};

export default observer(Topbar);
