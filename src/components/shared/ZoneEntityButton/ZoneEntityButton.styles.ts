import { css } from '@emotion/react';
import {
  colors,
  entranceAnimation,
  entranceAnimationDuration,
  mq,
} from '../../../globalStyles';

export const styles = {
  buttonOuterContainer: css`
    width: 85%;
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

    font-size: 0.9em;
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
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 2em;
    width: 2em;
  `,
  invisibleOnDesktop: css`
    ${mq['hoverableDesktop']} {
      display: none;
    }
  `,
  visibleOnDesktop: css`
    display: none;
    ${mq['hoverableDesktop']} {
      display: flex;
    }
  `,
};
