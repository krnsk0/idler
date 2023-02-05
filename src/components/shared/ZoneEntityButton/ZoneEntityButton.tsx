import { SerializedStyles } from '@emotion/react';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { observer } from 'mobx-react-lite';
import { useRef } from 'react';
import { RxChevronDown, RxChevronRight } from 'react-icons/rx';
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
  isButtonExpanded?: boolean;
  expandButton?: () => void;
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
  isButtonExpanded,
  expandButton,
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
    <div
      css={[
        styles.buttonOuterContainer(isButtonExpanded),
        showEntranceAnimation && styles.animateEntrance,
        styleOverride,
      ]}
      style={{ borderColor: !disabled ? colors.black : colors.grey }}
      ref={containerRef}
      data-test-id={`button-outer`}
    >
      <div css={styles.buttonInner} data-test-id={`button-inner`}>
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
            css={[
              styles.smallButton(isButtonExpanded),
              styles.visibleOnDesktop,
            ]}
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
            css={[
              styles.smallButton(isButtonExpanded),
              styles.visibleOnDesktop,
            ]}
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
        {expandButton && (
          <button
            css={[
              styles.smallButton(isButtonExpanded),
              styles.invisibleOnDesktop,
            ]}
            style={{
              color: disabled ? colors.mediumdarkgrey : colors.black,
            }}
            onClick={expandButton}
            type="button"
          >
            {isButtonExpanded ? <RxChevronDown /> : <RxChevronRight />}
          </button>
        )}
      </div>
      {isButtonExpanded && (
        <div
          css={styles.tooltipContainer}
          style={{ color: disabled ? colors.mediumdarkgrey : colors.black }}
        >
          {tooltip}
        </div>
      )}
    </div>
  );
};

export default observer(ZoneEntityButton);
