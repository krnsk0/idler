import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useStore } from '../../../store/Provider';
import { StyledModal } from '../../shared/StyledModal/StyledModal';
import { styles } from './OptionsModal.styles';

const OptionsModal = () => {
  const root = useStore();
  const [resetConfirm, setResetConfirm] = useState(false);
  const [exported, setExported] = useState(false);
  const [importFailed, setImportFailed] = useState(false);

  const exportHandler = () => {
    if (exported) return;
    root.saveToClipboard();
    setExported(true);
    setTimeout(() => {
      setExported(false);
    }, 2000);
  };

  const importHandler = async () => {
    if (importFailed) return;
    const success = await root.loadFromClipboard();
    if (success) {
      root.gui.closeOptionsModal();
    } else {
      setImportFailed(true);
      setTimeout(() => {
        setImportFailed(false);
      }, 2000);
    }
  };

  return (
    <StyledModal
      isOpen={root.gui.optionsModal}
      onRequestClose={() => root.gui.closeOptionsModal()}
      extraStyles={{ alignItems: 'center' as const }}
    >
      <h2>options</h2>
      <div css={styles.optionsContainer}>
        <button css={styles.button} onClick={exportHandler}>
          {exported ? 'copied to clipboard!' : 'export save to clipboard'}
        </button>

        <button css={styles.button} onClick={importHandler}>
          {importFailed ? 'import failed' : 'import save from clipboard'}
        </button>
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
      <div css={styles.version}>v{APP_VERSION}</div>
    </StyledModal>
  );
};

export default observer(OptionsModal);
