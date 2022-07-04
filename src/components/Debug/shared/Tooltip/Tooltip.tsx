import { SerializedStyles } from '@emotion/react';
import { styles } from './Tooltip.styles';

interface ITooltip {
  children: React.ReactNode;
  styleOverride?: SerializedStyles;
  top: number;
  left: number;
}

const Tooltip = ({ children, styleOverride, top, left }: ITooltip) => {
  return (
    <div css={styles.tooltipContainer}>
      <div css={[styles.tooltipOuter(top, left), styleOverride]}>
        {children}
      </div>
    </div>
  );
};

export default Tooltip;
