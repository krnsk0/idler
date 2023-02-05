import { SerializedStyles } from '@emotion/react';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { observer } from 'mobx-react-lite';
import { useRef } from 'react';
import { RxChevronRight } from 'react-icons/rx';
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
  tooltipPosition: 'RIGHT' | 'LEFT';
  buttonText: string;
  enableEntity?: () => void;
  disableEntity?: () => void;
  canEnableEntity?: boolean;
  canDisableEntity?: boolean;
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
  tooltipPosition,
  buttonText,
  enableEntity,
  disableEntity,
  canEnableEntity,
  canDisableEntity,
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
          styles.buttonOuterContainer,
          showEntranceAnimation && styles.animateEntrance,
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
          {buttonText}
        </button>
        {disableEntity && (
          <button
            css={[styles.smallButton, styles.visibleOnDesktop]}
            style={{
              color: disabled ? colors.mediumdarkgrey : colors.black,
              cursor: canDisableEntity ? 'pointer' : 'inherit',
            }}
            onClick={disableEntity}
            type="button"
          >
            -
          </button>
        )}
        {enableEntity && (
          <button
            css={[styles.smallButton, styles.visibleOnDesktop]}
            style={{
              color: disabled ? colors.mediumdarkgrey : colors.black,
              cursor: canEnableEntity ? 'pointer' : 'inherit',
            }}
            onClick={enableEntity}
            type="button"
          >
            +
          </button>
        )}
        <button
          css={[styles.smallButton, styles.invisibleOnDesktop]}
          style={{
            color: disabled ? colors.mediumdarkgrey : colors.black,
          }}
          onClick={() => {}}
          type="button"
        >
          <RxChevronRight />
        </button>
      </div>
    </>
  );
};

export default observer(ZoneEntityButton);
