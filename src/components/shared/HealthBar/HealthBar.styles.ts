import { Theme, css } from '@emotion/react';

export const styles = {
  progressBar: (theme: Theme) => css`
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: ${theme.colors.progressBar};
  `,
  slowBar: (theme: Theme) => css`
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: ${theme.colors.disabled};
    transition: width 500ms 500ms linear;
  `,
};
