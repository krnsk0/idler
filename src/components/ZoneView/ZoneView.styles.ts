import { css } from '@emotion/react';

export const styles = {
  zoneOuter: css`
    width: 75%;
    height: 70%;
    max-width: 750px;
    min-width: 850px;
    position: absolute;
    left: 50%;
    top: 45%;
    transform: translate(-50%, -50%);
    /* border: 1px solid green; */
  `,
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
