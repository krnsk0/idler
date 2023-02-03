import { css, keyframes } from '@emotion/react';
import { colors, mq } from '../../../../globalStyles';

const flash = keyframes`
  0% {

    background-color: ${colors.darkgrey} ;
  }
  100%{

    background-color: ${colors.white};
  }
`;

export const styles = {
  displayName: css`
    width: 5em;
  `,
  resourceRowOuter: css``,
  resourceRowInner: css`
    margin: 0.1em;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `,
  largeScreenQuantityConainer: css`
    display: none;
    min-width: 75px;
    justify-content: space-between;
    ${mq['tablet']} {
      display: flex;
    }
  `,
  smallScreenOnly: css`
    display: inherit;
    ${mq['tablet']} {
      display: none;
    }
  `,
  quantity: css``,
  smallScreenQuantityPerSecond: css`
    display: inherit;
    ${mq['tablet']} {
      display: none;
    }
    color: ${colors.grey};
  `,
  largeScreenQuantityPerSecond: css`
    display: none;
    ${mq['tablet']} {
      display: inherit;
    }
    color: ${colors.grey};
  `,
  cap: css`
    color: ${colors.grey};
  `,
  highlight: (duration: number) => css`
    animation: ${flash} ${duration}ms ease;
  `,
  tooltipRow: css`
    display: flex;
    justify-content: space-between;
  `,
};
