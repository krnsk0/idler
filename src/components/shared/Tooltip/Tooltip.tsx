import { useTheme } from '@emotion/react';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useStore } from '../../../store/Provider';
import { styles } from './Tooltip.styles';

export const TooltipContainerId = 'tooltip-container';

interface TooltipPortalRendererProps {
  containerRef: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
}

export const TooltipPortalRenderer = observer(
  ({ children, containerRef }: TooltipPortalRendererProps) => {
    const [isHovered, setIsHovered] = useState(false);

    const { gui } = useStore();

    useEffect(() => {
      const openTooltip = () => setIsHovered(true);
      const closeTooltip = () => setIsHovered(false);
      const container = containerRef.current;
      if (container) {
        container.addEventListener('pointerenter', openTooltip);
        container.addEventListener('pointerleave', closeTooltip);
      }
      () => {
        if (container) {
          container.removeEventListener('pointerenter', openTooltip);
          container.removeEventListener('pointerleave', closeTooltip);
        }
      };
    }, []);

    const el = document.getElementById(TooltipContainerId);
    if (el && isHovered && gui.areTooltipsVisible) {
      return createPortal(
        <div
          css={[gui.showTooltipEntranceAnimation() && styles.animateEntrance]}
        >
          {children}
        </div>,
        el,
      );
    } else return null;
  },
);

interface TooltipTextProps {
  children: React.ReactNode;
  italic?: boolean;
  align?: 'left' | 'center' | 'right';
  largeBottomMargin?: boolean;
}

export const TooltipText = observer(
  ({ children, italic, align, largeBottomMargin }: TooltipTextProps) => {
    return (
      <div css={styles.tooltipText(italic, align, largeBottomMargin)}>
        {children}
      </div>
    );
  },
);

interface DesktopTooltipTitleProps {
  children: React.ReactNode;
  showDivider?: boolean;
}

export const DesktopTooltipTitle = observer(
  ({ children, showDivider }: DesktopTooltipTitleProps) => {
    return (
      <>
        <div css={styles.tooltipTitle}>{children}</div>
        {showDivider && <div css={styles.desktopTooltipDivider} />}
      </>
    );
  },
);

interface TooltipDividerProps {
  text?: string;
  smallMargin?: boolean;
}

export const TooltipDivider = observer(
  ({ text, smallMargin }: TooltipDividerProps) => {
    const theme = useTheme();
    return (
      <>
        <div css={styles.tooltipDivider(theme, !!text && !smallMargin)}>
          {text && (
            <div css={styles.tooltipDividerTextContainer}>
              {<span css={styles.tooltipDividerText}>{text}</span>}
            </div>
          )}
        </div>
      </>
    );
  },
);
