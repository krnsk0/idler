import { css } from '@emotion/react';
import { colors } from '../../../../colors';

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
    border-top: 1px solid ${colors.darkgrey};
    width: 100%;
    margin-top: 1.4em;
    padding-top: 0.6em;
    position: relative;
  `,
  tooltipDividerTextContainer: css`
    position: absolute;
    top: -0.7em;
    text-align: center;
    width: 100%;
  `,
  tooltipDividerText: css`
    color: ${colors.darkgrey};
    background-color: white;
    padding: 0em 0.4em 0em 0.4em;
  `,
  tooltipText: (italic: boolean, light: boolean, center: boolean) => css`
    width: 100%;
    text-align: ${!center ? 'inherit' : 'center'};
    color: ${!light ? 'inherit' : colors.darkgrey};
    font-style: ${!italic ? 'inherit' : 'italic'};
  `,
};
