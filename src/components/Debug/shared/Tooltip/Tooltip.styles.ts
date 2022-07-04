import { css } from '@emotion/react';

const titleOffset = '10px';

export const styles = {
  tooltipContainer: css`
    position: relative;
  `,
  tooltipOuter: (top: number, left: number) => css`
    border: 1px solid black;
    padding: 0.4em 0.4em 0.4em 0.4em;
    position: absolute;
    width: 200px;
    height: 50px;
    left: ${left}px;
    top: ${top}px;
    background-color: white;
  `,
};
