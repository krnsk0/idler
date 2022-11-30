import { css } from '@emotion/react';

export const styles = {
  debug: css`
    position: inherit;
    top: 0;
    width: 100%;
    border-bottom: 1px solid black;

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
    width: 100%;
  `,
};
