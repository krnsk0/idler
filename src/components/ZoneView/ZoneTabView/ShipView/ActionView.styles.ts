import { css } from '@emotion/react';

export const styles = {
  shipOuter: css`
    width: 100%;
    margin-bottom: 3em;
  `,
  shipContainer: css`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
  `,
  shipColumn: css`
    margin-right: 0.6em;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  `,
  shipColumnWrap: css`
    margin-right: 0.6em;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 0.6em;
  `,
};
