import { SerializedStyles } from '@emotion/react';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { observer } from 'mobx-react-lite';
import { useRef, useState } from 'react';
import { colors } from '../../../globalStyles';
import Tooltip from '../Tooltip/Tooltip';
import { styles } from './ZoneEntityButton.styles';

interface ZoneEntityButtonProps {
  styleOverride?: SerializedStyles;
  tooltip?: React.ReactNode | EmotionJSX.Element;
  disabled?: boolean;
  children: React.ReactNode | EmotionJSX.Element;
  onClick?: () => void;
  progress?: number;
  tooltipTop?: number;
  tooltipLeft?: number;
  active?: boolean;
  reverseProgressBar?: boolean;
}

const ZoneEntityButton = ({
  styleOverride,
  tooltip,
  children,
  disabled,
  onClick,
  active,
  progress,
  tooltipTop = 14,
  tooltipLeft = 185,
  reverseProgressBar,
}: ZoneEntityButtonProps) => {
  const [tooltipPosition, setTooltipPosition] = useState<
    | {
        x: number;
        y: number;
      }
    | undefined
  >(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const possiblyInvertedProgress =
    reverseProgressBar && progress !== undefined && active
      ? 1 - progress
      : progress;
  const progressWidth = possiblyInvertedProgress
    ? possiblyInvertedProgress * 100 + '%'
    : '0%';

  const openTooltip = () => {
    if (containerRef.current) {
      const { x, y } = containerRef.current.getBoundingClientRect();
      setTooltipPosition({ x: x + tooltipLeft, y: y + tooltipTop });
    }
  };

  const closeTooltip = () => {
    setTooltipPosition(undefined);
  };

  return (
    <>
      {tooltip && tooltipPosition && (
        <Tooltip top={tooltipPosition.y} left={tooltipPosition.x} width={200}>
          {tooltip}
        </Tooltip>
      )}
      <div
        css={[styles.buttonContainer, styleOverride]}
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
          onPointerEnter={() => openTooltip()}
          onPointerLeave={() => closeTooltip()}
          onClick={onClick ? onClick : () => {}}
        >
          <>{children}</>
        </button>
      </div>
    </>
  );
};

export default observer(ZoneEntityButton);
