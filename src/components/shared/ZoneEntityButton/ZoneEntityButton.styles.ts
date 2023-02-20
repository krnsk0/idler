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
    ${mq['hoverableDesktop']} {
      max-width: 12em;
    }

    height: ${expanded ? 'inherit' : '2em'};
    border: 1px solid;
    position: relative;
  `,
  /**
   * Allows forcing the last item in an odd number of flex-wrapped
   * items to the left
   */
  invisibleSpacerButton: css`
    display: none;
    visibility: inherit;
    :last-child:nth-of-type(even) {
      display: inherit;
      visibility: hidden;
    }
  `,

  animateEntrance: css`
    animation: ${entranceAnimation} ${entranceAnimationDuration}ms ease;
  `,
  buttonTopRow: css`
    display: flex;
  `,
  button: css`
    border: none;
    height: 2em;
    width: 100%;
    background: none;
    position: relative;
    word-break: break-word;
    word-wrap: break-word;
    &:disabled {
      color: ${colors.mediumdarkgrey};
    }

    font-size: 0.95em;
    ${mq['tablet']} {
      font-size: 1em;
    }

    ${mq['hoverableDesktop']} {
      text-align: left;
      padding-left: 0.5em;
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
    ${mq['hoverableDesktop']} {
      border-bottom: none;
    }
    background: none;
    display: flex;
    justify-content: center;
    align-items: center;

    width: 1.6em;
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
  buttonInnerLeft: css`
    position: relative;
    display: flex;
    flex-grow: 1;
  `,
  buttonInnerRight: css`
    position: relative;
    display: flex;
    flex-grow: 0;
  `,

  tooltipContainer: css`
    padding: 0.7em 0.6em 0.7em 0.6em;
    font-size: 0.9em;
  `,
  tooltipActivationButtons: css`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1em;
  `,
  tooltipActivationButton: css`
    background: none;
    border: 1px solid;
    width: 3em;
    height: 1.5em;
    font-size: 1.2em;
  `,
};
