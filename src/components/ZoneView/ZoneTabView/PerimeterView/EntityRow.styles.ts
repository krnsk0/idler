import { Theme, css } from '@emotion/react';

export const styles = {
  entityBox: (theme: Theme) => css`
    border: 1px solid ${theme.colors.primary};
    width: 90%;
    height: 10em;
  `,
  entityRow: (theme: Theme) => css`
    height: 2em;
    border-bottom: 1px solid ${theme.colors.primary};
    display: flex;
    align-items: center;
  `,
};
