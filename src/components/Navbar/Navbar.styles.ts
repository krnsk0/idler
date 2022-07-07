import { css } from '@emotion/react';

export const styles = {
  navbar: css`
    position: fixed;
    top: 0;
    width: 100%;
    height: 3.5em;
    border-bottom: 1px solid black;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `,
  title: css`
    font-size: 1.4em;
    margin-left: 2em;
    width: 5em;
  `,
  techButtonContainer: css`
    min-width: 180px;
    max-width: 180px;
  `,
  rightContainer: css`
    margin-right: 1em;
    width: 5em;
  `,
};
