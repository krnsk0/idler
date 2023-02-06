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

    const {
      gui: { areSideTooltipsVisible },
    } = useStore();

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
    if (el && isHovered && areSideTooltipsVisible) {
      return createPortal(children, el);
    } else return null;
  },
);

interface TooltipTextProps {
  children: React.ReactNode;
  italic?: boolean;
  align?: 'left' | 'center' | 'right';
}

export const TooltipText = observer(
  ({ children, italic, align }: TooltipTextProps) => {
    return <div css={styles.tooltipText(italic, align)}>{children}</div>;
  },
);

interface TooltipDividerProps {
  text?: string;
}

export const TooltipDivider = observer(({ text }: TooltipDividerProps) => {
  return (
    <>
      <div css={styles.tooltipDivider(!!text)}>
        {text && (
          <div css={styles.tooltipDividerTextContainer}>
            {<span css={styles.tooltipDividerText}>{text}</span>}
          </div>
        )}
      </div>
    </>
  );
});
