import { observer } from 'mobx-react-lite';
import { useStore } from '../../../store/Provider';
import { formatNumber } from '../../../utils/formatNumber';
import { StyledModal } from '../../shared/StyledModal/StyledModal';
import { styles } from './TurretPurchaseModal.styles';

const TechModal = () => {
  const root = useStore();

  const purchaseList = root.game.turrets.purchaseable;

  return (
    <StyledModal
      isOpen={root.gui.turretPurchaseModal}
      onRequestClose={() => root.gui.closeTurretPurchaseModal()}
    >
      <div css={styles.modalHeader}>
        <h2>install turret</h2>
        <div>
          supplied with ammunition, these emplacements will secure the colony's
          perimeter.
        </div>
      </div>
      <div css={styles.turretsContainer}>
        {purchaseList.length === 0 && (
          <em>no turrets unlocked; consult the databanks</em>
        )}
        {!purchaseList.length && <div css={styles.paddingTile} />}
        {/* {purchaseList.map((turret) => {
          const onClick = () => {
            // TODO
            root.gui.closeTurretPurchaseModal();
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
        })} */}
        {!purchaseList.length && <div css={styles.paddingTile} />}
      </div>
    </StyledModal>
  );
};

export default observer(TechModal);