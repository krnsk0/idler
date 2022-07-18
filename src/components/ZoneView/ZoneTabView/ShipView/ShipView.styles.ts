import { css } from '@emotion/react';

export const styles = {
  shipOuter: css`
    margin-bottom: 3em;
    display: flex;
    flex-direction: column;
    align-items: center;
  `,
  shipColumnWrap: css`
    width: 100%;
    min-width: 374px;
    min-height: 77px;
    display: grid;
    grid-template-rows: repeat(auto, auto);
    grid-template-columns: repeat(2, auto);
    align-items: flex-start;
    justify-content: flex-start;
    gap: 0.6em;
  `,
};
