import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { formatNumber } from '../../../../../helpers/formatNumber';
import { BaseAction } from '../../../../../store/zone/actions/baseAction';
import Tooltip, {
  TooltipText,
  TooltipDivider,
} from '../../../../Debug/shared/Tooltip/Tooltip';
import { styles } from './ActionButton.styles';

interface ActionButtonProps {
  action: BaseAction;
}

function ActionButton({ action }: ActionButtonProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      {hovered && (
        <Tooltip top={12} left={190} width={200}>
          <TooltipText italic={true} center={true} light={true}>
            {action.description}
          </TooltipText>
          <TooltipDivider text={'cost'} />
        </Tooltip>
      )}
      <button
        key={action.actionName}
        css={styles.actionBox}
        type="button"
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <span>{action.displayName}</span>
      </button>
    </>
  );
}

export default observer(ActionButton);
