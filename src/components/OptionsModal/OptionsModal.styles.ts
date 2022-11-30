import { css } from '@emotion/react';
import { colors } from '../../globalStyles';

export const styles = {
  optionsContainer: css`
    min-width: 600px;
    min-height: 400px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    padding: 1em;
  `,
  button: css`
    margin: 0.5em;
    width: 180px;
    height: 2em;
    position: relative;
    border: 1px solid ${colors.black};
    background: none;
    position: relative;
    cursor: pointer;
  `,
};
