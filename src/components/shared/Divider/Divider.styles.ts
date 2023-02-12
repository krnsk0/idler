import { css } from '@emotion/react';
import {
  colors,
  entranceAnimation,
  entranceAnimationDuration,
  mq,
} from '../../../globalStyles';

export const styles = {
  divider: css`
    border-top: 1px solid ${colors.black};
    width: 90%;
    position: relative;
    margin-bottom: 1em;

    ${mq['hoverableDesktop']} {
      width: 95%;
    }
  `,
  animateEntrance: css`
    animation: ${entranceAnimation} ${entranceAnimationDuration}ms ease;
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
