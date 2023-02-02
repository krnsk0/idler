import { css } from '@emotion/react';
import { colors } from '../../globalStyles';

export const styles = {
  zoneOuter: css`
    padding: 0em 1em 0em 1em;
    background-color: ${colors.white};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0.6em 0 0 0;
    height: 100%;
  `,

  zoneHeader: css`
    margin-top: 0.3em;
    margin-bottom: 0.5em;
  `,
};
