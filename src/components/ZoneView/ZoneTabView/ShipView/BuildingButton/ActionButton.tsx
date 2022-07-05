import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { formatNumber } from '../../../../../helpers/formatNumber';
import { BaseAction } from '../../../../../store/zone/actions/baseAction';
import Tooltip, {
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
          <TooltipText italic={true} center={true} light={true}>
            {action.description}
          </TooltipText>
          <TooltipDivider text={'cost'} />
        </>
      }
      onClick={() => action.start()}
    >
      <span>{action.displayName}</span>{' '}
    </ZoneEntityButton>
  );
}

export default observer(ActionButton);
