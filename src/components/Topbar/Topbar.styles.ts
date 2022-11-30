import { css } from '@emotion/react';

export const styles = {
  topbarContainer: css`
    position: static;
    margin: auto;
    top: 0;
    display: flex;
    justify-content: flex-end;
    padding: 1em 1em 0 0;
    width: 99%;
  `,
  button: css`
    background: none;
    border: none;
    cursor: pointer;
    z-index: 100;
  `,
};
