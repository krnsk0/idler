import { css } from '@emotion/react';
import { colors } from '../../../../../globalStyles';

export const styles = {
  onOff: css`
    position: absolute;
    right: 0.5em;
    top: 0;
    height: 100%;
    border-left: 1px solid ${colors.black};
    padding-left: 0.5em;
  `,
};
