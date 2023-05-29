import { observer } from 'mobx-react-lite';
import { useStore } from '../../../store/Provider';
import { StyledModal } from '../../shared/StyledModal/StyledModal';
import { styles } from './GameOverModal.styles';

const GameOverModal = () => {
  const root = useStore();
  const initialZoneName = root.game.zones[0].name;

  const content = (
    <>
      <h2>{initialZoneName} destroyed</h2>
      <div css={styles.gameOverContainer}>
        <div>todo</div>
      </div>
      <div css={styles.bottomContainer}>
        <button css={styles.button} onClick={() => root.game.softReset()}>
          start again
        </button>
      </div>
    </>
  );

  return (
    <StyledModal
      isOpen={root.game.gameOverModalOpen}
      onRequestClose={() => {}}
      extraStyles={{ alignItems: 'center' as const }}
    >
      {content}
    </StyledModal>
  );
};

export default observer(GameOverModal);
