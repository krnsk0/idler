import { css } from '@emotion/react';
import {
  colors,
  entranceAnimation,
  entranceAnimationDuration,
  mq,
} from '../../../globalStyles';

export const styles = {
  buttonOuterContainer: (expanded: boolean | undefined) => css`
    width: 85%;
    height: ${expanded ? 'inherit' : '2em'};
    border: 1px solid;
    position: relative;
  `,
  animateEntrance: css`
    animation: ${entranceAnimation} ${entranceAnimationDuration}ms ease;
  `,
  button: css`
    border: none;
    width: 100%;
    height: 2em;
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
    height: 2em;
    width: 100%;
    background-color: ${colors.mediumgrey};
  `,
  smallButton: (expanded: boolean | undefined) => css`
    border: none;
    border-left: 1px solid;
    border-bottom: ${expanded ? '1px solid' : 'none'};
    background: none;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 2em;
    width: 2em;
    height: 2em;
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
  buttonInner: css`
    position: relative;
    display: flex;
  `,
  tooltipContainer: css``,
};
