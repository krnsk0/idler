import { observer } from 'mobx-react-lite';
import { BaseBuilding } from '../../../../../store/zone/buildings/baseBuilding';
import { formatNumber } from '../../../../../utils/formatNumber';
import {
  DesktopTooltipTitle,
  TooltipDivider,
  TooltipText,
} from '../../../../shared/Tooltip/Tooltip';

interface BuildingTooltipProps {
  building: BaseBuilding;
}

const BuildingTooltip = ({ building }: BuildingTooltipProps) => {
  return (
    <>
      <DesktopTooltipTitle showDivider={true}>
        {building.displayName}
      </DesktopTooltipTitle>
      <TooltipText italic={true} align={'center'}>
        {building.description}
      </TooltipText>
      <TooltipDivider text={'cost'} />
      <TooltipText>
        {building.currentCostDisplay.map(
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
                {storageConstrained ? '*' : ''}
              </div>
            );
          },
        )}
      </TooltipText>
      <TooltipDivider text={'effects'} />
      <TooltipText>
        {building.displayEffects.map(
          ({ resourceDisplayName, quantityPerSecond }) => {
            return (
              <div key={resourceDisplayName}>
                {resourceDisplayName}:{' '}
                {formatNumber(quantityPerSecond, { showSign: true })}/sec
              </div>
            );
          },
        )}
        {building.displayStorage.map(({ resourceDisplayName, quantity }) => {
          return (
            <div key={resourceDisplayName}>
              {formatNumber(quantity, { showSign: true })} {resourceDisplayName}{' '}
              capacity
            </div>
          );
        })}
      </TooltipText>
    </>
  );
};

export default observer(BuildingTooltip);
