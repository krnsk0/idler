import { observer } from 'mobx-react-lite';
import { formatNumber } from '../../../../../utils/formatNumber';
import { BaseAction } from '../../../../../store/zone/actions/baseAction';
import {
  TooltipText,
  TooltipDivider,
} from '../../../../shared/Tooltip/Tooltip';
import ZoneEntityButton from '../../../../shared/ZoneEntityButton/ZoneEntityButton';

interface ActionButtonProps {
  action: BaseAction;
  tooltipPosition: 'LEFT' | 'RIGHT';
}

function ActionButton({ action, tooltipPosition }: ActionButtonProps) {
  if (!action.unlocked) return null;
  return (
    <ZoneEntityButton
      tooltipPosition={tooltipPosition}
      tooltip={
        <>
          {action.showNoPowerMessage && (
            <>
              <TooltipText align={'center'}>
                *no power, progress stalled
              </TooltipText>
              <TooltipDivider />
            </>
          )}

          <TooltipText italic={true} align={'center'}>
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
      active={action.active}
      reverseProgressBar={action.reverseProgressBar}
      showEntranceAnimation={action.showEntranceAnimation}
      buttonText={`${action.displayName}${
        action.showNoPowerMessage ? `*` : ''
      }`}
      isButtonExpanded={action.isExpanded}
      expandButton={() => action.expandButton()}
    />
  );
}

export default observer(ActionButton);
