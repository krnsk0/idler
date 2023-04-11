import { css, keyframes, Theme } from '@emotion/react';
import {
  entranceAnimation,
  entranceAnimationDuration,
  mq,
} from '../../../../globalStyles';

const flash = (theme: Theme) => keyframes`
  0% {
    background-color: ${theme.colors.secondary} ;
  }
  100%{

    background-color: ${theme.colors.background};
  }
`;

export const styles = {
  displayName: css``,
  resourceRowOuter: css``,
  resourceRowTop: css`
    margin: 0.1em 0 0.1em 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `,
  secondResourceRow: css`
    margin: 0.1em;
    display: flex;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    font-size: 0.8em;
    height: 0.8em;
  `,
  quantityContainer: css`
    min-width: 75px;
    justify-content: flex-end;
    margin-left: 1em;
  `,
  smallScreenOnly: css`
    display: inherit;
    ${mq['tablet']} {
      display: none;
    }
  `,

  largeScreenOnly: css`
    display: none;
    ${mq['tablet']} {
      display: inherit;
    }
  `,

  quantity: css`
    text-align: right;
    ${mq['tablet']} {
      width: 4em;
    }
  `,
  quantityPerSecond: (theme: Theme) => css`
    width: 3em;
    color: ${theme.colors.secondary};

    ${mq['tablet']} {
      display: flex;
      justify-content: flex-end;
    }
  `,
  cap: (theme: Theme) => css`
    text-align: right;
    width: 3em;
    color: ${theme.colors.secondary};
  `,
  highlight: (theme: Theme, duration: number) => css`
    animation: ${flash(theme)} ${duration}ms ease;
  `,
  tooltipRow: css`
    display: flex;
    justify-content: space-between;
  `,
  animateEntrance: css`
    animation: ${entranceAnimation} ${entranceAnimationDuration}ms ease;
  `,
  invisibleOnDesktop: css`
    ${mq['hoverableDesktop']} {
      display: none;
    }
  `,
  expandedResourceTooltip: (theme: Theme) => css`
    color: ${theme.colors.secondary};
    font-size: 0.8em;
    padding: 0 0.2em 0.2em;
    margin-top: 2em;
    margin-bottom: 0.4em;
  `,
  tooltipLeftText: css``,
  tooltipRightText: css`
    display: flex;
    align-items: end;
  `,
};
