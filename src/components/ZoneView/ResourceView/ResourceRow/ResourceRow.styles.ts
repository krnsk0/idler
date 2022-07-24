import { css, keyframes } from '@emotion/react';
import { colors } from '../../../../globalStyles';

const flash = keyframes`
  0% {

    background-color: ${colors.darkgrey} ;
  }
  100%{

    background-color: ${colors.white};
  }
`;

export const styles = {
  resourceRow: css`
    margin: 0.1em;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `,
  quantityContainer: css`
    display: flex;
    min-width: 75px;
    justify-content: space-between;
  `,
  quantityPerSecond: css`
    color: ${colors.grey};
  `,
  cap: css`
    color: ${colors.grey};
  `,
  highlight: (duration: number) => css`
    animation: ${flash} ${duration}ms ease;
  `,
};