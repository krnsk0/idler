import { observer } from 'mobx-react-lite';
import { BaseUpgrade } from '../../../../../store/zone/upgrades/baseUpgrade';
import { formatNumber } from '../../../../../utils/formatNumber';
import {
  DesktopTooltipTitle,
  TooltipDivider,
  TooltipText,
} from '../../../../shared/Tooltip/Tooltip';

interface BaseUpgradeProps {
  upgrade: BaseUpgrade;
}

const UpgradeTooltip = ({ upgrade }: BaseUpgradeProps) => {
  return (
    <>
      <DesktopTooltipTitle showDivider={true}>
        {upgrade.displayName}
      </DesktopTooltipTitle>
      <TooltipText italic={true} align={'center'}>
        {upgrade.description}
      </TooltipText>
      {!upgrade.purchased && (
        <>
          <TooltipDivider text={'cost'} />
          <TooltipText>
            {upgrade.currentCostDisplay.map(
              ({
                resourceDisplayName,
                quantity,
                isSatisfied,
                availableQuantity,
                storageConstrained,
              }) => {
                return (
                  <div key={resourceDisplayName}>
                    {resourceDisplayName}:{' '}
                    {isSatisfied ? '' : `${formatNumber(availableQuantity)} / `}
                    {formatNumber(quantity)}
                    {storageConstrained ? 'ᶜ' : ''}
                  </div>
                );
              },
            )}
          </TooltipText>
        </>
      )}
      <TooltipDivider text={'effects'} />
      <TooltipText>
        {upgrade.tooltipDescriptors.map((descriptor) => {
          return <div key={descriptor}>{descriptor}</div>;
        })}

        {upgrade.isStorageConstrainted && (
          <>
            <TooltipDivider />
            <div>ᶜ cost is storage-constrained; will never be affordable</div>
            <p></p>
          </>
        )}
      </TooltipText>
    </>
  );
};

export default observer(UpgradeTooltip);
