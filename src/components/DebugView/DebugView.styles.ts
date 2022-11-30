import { css } from '@emotion/react';

export const styles = {
  debug: css`
    position: absolute;
    top: 0;
    width: 100%;

    button {
      height: 1.5em;
      display: inline-block;
      width: auto;
    }
  `,
  debugRow: css`
    display: flex;
    flex-direction: row;
    justify-content: center;
  `,
};
