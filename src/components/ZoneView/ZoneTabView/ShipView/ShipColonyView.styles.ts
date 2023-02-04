import { css } from '@emotion/react';

export const styles = {
  shipOuter: css`
    padding-top: 0.65em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 1em;
  `,
  shipColumnWrap: css`
    width: 100%;
    min-height: 77px;
    display: inline-flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    gap: 0.6em;
  `,
};
