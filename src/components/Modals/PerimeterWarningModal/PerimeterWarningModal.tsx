import { observer } from 'mobx-react-lite';
import Modal from 'react-modal';
import { useStore } from '../../../store/Provider';
import { styles } from './PerimeterWarningModal.styles';

const customStyles = {
  content: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
    flexWrap: 'wrap' as const,
  },
};

const PerimeterWarningModal = () => {
  const root = useStore();
  const perimeter = root.game.zones[0]!.perimeter;

  return (
    <Modal
      isOpen={perimeter.isWarningModalOpen}
      onRequestClose={() => perimeter.closeWarningModal()}
      style={customStyles}
    >
      <h2>ship detects approaching lifeforms</h2>
      <div css={styles.container}>
        <div css={styles.text}>
          ship suggests defensive countermeasures. perimeter defense
          technologies unlocked.
        </div>
        <button
          css={styles.button}
          onClick={() => perimeter.closeWarningModal()}
        >
          acknowledge
        </button>
      </div>
    </Modal>
  );
};

export default observer(PerimeterWarningModal);
