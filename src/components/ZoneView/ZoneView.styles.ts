import { css } from '@emotion/react';
import { colors } from '../../globalStyles';

export const styles = {
  zoneGridContainer: css`
    width: 100%;
    height: 70vh;
  `,
  zoneOuter: css`
    /* border: 1px solid ${colors.black}; */
    padding: 1em;
    background-color: ${colors.white};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: auto;
    margin-top: 10em;
    width: 750px;
  `,
  zoneLeft: css`
    margin-right: 2em;
    width: 384px;
  `,
  zoneRight: css``,
  zoneHeader: css`
    margin-top: 0.2em;
  `,
};
