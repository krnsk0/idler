import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { colors } from '../../../../colors';
import Tooltip from '../Tooltip/Tooltip';
import { styles } from './ZoneEntityButton.styles';

interface ZoneEntityButtonProps {
  tooltip: React.ReactNode;
  disabled?: boolean;
  children: React.ReactNode;
  onClick: () => void;
  progress?: number;
}

const ZoneEntityButton = ({
  tooltip,
  children,
  disabled,
  onClick,
  progress,
}: ZoneEntityButtonProps) => {
  const [hovered, setHovered] = useState(false);
  const progressWidth = progress ? progress * 100 + '%' : '0%';

  return (
    <>
      {hovered && (
        <Tooltip top={12} left={190} width={200}>
          {tooltip}
        </Tooltip>
      )}
      <div
        css={styles.buttonContainer}
        style={{ borderColor: !disabled ? colors.black : colors.grey }}
      >
        <div css={styles.progressBar} style={{ width: progressWidth }} />
        <button
          css={styles.button}
          type="button"
          disabled={disabled}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          onClick={onClick}
        >
          <>{children}</>
        </button>
      </div>
    </>
  );
};

export default observer(ZoneEntityButton);
