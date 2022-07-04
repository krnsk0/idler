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

interface TooltipDividerProps {
  text: string;
}

export const TooltipDivider = ({ text }: TooltipDividerProps) => {
  return (
    <>
      <div css={styles.tooltipDivider}>
        <div css={styles.tooltipDividerTextContainer}>
          <span css={styles.tooltipDividerText}>{text}</span>
        </div>
      </div>
    </>
  );
};

export default Tooltip;
