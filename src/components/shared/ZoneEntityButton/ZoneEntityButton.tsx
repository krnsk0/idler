import { SerializedStyles, useTheme } from '@emotion/react';
import { EmotionJSX } from '@emotion/react/types/jsx-namespace';
import { observer } from 'mobx-react-lite';
import { useRef } from 'react';
import { useStore } from '../../../store/Provider';
import { TooltipDivider, TooltipPortalRenderer } from '../Tooltip/Tooltip';
import { styles } from './ZoneEntityButton.styles';

/**
 * Same size but invisible; used to ensure proper alignment
 * in a flex wrap context
 */
export const ZoneEntityButtonSpacer = () => {
  return (
    <div
      css={[styles.buttonOuterContainer(false), styles.invisibleSpacerButton]}
    />
  );
};

interface ZoneEntityButtonProps {
  styleOverride?: SerializedStyles;
  tooltip?: React.ReactNode | EmotionJSX.Element;
  disabled?: boolean;
  onClick: () => void;
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
  const theme = useTheme();
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
        style={{
          borderColor: !disabled ? theme.colors.primary : theme.colors.disabled,
        }}
        ref={containerRef}
        data-test-id={`button-outer`}
      >
        <div css={styles.buttonTopRow}>
          <div css={styles.buttonInnerLeft}>
            <div css={styles.progressBar} style={{ width: progressWidth }} />
            <button
              css={styles.button}
              style={{
                cursor: disabled ? 'inherit' : 'pointer',
              }}
              type="button"
              disabled={disabled}
              onClick={onClick}
            >
              {buttonText}
            </button>
          </div>

          <div css={styles.buttonInnerRight}>
            {showEnablementButtons && (
              <>
                <button
                  css={[
                    styles.smallButton(isButtonExpanded),
                    styles.visibleOnDesktop,
                  ]}
                  style={{
                    color: disabled
                      ? theme.colors.disabled
                      : theme.colors.primary,
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
                    color: disabled
                      ? theme.colors.disabled
                      : theme.colors.primary,
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
                ]}
                style={{
                  color: disabled
                    ? theme.colors.disabled
                    : theme.colors.primary,
                  cursor: 'pointer',
                }}
                onClick={expandButton}
                type="button"
              >
                <span
                  style={{
                    transform: isButtonExpanded ? 'rotate(90deg)' : 'none',
                  }}
                >
                  {'>'}
                </span>
              </button>
            )}
          </div>
        </div>
        {isButtonExpanded && gui.areTooltipsVisible && (
          <div
            data-test-id={'tooltip'}
            css={[styles.tooltipContainer, styles.invisibleOnDesktop]}
            style={{
              color: disabled ? theme.colors.secondary : theme.colors.primary,
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
                          ? theme.colors.primary
                          : theme.colors.disabled,
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
                          ? theme.colors.primary
                          : theme.colors.disabled,
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
