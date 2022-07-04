import { useState } from 'react';
import Tooltip from '../Tooltip/Tooltip';
import { styles } from './ZoneEntityButton.styles';

interface ZoneEntityButtonProps {
  tooltip: React.ReactNode;
  disabled?: boolean;
  children: React.ReactNode;
  onClick: () => void;
}

const ZoneEntityButton = ({
  tooltip,
  children,
  disabled,
  onClick,
}: ZoneEntityButtonProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      {hovered && (
        <Tooltip top={12} left={190} width={200}>
          {tooltip}
        </Tooltip>
      )}
      <button
        css={styles.buttonContainer}
        type="button"
        disabled={disabled}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
};

export default ZoneEntityButton;
