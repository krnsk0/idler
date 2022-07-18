import { css } from '@emotion/react';

export const styles = {
  shipOuter: css`
    margin-bottom: 3em;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  shipColumnWrap: css`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 0.6em;
  `,
};
