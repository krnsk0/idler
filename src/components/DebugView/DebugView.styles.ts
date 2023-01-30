import { css } from '@emotion/react';

export const styles = {
  debug: css`
    font-size: 0.8em;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    width: 60%;

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
