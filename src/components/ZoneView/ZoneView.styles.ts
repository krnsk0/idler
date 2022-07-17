import { css } from '@emotion/react';
import { colors } from '../../globalStyles';

export const styles = {
  zoneOuter: css`
    width: 75%;
    height: 55%;
    min-width: 700px;
    max-width: 800px;
    position: absolute;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    /* border: 1px solid black; */
    padding: 1.5em;
    background-color: ${colors.white};
  `,
  zoneLeft: css`
    width: 100%;
    margin-right: 1em;
  `,
  zoneHeader: css`
    margin: 0.4em 0em 0.3em 0em;
  `,
  zoneBody: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    /* border: 1px solid blue; */
  `,
};
