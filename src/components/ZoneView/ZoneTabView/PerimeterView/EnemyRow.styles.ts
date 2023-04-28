import { Theme, css } from '@emotion/react';

export const styles = {
  enemyBox: (theme: Theme) => css`
    border: 1px solid ${theme.colors.primary};
    width: 90%;
    height: 10em;
  `,
  enemyRow: (theme: Theme) => css`
    height: 2em;
    border-bottom: 1px solid ${theme.colors.primary};
    display: flex;
    align-items: center;
  `,
  caret: css`
    margin-left: 0.5em;
    margin-right: 0.5em;
  `,
};
