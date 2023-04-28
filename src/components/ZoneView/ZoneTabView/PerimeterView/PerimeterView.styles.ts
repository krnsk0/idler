import { Theme, css } from '@emotion/react';

export const styles = {
  perimeterContainer: css`
    padding-top: 0.65em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  `,
  countdown: css`
    width: 90%;
    max-width: 200px;
    display: flex;
    justify-content: space-between;
  `,
  enemyBox: (theme: Theme) => css`
    border: 1px solid ${theme.colors.primary};
    width: 90%;
    height: 10em;
  `,
};
