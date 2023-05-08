import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { useStore } from '../../../store/Provider';
import { StyledModal } from '../../shared/StyledModal/StyledModal';
import { Changelog } from './Changelog';
import { styles } from './OptionsModal.styles';
import { ColorThemes } from '../../../store/persistedGui';

const OptionsModal = () => {
  const root = useStore();
  const [resetConfirm, setResetConfirm] = useState(false);
  const [exported, setExported] = useState(false);
  const [importFailed, setImportFailed] = useState(false);
  const [showChangelog, setShowChangelog] = useState(false);

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

  const content = (
    <>
      <h2>options</h2>
      <div css={styles.optionsContainer}>
        <button css={styles.button} onClick={() => setShowChangelog(true)}>
          {'changelog'}
        </button>
        <button
          css={styles.button}
          onClick={() =>
            root.game.persistedGui.setColorTheme(
              root.game.persistedGui.colorTheme === ColorThemes.LIGHT
                ? ColorThemes.DARK
                : ColorThemes.LIGHT,
            )
          }
        >
          {root.game.persistedGui.colorTheme === ColorThemes.LIGHT
            ? 'dark mode'
            : 'light mode'}
        </button>
        <button css={styles.button} onClick={exportHandler}>
          {exported ? 'copied!' : 'clipboard export'}
        </button>
        <button css={styles.button} onClick={importHandler}>
          {importFailed ? 'import failed' : 'clipboard import'}
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
      <div css={styles.bottomContainer}>
        <button
          css={styles.button}
          onClick={() => root.gui.closeOptionsModal()}
        >
          {'close'}
        </button>
        <div css={styles.version}>v{APP_VERSION}</div>
      </div>
    </>
  );

  return (
    <StyledModal
      isOpen={root.gui.optionsModal}
      onRequestClose={() => root.gui.closeOptionsModal()}
      extraStyles={{ alignItems: 'center' as const }}
    >
      {!showChangelog ? (
        content
      ) : (
        <Changelog closeChangelog={() => setShowChangelog(false)} />
      )}
    </StyledModal>
  );
};

export default observer(OptionsModal);
