import { observer } from 'mobx-react-lite';
import { useStore } from '../../../store/Provider';
import { formatNumber } from '../../../utils/formatNumber';
import { StyledModal } from '../../shared/StyledModal/StyledModal';
import { styles } from './TechModal.styles';

const TechModal = () => {
  const root = useStore();

  return (
    <StyledModal
      isOpen={root.gui.techModal}
      onRequestClose={() => root.gui.closeTechModal()}
    >
      <div css={styles.modalHeader}>
        <h2>databanks</h2>
        <div>the ship wants power. it says it can help.</div>
      </div>
      <div css={styles.techsContainer}>
        {root.game.tech.noTechAvailable && (
          <em>no compute targets available</em>
        )}
        {!root.game.tech.noTechAvailable && <div css={styles.paddingTile} />}
        {root.game.tech.availableAsArray.map((tech) => {
          const onClick = () => {
            root.game.tech.selectTech(tech);
            root.gui.closeTechModal();
          };
          return (
            <div key={tech.name} css={styles.techTile} onClick={onClick}>
              <div css={styles.techTitle}>{tech.displayName}</div>
              <div css={styles.techDescription}>{tech.description}</div>
              <div css={styles.techCost}>
                {tech.power != 0 && (
                  <span>{formatNumber(tech.power, { digits: 0 })} / </span>
                )}
                <span>{tech.powerCost} power</span>
              </div>
            </div>
          );
        })}
        {root.game.tech.selectedTech && (
          <div
            key={'none'}
            css={styles.techTile}
            onClick={() => {
              root.game.tech.selectTech(undefined);
              root.gui.closeTechModal();
            }}
          >
            <div css={styles.techDescription}>{'pause research'}</div>
          </div>
        )}
        {!root.game.tech.noTechAvailable && <div css={styles.paddingTile} />}
      </div>
    </StyledModal>
  );
};

export default observer(TechModal);
