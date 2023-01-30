import { css } from '@emotion/react';
import { colors } from '../../globalStyles';

export const styles = {
  zoneHeader: css`
    margin-top: 0.2em;
    margin-bottom: 0.5em;
  `,
  zoneOuter: css`
    border: 1px solid ${colors.black};
    padding: 1em;
    background-color: ${colors.white};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: auto;
    margin-top: 10em;
  `,
};
