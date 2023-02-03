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
  resourceRowOuter: css`
    margin-bottom: 0.4em;
  `,
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
    justify-content: end;
    font-size: 0.8em;
    height: 0.8em;
  `,
  quantityContainer: css`
    min-width: 75px;
    justify-content: space-between;
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
