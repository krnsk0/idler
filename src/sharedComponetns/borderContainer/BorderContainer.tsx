import { SerializedStyles } from '@emotion/react';
import { styles } from './BorderContainer.styles';

interface IBorderContainer {
  title: string;
  children: React.ReactNode;
  styleOverride?: SerializedStyles;
}

const BorderContainer = ({
  title,
  children,
  styleOverride,
}: IBorderContainer) => {
  return (
    <div css={[styles.container, styleOverride]}>
      <div css={styles.containerTitle}>{title}</div>
      {children}
    </div>
  );
};

export default BorderContainer;
