import { css } from '@emotion/react';
import { colors } from '../../../globalStyles';

export const styles = {
  buttonContainer: css`
    border: 1px solid black;
    width: 180px;
    height: 2em;
    margin: 0.3em 0em 0.3em 0em;
    position: relative;
  `,
  button: css`
    border: none;
    width: 100%;
    height: 100%;
    background: none;
    position: relative;
  `,
  progressBar: css`
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: ${colors.lightgrey};
  `,
};
