import { observer } from 'mobx-react-lite';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { styles } from './Tooltip.styles';

type Position = 'BOTTOM' | 'RIGHT' | 'LEFT';

const sideBufferPx = 20;

interface TooltipProps {
  containerRef: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
  position: Position;
  width?: number;
}

const Tooltip = ({
  containerRef,
  children,
  position,
  width = 200,
}: TooltipProps) => {
  const tooltipRef = useRef<HTMLDivElement>(null);

  /**
   * How far up do we bump tooltip when it ends up off bottom of screen?
   */
  const [yOffset, setYOffset] = useState<number>(0);

  /**
   * Is tooltip visible, and where on screen if so?
   */
  const [tooltipPosition, setTooltipPosition] = useState<
    | {
        x: number;
        y: number;
      }
    | undefined
  >(undefined);

  const openTooltip = () => {
    if (containerRef.current) {
      const { top, left, bottom, right } =
        containerRef.current.getBoundingClientRect();
      if (position === 'BOTTOM') {
        setTooltipPosition({ x: left, y: bottom + sideBufferPx });
      } else if (position === 'RIGHT') {
        setTooltipPosition({ x: right + sideBufferPx, y: top });
      } else if (position === 'LEFT') {
        setTooltipPosition({ x: left - width - 2 * sideBufferPx, y: top });
      }
    }
  };

  const closeTooltip = () => {
    setTooltipPosition(undefined);
  };

  useEffect(() => {
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

  /**
   * Ensure tooltip does not go off bottom of screen
   */
  useLayoutEffect(() => {
    if (tooltipRef.current && tooltipPosition) {
      const { bottom } = tooltipRef.current.getBoundingClientRect();
      const overflowY = bottom - window.innerHeight;
      if (overflowY > 0) {
        setYOffset(overflowY);
      }
    }
  }, [tooltipPosition]);

  if (!tooltipPosition) return null;
  return (
    <div
      css={styles.tooltipOuter(
        tooltipPosition.y - yOffset,
        tooltipPosition.x,
        width,
      )}
      ref={tooltipRef}
    >
      {children}
    </div>
  );
};

export default Tooltip;

interface TooltipText {
  children: React.ReactNode;
  italic?: boolean;
  light?: boolean;
  align?: 'left' | 'center' | 'right';
}

export const TooltipText = observer(
  ({ children, italic, light, align }: TooltipText) => {
    return <div css={styles.tooltipText(italic, light, align)}>{children}</div>;
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
