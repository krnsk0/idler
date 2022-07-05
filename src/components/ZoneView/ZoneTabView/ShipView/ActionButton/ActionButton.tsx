import { observer } from 'mobx-react-lite';
import { formatNumber } from '../../../../../helpers/formatNumber';
import { BaseAction } from '../../../../../store/zone/actions/baseAction';
import {
  TooltipText,
  TooltipDivider,
} from '../../../../Debug/shared/Tooltip/Tooltip';
import ZoneEntityButton from '../../../../Debug/shared/ZoneEntityButton/ZoneEntityButton';

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
            <div>{action.duration} seconds</div>
          </TooltipText>
          <TooltipDivider text="output" />
          <TooltipText>
            {' '}
            {action.outputsDisplay.map(({ resourceDisplayName, quantity }) => {
              return (
                <div key={resourceDisplayName}>
                  {resourceDisplayName}: {formatNumber(quantity)}
                </div>
              );
            })}
          </TooltipText>
        </>
      }
      onClick={() => action.start()}
      progress={action.progress}
      disabled={!action.affordable}
    >
      <span>{action.displayName}</span>{' '}
    </ZoneEntityButton>
  );
}

export default observer(ActionButton);
