import { observer } from 'mobx-react-lite';
import { styles } from './TurretBox.styles';
import { Zone } from '../../../../../store/zone/zone';
import { formatNumber } from '../../../../../utils/formatNumber';
import { Fragment, useRef } from 'react';
import {
  DesktopTooltipTitle,
  TooltipDivider,
  TooltipPortalRenderer,
  TooltipText,
} from '../../../../shared/Tooltip/Tooltip';

const ConstructEmplacementTooltip = observer(({ zone }: { zone: Zone }) => {
  return (
    <>
      <DesktopTooltipTitle showDivider={true}>
        new emplacement
      </DesktopTooltipTitle>
      <TooltipText italic={true} align={'center'}>
        fortify a new defensive emplacement, allowing the installation of a
        turret
      </TooltipText>

      <TooltipDivider text="cost" />

      <TooltipText>
        {zone.perimeter.emplacementCostDisplay.map(
          ({
            resourceDisplayName,
            quantity,
            isSatisfied,
            availableQuantity,
            storageConstrained,
          }) => {
            return (
              <Fragment key={resourceDisplayName}>
                <div>
                  {resourceDisplayName}:{' '}
                  {isSatisfied ? '' : `${formatNumber(availableQuantity)} / `}
                  {formatNumber(quantity, { digits: 0 })}
                  {storageConstrained ? 'ᶜ' : ''}
                </div>
              </Fragment>
            );
          },
        )}
      </TooltipText>
    </>
  );
});

function ConstructEmplacement({ zone }: { zone: Zone }) {
  const costs = zone.perimeter.emplacementCostDisplay;
  const affordable = zone.perimeter.emplacementAffordable;
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <TooltipPortalRenderer containerRef={containerRef}>
        {<ConstructEmplacementTooltip zone={zone} />}
      </TooltipPortalRenderer>
      <div
        css={(theme) => [
          styles.turretBox,
          styles.constructEmplacementBox(theme, affordable),
        ]}
        onClick={() => {
          zone.perimeter.purchaseEmplacement();
        }}
        ref={containerRef}
      >
        <div css={styles.plusSign}>+</div>
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
    </>
  );
}

export default observer(ConstructEmplacement);
