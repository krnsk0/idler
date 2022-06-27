import { css } from '@emotion/react';

export const styles = {
  zoneOuter: css`
    width: 75%;
    height: 75%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid black;
  `,
  zoneHeader: css``,
  zoneBody: css`
    display: flex;
    flex-direction: row;
  `,
};
