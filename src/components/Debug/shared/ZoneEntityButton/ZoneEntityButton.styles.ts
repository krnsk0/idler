import { css } from '@emotion/react';
import { colors } from '../../../../colors';

export const styles = {
  buttonContainer: css`
    border: 1px solid black;
    margin: 0.3em 0em 0.3em 0em;
    padding: 0.2em;
    width: 180px;
    height: 2em;
    background: none;
    z-index: +1;
  `,
  progressBarContainer: css`
    position: absolute;
    margin: 0.3em 0em 0.3em 0em;
    width: 180px;
    height: 2em;
  `,
  progressBar: css`
    height: 100%;
    background-color: ${colors.lightgrey};
  `,
};
