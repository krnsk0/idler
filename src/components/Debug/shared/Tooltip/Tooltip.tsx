import { SerializedStyles } from '@emotion/react';
import { styles } from './Tooltip.styles';

interface TooltipProps {
  children: React.ReactNode;
  styleOverride?: SerializedStyles;
  top: number;
  left: number;
  width: number;
}

const Tooltip = ({
  children,
  styleOverride,
  top,
  left,
  width,
}: TooltipProps) => {
  return (
    <div css={styles.tooltipContainer}>
      <div css={[styles.tooltipOuter(top, left, width), styleOverride]}>
        {children}
      </div>
    </div>
  );
};

interface TooltipText {
  children: React.ReactNode;
  italic?: boolean;
  light?: boolean;
  align?: 'left' | 'center' | 'right';
}

export const TooltipText = ({
  children,
  italic,
  light,
  align,
}: TooltipText) => {
  return <div css={styles.tooltipText(italic, light, align)}>{children}</div>;
};

interface TooltipDividerProps {
  text?: string;
}

export const TooltipDivider = ({ text }: TooltipDividerProps) => {
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
};

export default Tooltip;
