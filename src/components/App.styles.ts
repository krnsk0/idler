import { css } from '@emotion/react';

export const styles = {
  centerOuter: css`
    display: flex;
    height: 100%;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  `,
  centerInner: css`
    border: 1px solid black;
    width: 75%;
    height: 75%;
  `,
};
