import { SerializedStyles } from '@emotion/react';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { colors } from '../../../globalStyles';
import Tooltip from '../Tooltip/Tooltip';
import { styles } from './ZoneEntityButton.styles';

interface ZoneEntityButtonProps {
  styleOverride?: SerializedStyles;
  tooltip?: React.ReactNode | EmotionJSX.Element;
  disabled?: boolean;
  children: React.ReactNode | EmotionJSX.Element;
  onClick: () => void;
  progress?: number;
  disableAnimation?: boolean;
  tooltipTop?: number;
  tooltipLeft?: number;
}

const ZoneEntityButton = ({
  styleOverride,
  tooltip,
  children,
  disabled,
  onClick,
  progress,
  disableAnimation,
  tooltipTop,
  tooltipLeft,
}: ZoneEntityButtonProps) => {
  const [hovered, setHovered] = useState(false);
  const progressWidth = progress ? progress * 100 + '%' : '0%';

  return (
    <>
      {tooltip && hovered && (
        <Tooltip top={tooltipTop} left={tooltipLeft} width={200}>
          {tooltip}
        </Tooltip>
      )}
      <div
        css={[
          styles.buttonContainer,
          styleOverride,
          !disableAnimation && styles.newButton,
        ]}
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
