import { SerializedStyles } from '@emotion/react';
import { observer } from 'mobx-react-lite';
import { styles } from './Tooltip.styles';

interface TooltipProps {
  children: React.ReactNode;
  styleOverride?: SerializedStyles;
  top?: number;
  left?: number;
  width?: number;
}

const Tooltip = ({
  children,
  styleOverride,
  top = 12,
  left = 190,
  width = 200,
}: TooltipProps) => {
  return (
    <div css={styles.tooltipContainer} id="tooltip-container">
      <div css={[styles.tooltipOuter(top, left, width), styleOverride]}>
        {children}
      </div>
    </div>
  );
};

export default observer(Tooltip);

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
