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
  resourceRowTop: css`
    margin: 0.1em;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `,
  resourceRowBottom: css`
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
    justify-content: space-between;
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

  quantity: css``,
  quantityPerSecond: css`
    color: ${colors.grey};
    margin-left: 0em;
    ${mq['tablet']} {
      margin-left: 1em;
    }
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
