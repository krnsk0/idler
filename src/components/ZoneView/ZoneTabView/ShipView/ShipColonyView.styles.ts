import { css } from '@emotion/react';

export const styles = {
  shipOuter: css`
    margin-bottom: 3em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `,
  shipColumnWrap: css`
    width: 100%;
    min-width: 374px;
    min-height: 77px;
    display: inline-flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    gap: 0.6em;
    margin: 0 -0.6em 0 0;
  `,
};
