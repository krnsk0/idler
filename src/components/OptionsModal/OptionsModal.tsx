import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import Modal from 'react-modal';
import { useStore } from '../../store/Provider';
import { styles } from './OptionsModal.styles';

const customStyles = {
  content: {
    top: '45%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: '1px solid black',
    borderRadius: 0,
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center' as const,
    flexWrap: 'wrap' as const,
  },
};

const OptionsModal = () => {
  const root = useStore();
  const [resetConfirm, setResetConfirm] = useState(false);

  return (
    <Modal
      isOpen={root.gui.optionsModal}
      onRequestClose={() => root.gui.closeOptionsModal()}
      style={customStyles}
    >
      <h2>options</h2>
      <div css={styles.optionsContainer}>
        <button
          css={styles.button}
          onClick={() => setResetConfirm(!resetConfirm)}
        >
          {resetConfirm ? 'are you sure?' : 'reset game'}
        </button>
        {resetConfirm && (
          <button
            css={styles.button}
            onClick={() => {
              root.reset();
              setResetConfirm(false);
              root.gui.closeOptionsModal();
            }}
          >
            confirm reset
          </button>
        )}
      </div>
    </Modal>
  );
};

export default observer(OptionsModal);
