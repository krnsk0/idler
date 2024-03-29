import { css } from '@emotion/react';

export const styles = {
  debug: css`
    z-index: +1;
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
      background-color: none;
      color: black;
    }
  `,
  debugRow: css`
    display: flex;
    flex-direction: row;
    justify-content: center;
  `,
};
