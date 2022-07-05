import { css } from '@emotion/react';

export const styles = {
  zoneOuter: css`
    width: 75%;
    height: 70%;
    min-width: 500px;
    max-width: 750px;
    position: absolute;
    left: 50%;
    top: 45%;
    transform: translate(-50%, -50%);
    /* border: 1px solid green; */
  `,
  zoneLeft: css``,
  zoneHeader: css`
    /* border: 1px solid blue; */
  `,
  zoneBody: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    /* border: 1px solid blue; */
  `,
};
