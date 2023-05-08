import { observer } from 'mobx-react-lite';
import { styles } from './TurretPurchaseModal.styles';
import { useStore } from '../../../../../store/Provider';
import { StyledModal } from '../../../../shared/StyledModal/StyledModal';
import { Zone } from '../../../../../store/zone/zone';

const TurretPurchaseModal = ({ zone }: { zone: Zone }) => {
  const root = useStore();

  const purchaseList = root.game.turrets.purchaseable;

  const turretIndex = zone.perimeter.turretPurchaseIndex;
  if (turretIndex === undefined) return null;

  return (
    <StyledModal
      isOpen={zone.perimeter.isTurretPurchaseModalOpen}
      onRequestClose={() => zone.perimeter.closeTurretPurchaseModal()}
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
        {purchaseList.map((turretListing) => {
          const onClick = () => {
            zone.perimeter.constructTurret(
              turretIndex,
              turretListing.turretFactory,
            );
            zone.perimeter.closeTurretPurchaseModal();
          };
          const turret = turretListing.instance;

          return (
            <div key={turret.name} css={styles.turretTile} onClick={onClick}>
              <div css={styles.turretTitle}>{turret.displayName}</div>
              <div css={styles.turretDescription}>{turret.description}</div>
              <div css={styles.turretCost}>
                <span>TODO</span>
              </div>
            </div>
          );
        })}
        {!purchaseList.length && <div css={styles.paddingTile} />}
      </div>
    </StyledModal>
  );
};

export default observer(TurretPurchaseModal);
