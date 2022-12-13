import { css } from '@emotion/react';
import { colors, entranceAnimation } from '../../../globalStyles';

export const styles = {
  buttonContainer: css`
    width: 180px;
    height: 2em;
    position: relative;
  `,
  animateEntrance: (duration: number) => css`
    animation: ${entranceAnimation} ${duration}ms ease;
  `,
  button: css`
    border: 1px solid ${colors.black};

    width: 100%;
    height: 100%;
    background: none;
    position: relative;

    &:disabled {
      border-color: ${colors.mediumdarkgrey};
      color: ${colors.mediumdarkgrey};
    }
  `,
  progressBar: css`
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: ${colors.mediumgrey};
  `,
};
