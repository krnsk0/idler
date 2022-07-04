import { css } from '@emotion/react';

const dividerColor = '#383838';

export const styles = {
  tooltipContainer: css`
    position: relative;
  `,
  tooltipOuter: (top: number, left: number, width: number) => css`
    border: 1px solid black;
    padding: 0.4em 0.4em 0.4em 0.4em;
    position: absolute;
    width: ${width}px;
    left: ${left}px;
    top: ${top}px;
    background-color: white;
  `,
  tooltipDivider: css`
    border-top: 1px solid ${dividerColor};
    width: 100%;
    margin-top: 1.5em;
    padding-top: 1.5em;
    position: relative;
  `,
  tooltipDividerTextContainer: css`
    position: absolute;
    top: -0.7em;
    text-align: center;
    width: 100%;
  `,
  tooltipDividerText: css`
    color: ${dividerColor};
    background-color: white;
    padding: 0.4em;
  `,
  tooltipCenterText: css`
    width: 100%;
    text-align: center;
    color: ${dividerColor};
    font-style: italic;
  `,
};
