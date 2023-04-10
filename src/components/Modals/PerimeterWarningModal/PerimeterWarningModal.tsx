import { observer } from 'mobx-react-lite';
import { useStore } from '../../../store/Provider';
import { StyledModal } from '../../shared/StyledModal/StyledModal';
import { styles } from './PerimeterWarningModal.styles';

const PerimeterWarningModal = () => {
  const root = useStore();
  const perimeter = root.game.zones[0]!.perimeter;

  return (
    <StyledModal
      isOpen={perimeter.isWarningModalOpen}
      onRequestClose={() => perimeter.closeWarningModal()}
      extraStyles={{
        alignItems: 'center',
      }}
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
    </StyledModal>
  );
};

export default observer(PerimeterWarningModal);
