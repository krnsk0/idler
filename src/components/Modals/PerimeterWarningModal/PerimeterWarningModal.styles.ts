import { css } from '@emotion/react';
import { colors } from '../../../globalStyles';

export const styles = {
  container: css`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
  `,
  text: css`
    margin: 3em;
    width: 80%;
    text-align: center;
    font-size: 1.2em;
  `,
  button: css`
    margin: 0.5em;
    width: 150px;
    height: 3em;
    border: 1px solid ${colors.primary};
    background: none;
    position: absolute;
    cursor: pointer;
    bottom: 4em;
  `,
};
