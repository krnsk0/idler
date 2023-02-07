import { SerializedStyles } from '@emotion/react';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { observer } from 'mobx-react-lite';
import { useRef } from 'react';
import { RxChevronDown, RxChevronRight } from 'react-icons/rx';
import { colors } from '../../../globalStyles';
import { useStore } from '../../../store/Provider';
import { TooltipDivider, TooltipPortalRenderer } from '../Tooltip/Tooltip';
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

  const showEnablementButtons = enableEntity && disableEntity;

  const { gui } = useStore();

  return (
    <>
      <TooltipPortalRenderer containerRef={containerRef}>
        {tooltip}
      </TooltipPortalRenderer>
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

          {showEnablementButtons && (
            <>
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
            </>
          )}
          {expandButton && gui.areTooltipsVisible && (
            <button
              css={[
                styles.smallButton(isButtonExpanded),
                styles.invisibleOnDesktop,
                gui.showTooltipEntranceAnimation() && styles.animateEntrance,
              ]}
              style={{
                color: disabled ? colors.mediumdarkgrey : colors.black,
                cursor: 'pointer',
              }}
              onClick={expandButton}
              type="button"
            >
              {isButtonExpanded ? <RxChevronDown /> : <RxChevronRight />}
            </button>
          )}
        </div>
        {isButtonExpanded && gui.areTooltipsVisible && (
          <div
            css={[styles.tooltipContainer, styles.invisibleOnDesktop]}
            style={{
              color: disabled ? colors.mediumdarkgrey : colors.black,
            }}
          >
            <>
              {tooltip}
              {showEnablementButtons && (
                <>
                  <TooltipDivider text={'activation'} />
                  <div css={styles.tooltipActivationButtons}>
                    <button
                      css={styles.tooltipActivationButton}
                      style={{
                        cursor: canDisableEntity ? 'pointer' : 'inherit',
                        color: canDisableEntity
                          ? colors.black
                          : colors.mediumdarkgrey,
                      }}
                      onClick={disableEntity}
                      type="button"
                    >
                      -
                    </button>

                    <button
                      css={styles.tooltipActivationButton}
                      style={{
                        cursor: canEnableEntity ? 'pointer' : 'inherit',
                        color: canEnableEntity
                          ? colors.black
                          : colors.mediumdarkgrey,
                      }}
                      onClick={enableEntity}
                      type="button"
                    >
                      +
                    </button>
                  </div>
                </>
              )}
            </>
          </div>
        )}
      </div>
    </>
  );
};

export default observer(ZoneEntityButton);
