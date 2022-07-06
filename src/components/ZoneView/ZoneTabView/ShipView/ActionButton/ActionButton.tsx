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
                <span>{action.basePowerConsumption} power</span>
              )}
              {action.duration} second{action.duration > 1 ? 's' : ''}
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
              <span>{action.basePowerProduction} power</span>
            )}
          </TooltipText>
        </>
      }
      onClick={() => action.start()}
      progress={action.progress}
      disabled={!action.affordable}
      disableAnimation={action.name === ActionNames.HARVEST}
    >
      <span>{action.displayName}</span>{' '}
    </ZoneEntityButton>
  );
}

export default observer(ActionButton);
