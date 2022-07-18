import { SerializedStyles } from '@emotion/react';
import { styles } from './BorderContainer.styles';

interface BorderContainerProps {
  title: string;
  children: React.ReactNode;
  styleOverride?: SerializedStyles;
  rightText?: string;
}

const BorderContainer = ({
  title,
  children,
  styleOverride,
  rightText,
}: BorderContainerProps) => {
  return (
    <div css={[styles.container, styleOverride]}>
      <div css={styles.textContainer}>
        <span css={styles.text}>{title}</span>
        <span css={styles.text}>{rightText ? rightText : ' '}</span>
      </div>

      {children}
    </div>
  );
};

export default BorderContainer;
