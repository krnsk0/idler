import { Theme, css } from '@emotion/react';

export const styles = {
  integrityBox: (theme: Theme) => css`
    margin-top: 2em;
    height: 2em;
    border: 1px solid ${theme.colors.primary};
    position: relative;
    width: 90%;
  `,
  progressBar: (theme: Theme) => css`
    position: absolute;
    height: 2em;
    width: 100%;
    background-color: ${theme.colors.progressBar};
  `,
  integrityText: css`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    z-index: 1;
  `,
};
