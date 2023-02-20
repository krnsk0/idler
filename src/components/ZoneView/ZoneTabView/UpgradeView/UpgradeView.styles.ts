import { css } from '@emotion/react';
import { mq } from '../../../../globalStyles';

export const styles = {
  upgradeOuter: css`
    padding-top: 0.65em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 2em;
    width: 100%;
  `,
  upgradeColumnWrap: css`
    box-sizing: border-box;
    width: 100%;
    min-height: 77px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    gap: 0.5em;

    ${mq['hoverableDesktop']} {
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      align-items: start;
    }
  `,
  message: css`
    word-wrap: break-word;
    text-align: center;
  `,
};
