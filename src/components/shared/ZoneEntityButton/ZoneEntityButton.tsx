import { SerializedStyles } from '@emotion/react';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { observer } from 'mobx-react-lite';
import { useRef } from 'react';
import { colors } from '../../../globalStyles';
import Tooltip from '../Tooltip/Tooltip';
import { styles } from './ZoneEntityButton.styles';

interface ZoneEntityButtonProps {
  styleOverride?: SerializedStyles;
  tooltip?: React.ReactNode | EmotionJSX.Element;
  disabled?: boolean;
  onClick?: () => void;
  progress?: number;
  active?: boolean;
  reverseProgressBar?: boolean;
  showEntranceAnimation: boolean;
  entranceAnimationDuration: number;
  tooltipPosition: 'RIGHT' | 'LEFT';
  buttonText: string;
}

const ZoneEntityButton = ({
  styleOverride,
  tooltip,
  disabled,
  onClick,
  active,
  progress,
  reverseProgressBar,
  showEntranceAnimation,
  entranceAnimationDuration,
  tooltipPosition,
  buttonText,
}: ZoneEntityButtonProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const possiblyInvertedProgress =
    reverseProgressBar && progress !== undefined && active
      ? 1 - progress
      : progress;
  const progressWidth = possiblyInvertedProgress
    ? possiblyInvertedProgress * 100 + '%'
    : '0%';

  return (
    <>
      {tooltip && (
        <Tooltip
          containerRef={containerRef}
          position={tooltipPosition}
          width={200}
        >
          {tooltip}
        </Tooltip>
      )}

      <div
        css={[
          styles.buttonContainer,
          showEntranceAnimation &&
            styles.animateEntrance(entranceAnimationDuration),
          styleOverride,
        ]}
        style={{ borderColor: !disabled ? colors.black : colors.grey }}
        ref={containerRef}
      >
        <div css={styles.progressBar} style={{ width: progressWidth }} />
        <button
          css={styles.button}
          style={{
            cursor: disabled ? 'inherit' : 'pointer',
          }}
          type="button"
          disabled={disabled}
          onClick={onClick ? onClick : () => {}}
        >
          <span>{buttonText}</span>
        </button>
      </div>
    </>
  );
};

export default observer(ZoneEntityButton);
