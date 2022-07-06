import { SerializedStyles } from '@emotion/react';
import { styles } from './BorderContainer.styles';

interface BorderContainerProps {
  title: string;
  children: React.ReactNode;
  styleOverride?: SerializedStyles;
}

const BorderContainer = ({
  title,
  children,
  styleOverride,
}: BorderContainerProps) => {
  return (
    <div css={[styles.container, styleOverride, styles.newContainer]}>
      <div css={styles.containerTitle}>{title}</div>
      {children}
    </div>
  );
};

export default BorderContainer;
