import { observer } from 'mobx-react-lite';
import { useStore } from '../../store/Provider';
import { styles } from './TechModal.styles';

const TechModal = () => {
  const { techModal, setTechModal } = useStore();

  if (!techModal) return null;
  return (
    <div css={styles.overlay} onClick={() => setTechModal(false)}>
      <div css={styles.modalOuter}>tech modal</div>
    </div>
  );
};

export default observer(TechModal);
