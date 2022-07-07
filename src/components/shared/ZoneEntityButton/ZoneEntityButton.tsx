import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { colors } from '../../../globalStyles';
import Tooltip from '../Tooltip/Tooltip';
import { styles } from './ZoneEntityButton.styles';

interface ZoneEntityButtonProps {
  tooltip: React.ReactNode;
  disabled?: boolean;
  children: React.ReactNode;
  onClick: () => void;
  progress?: number;
  disableAnimation?: boolean;
}

const ZoneEntityButton = ({
  tooltip,
  children,
  disabled,
  onClick,
  progress,
  disableAnimation,
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
        css={[styles.buttonContainer, !disableAnimation && styles.newButton]}
        style={{ borderColor: !disabled ? colors.black : colors.grey }}
      >
        <div css={styles.progressBar} style={{ width: progressWidth }} />
        <button
          css={styles.button}
          style={{
            cursor: disabled ? 'inherit' : 'pointer',
          }}
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
