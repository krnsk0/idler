import { css } from '@emotion/react';
import { colors } from '../../globalStyles';

export const styles = {
  zoneGridContainer: css`
    display: grid;
    justify-content: center;
    align-content: center;
    width: 100%;
    height: 80vh;
  `,
  zoneOuter: css`
    padding: 1.5em;
    background-color: ${colors.white};
  `,
  zoneLeft: css`
    margin-right: 2em;
    max-width: 384px;
  `,
  zoneHeader: css`
    margin: 0.4em 0em 0.3em 0em;
  `,
  zoneBody: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    /* border: 1px solid blue; */
  `,
};
