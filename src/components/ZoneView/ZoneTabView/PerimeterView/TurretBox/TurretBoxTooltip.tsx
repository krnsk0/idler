import { observer } from 'mobx-react-lite';
import { BaseTurret } from '../../../../../store/zone/perimeter/turrets/baseTurret';
import {
  DesktopTooltipTitle,
  TooltipDivider,
  TooltipText,
} from '../../../../shared/Tooltip/Tooltip';
import { formatNumber } from '../../../../../utils/formatNumber';
import { formatTime } from '../../../../../utils/formatTime';

interface TurretBoxTooltipProps {
  turret: BaseTurret;
}

export const TurretBoxTooltip = observer(
  ({ turret }: TurretBoxTooltipProps) => {
    return (
      <>
        <DesktopTooltipTitle showDivider={true}>
          {turret.displayName}
        </DesktopTooltipTitle>

        <TooltipText italic={true} align={'center'}>
          {turret.description}
        </TooltipText>

        <TooltipDivider text="capabilities" />
        <TooltipText>
          <div>damage: {formatNumber(turret.attackDamage)}</div>
          <div>cooldown: {formatTime(turret.baseAttackCooldown)}</div>
        </TooltipText>
        <TooltipDivider text="status" />
        <TooltipText>
          <div>
            ammo: {formatNumber(turret.ammo)} /{' '}
            {formatNumber(turret.ammoCapacity)}
          </div>
          <div>state: {turret.stateDescriptor}</div>
        </TooltipText>
        <TooltipDivider text="reload cost" />
        <TooltipText>
          {turret.reloadCostDisplay.map(
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
                  {isSatisfied ? '' : `${formatNumber(availableQuantity)} / `}
                  {formatNumber(quantity)}
                  {storageConstrained ? 'ᶜ' : ''}
                </div>
              );
            },
          )}
        </TooltipText>
      </>
    );
  },
);
