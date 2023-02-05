import { css } from '@emotion/react';
import {
  colors,
  entranceAnimation,
  entranceAnimationDuration,
  mq,
} from '../../../globalStyles';

export const styles = {
  buttonOuterContainer: css`
    width: 80%;
    height: 2em;
    position: relative;
    display: flex;
    border: 1px solid;
  `,
  animateEntrance: css`
    animation: ${entranceAnimation} ${entranceAnimationDuration}ms ease;
  `,
  button: css`
    border: none;
    width: 100%;
    height: 100%;
    background: none;
    position: relative;
    &:disabled {
      color: ${colors.mediumdarkgrey};
    }

    font-size: 0.95em;
    ${mq['tablet']} {
      font-size: 1em;
    }
  `,
  progressBar: css`
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: ${colors.mediumgrey};
  `,
  smallButton: css`
    border: none;
    border-left: 1px solid;
    background: none;
  `,
};
