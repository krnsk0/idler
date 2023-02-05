import { css } from '@emotion/react';
import { colors } from '../../../globalStyles';

export const styles = {
  tooltipOuter: (top: number, left: number, width: number) => css`
    border: 1px solid black;
    padding: 0.4em 0.4em 0.4em 0.4em;
    position: fixed;
    width: ${width}px;
    left: ${left}px;
    top: ${top}px;
    background-color: ${colors.white};
    z-index: +1;
    font-size: 1em;
  `,

  tooltipDivider: (largeMargin: boolean) => css`
    border-top: 1px solid;
    width: 100%;
    margin-top: ${largeMargin ? '1.4em' : '0.8em'};
    padding-top: 0.8em;
    position: relative;
  `,
  tooltipDividerTextContainer: css`
    position: absolute;
    top: -0.7em;
    text-align: center;
    width: 100%;
  `,
  tooltipDividerText: css`
    background-color: ${colors.white};
    padding: 0em 0.4em 0em 0.4em;
  `,
  tooltipText: (
    italic: boolean | undefined,
    align: 'left' | 'center' | 'right' | undefined,
  ) => css`
    width: 100%;
    text-align: ${!align ? 'left' : align};
    font-style: ${!italic ? 'inherit' : 'italic'};
  `,
};
