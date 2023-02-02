import { css } from '@emotion/react';
import { colors } from '../../globalStyles';

export const styles = {
  optionsContainer: css`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
  `,
  button: css`
    margin: 0.5em;
    width: 150px;
    height: 3em;
    position: relative;
    border: 1px solid ${colors.black};
    background: none;
    position: relative;
    cursor: pointer;
  `,
};
