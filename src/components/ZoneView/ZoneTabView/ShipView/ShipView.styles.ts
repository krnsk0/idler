import { css } from '@emotion/react';

export const styles = {
  shipOuter: css`
    margin-bottom: 3em;
  `,
  shipContainer: css`
    width: 100%;
    display: flex;
    flex-direction: row;
  `,
  shipColumnWrap: css`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    gap: 0.6em;
  `,
};
