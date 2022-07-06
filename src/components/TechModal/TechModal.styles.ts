import { css } from '@emotion/react';
import { colors } from '../../globalStyles';

export const styles = {
  overlay: css`
    background: 'grey';
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  modalOuter: css`
    width: 70%;
    height: 80%;
    border: 1px solid black;
    background-color: ${colors.white};
  `,
};
