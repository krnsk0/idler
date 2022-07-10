import { getSnapshot } from 'mobx-keystone';
import { observer } from 'mobx-react-lite';
import { formatNumber } from '../../../../../helpers/formatNumber';
import { ActionNames } from '../../../../../store/zone/actions/actionNames';
import { BaseAction } from '../../../../../store/zone/actions/baseAction';
import {
  TooltipText,
  TooltipDivider,
} from '../../../../shared/Tooltip/Tooltip';
import ZoneEntityButton from '../../../../shared/ZoneEntityButton/ZoneEntityButton';

interface ActionButtonProps {
  action: BaseAction;
}

function ActionButton({ action }: ActionButtonProps) {
  return (
    <ZoneEntityButton
      tooltipTop={12}
      tooltipLeft={190}
      tooltip={
        <>
          <TooltipText italic={true} align={'center'} light={true}>
            {action.description}
          </TooltipText>
          <TooltipDivider text="cost" />
          <TooltipText>
            {action.inputsDisplay.map(({ resourceDisplayName, quantity }) => {
              return (
                <div key={resourceDisplayName}>
                  {resourceDisplayName}: {formatNumber(quantity)}
                </div>
              );
            })}
            <div>
              {!!action.basePowerConsumption && (
                <div>{action.basePowerConsumption} power while active</div>
              )}
              <div>
                {action.duration} second{action.duration > 1 ? 's' : ''}
              </div>
            </div>
          </TooltipText>
          <TooltipDivider text="output" />
          <TooltipText>
            {action.outputsDisplay.map(({ resourceDisplayName, quantity }) => {
              return (
                <div key={resourceDisplayName}>
                  {resourceDisplayName}: {formatNumber(quantity)}
                </div>
              );
            })}
            {!!action.basePowerProduction && (
              <div>{action.basePowerProduction} power while active</div>
            )}
          </TooltipText>
        </>
      }
      onClick={() => action.start()}
      progress={action.progress}
      disabled={!action.enabled}
      disableAnimation={action.name === ActionNames.HARVEST}
    >
      <span>{action.displayName}</span>{' '}
    </ZoneEntityButton>
  );
}

export default observer(ActionButton);
