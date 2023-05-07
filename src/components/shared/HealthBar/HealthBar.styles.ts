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
    background-color: ${theme.colors.dimProgressBar};
    transition: width 400ms 100ms linear;
  `,
};
