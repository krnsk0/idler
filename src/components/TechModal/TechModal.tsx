import { observer } from 'mobx-react-lite';
import Modal from 'react-modal';
import { useStore } from '../../store/Provider';
import { styles } from './TechModal.styles';

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

const TechModal = () => {
  const root = useStore();
  return (
    <Modal
      isOpen={root.gui.techModal}
      onRequestClose={() => root.gui.closeTechModal()}
      style={customStyles}
    >
      <h2>databanks</h2>
      <div css={styles.modalDescripiton}>
        the ship wants power. it says it can help.
      </div>
      <div css={styles.techsContainer}>
        {root.tech.availableAsArray.length === 0 && (
          <em>no compute targets available</em>
        )}
        {root.tech.availableAsArray.map((tech) => {
          const onClick = () => {
            root.tech.selectTech(tech);
            root.gui.closeTechModal();
          };

          return (
            <div key={tech.name} css={styles.techTile} onClick={onClick}>
              <div css={styles.techTitle}>{tech.displayName}</div>
              <div css={styles.techDescription}>{tech.description}</div>
              <div css={styles.techCost}>{tech.powerCost} power</div>
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

export default observer(TechModal);
