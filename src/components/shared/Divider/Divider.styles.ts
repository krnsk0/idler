import { css } from '@emotion/react';
import { colors, entranceAnimation } from '../../../globalStyles';

export const styles = {
  divider: (shown: boolean) => css`
    border-top: 1px solid ${colors.black};
    width: 90%;
    padding-top: 0.8em;
    position: relative;
    visibility: ${shown ? 'inherit' : 'hidden'};
  `,
  animateEntrance: (duration: number) => css`
    animation: ${entranceAnimation} ${duration}ms ease;
  `,
  dividerTextContainer: css`
    position: absolute;
    top: -0.7em;
    text-align: center;
    width: 100%;
  `,
  dividerText: css`
    color: ${colors.black};
    background-color: ${colors.white};
    padding: 0em 0.4em 0em 0.4em;
  `,
};
