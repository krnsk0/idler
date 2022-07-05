import { observer } from 'mobx-react-lite';
import { useState } from 'react';
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

      <div css={styles.progressBarContainer}>
        <div css={styles.progressBar} style={{ width: progressWidth }} />
      </div>
      <button
        css={styles.buttonContainer}
        type="button"
        disabled={disabled}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onClick={onClick}
      >
        <>{children}</>
      </button>
    </>
  );
};

export default observer(ZoneEntityButton);
