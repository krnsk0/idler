import { css } from '@emotion/react';

export const styles = {
  resourcesContainer: css`
    display: flex;
    flex-direction: column;
    min-width: 250px;
    height: 100%;
    font-size: 0.8em;
  `,
  resourceRow: css`
    margin: 0.1em;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `,
  cap: css`
    color: grey;
  `,
};
