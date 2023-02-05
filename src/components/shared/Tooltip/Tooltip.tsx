import { observer } from 'mobx-react-lite';
import { styles } from './Tooltip.styles';

interface TooltipText {
  children: React.ReactNode;
  italic?: boolean;
  align?: 'left' | 'center' | 'right';
}

export const TooltipText = observer(
  ({ children, italic, align }: TooltipText) => {
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
