import { observer } from 'mobx-react-lite';
import { styles } from './TurretBox.styles';
import { Zone } from '../../../../../store/zone/zone';
import { formatNumber } from '../../../../../utils/formatNumber';
import { Fragment } from 'react';

function ConstructEmplacement({ zone }: { zone: Zone }) {
  const costs = zone.perimeter.emplacementCostDisplay;
  const affordable = zone.perimeter.emplacementAffordable;

  return (
    <div
      css={(theme) => [
        styles.turretBox,
        styles.constructEmplacementBox(theme, affordable),
      ]}
      onClick={() => {
        zone.perimeter.purchaseEmplacement();
      }}
    >
      <div css={styles.fortifyHeader}>new emplacement</div>
      <div css={styles.costDisplay}>
        {costs.map(
          ({
            resourceDisplayName,
            quantity,
            isSatisfied,
            availableQuantity,
            storageConstrained,
          }) => {
            return (
              <Fragment key={resourceDisplayName}>
                <div css={styles.costHeader}>{resourceDisplayName}</div>
                <div>
                  {isSatisfied ? '' : `${formatNumber(availableQuantity)} / `}
                  {formatNumber(quantity, { digits: 0 })}
                  {storageConstrained ? 'ᶜ' : ''}
                </div>
              </Fragment>
            );
          },
        )}
      </div>
    </div>
  );
}

export default observer(ConstructEmplacement);
