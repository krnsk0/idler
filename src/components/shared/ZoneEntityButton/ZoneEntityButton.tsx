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
  reverseProgressBar,
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
      <Tooltip
        containerRef={containerRef}
        tooltipTop={14}
        tooltipLeft={185}
        width={200}
      >
        {tooltip}
      </Tooltip>

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
          onClick={onClick ? onClick : () => {}}
        >
          <>{children}</>
        </button>
      </div>
    </>
  );
};

export default observer(ZoneEntityButton);
