import { css } from '@emotion/react';

export const styles = {
  shipOuter: css`
    padding-top: 0.65em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 1em;
    width: 100%;
  `,
  shipColumnWrap: css`
    box-sizing: border-box;
    width: 100%;
    min-height: 77px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    gap: 0.6em;
  `,
};
