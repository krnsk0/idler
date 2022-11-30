import { observer } from 'mobx-react-lite';
import { formatNumber } from '../../../../../utils/formatNumber';
import { BaseAction } from '../../../../../store/zone/actions/baseAction';
import {
  TooltipText,
  TooltipDivider,
} from '../../../../shared/Tooltip/Tooltip';
import ZoneEntityButton from '../../../../shared/ZoneEntityButton/ZoneEntityButton';
import { styles } from './ActionButton.styles';

interface ActionButtonProps {
  action: BaseAction;
}

function ActionButton({ action }: ActionButtonProps) {
  if (!action.unlocked) return null;
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
      entranceAnimationDuration={action.entranceAnimationDuration}
    >
      <span>{action.displayName}</span>{' '}
      {action.showLowPowerMessage && <div css={styles.noPower}>no power</div>}
    </ZoneEntityButton>
  );
}

export default observer(ActionButton);
