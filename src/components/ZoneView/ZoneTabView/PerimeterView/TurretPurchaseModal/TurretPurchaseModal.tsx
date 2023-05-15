import { observer } from 'mobx-react-lite';
import { styles } from './TurretPurchaseModal.styles';
import { StyledModal } from '../../../../shared/StyledModal/StyledModal';
import { Zone } from '../../../../../store/zone/zone';
import { formatNumber } from '../../../../../utils/formatNumber';

const TurretPurchaseModal = ({ zone }: { zone: Zone }) => {
  const purchaseList = zone.perimeter.turretList.purchaseable;
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
          <em css={styles.emptyLabel}>
            no turrets unlocked; consult the databanks
          </em>
        )}
        {!!purchaseList.length && <div css={styles.paddingTile} />}
        {purchaseList.map((turretListing) => {
          const onClick = () => {
            zone.perimeter.constructTurret(
              turretIndex,
              turretListing.turretFactory,
            );
            zone.perimeter.closeTurretPurchaseModal();
          };
          const turret = turretListing.instance;

          const affordable = turret.affordable;

          return (
            <div
              key={turret.name}
              css={(theme) => [styles.turretTile(theme, affordable)]}
              onClick={onClick}
            >
              <div css={styles.turretTitle}>{turret.displayName}</div>
              <div css={styles.turretDescription}>{turret.description}</div>
              <div css={styles.turretCost}>
                {turret.purchaseCostDisplay.map(
                  ({
                    resourceDisplayName,
                    isSatisfied,
                    availableQuantity,
                    storageConstrained,
                    quantity,
                  }) => {
                    return (
                      <div key={resourceDisplayName}>
                        {resourceDisplayName}:{' '}
                        {isSatisfied
                          ? ''
                          : `${formatNumber(availableQuantity)} / `}
                        {formatNumber(quantity)}
                        {storageConstrained ? 'ᶜ' : ''}
                      </div>
                    );
                  },
                )}
              </div>
            </div>
          );
        })}
        {!!purchaseList.length && <div css={styles.paddingTile} />}
      </div>
    </StyledModal>
  );
};

export default observer(TurretPurchaseModal);
