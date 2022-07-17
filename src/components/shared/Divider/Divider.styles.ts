import { css } from '@emotion/react';
import { colors } from '../../../globalStyles';

export const styles = {
  divider: (largeMargin: boolean, width: number | undefined) => css`
    border-top: 1px solid ${colors.darkgrey};
    width: ${width === undefined ? '100%' : `${width}px`};
    margin-top: ${largeMargin ? '1.4em' : '0.8em'};
    padding-top: 0.8em;
    position: relative;
  `,
  dividerTextContainer: css`
    position: absolute;
    top: -0.7em;
    text-align: center;
    width: 100%;
  `,
  dividerText: css`
    color: ${colors.darkgrey};
    background-color: ${colors.white};
    padding: 0em 0.4em 0em 0.4em;
  `,
};
