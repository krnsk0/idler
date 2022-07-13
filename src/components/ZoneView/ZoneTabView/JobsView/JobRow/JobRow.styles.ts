import { css } from '@emotion/react';

const buttonCommon = css`
  background: none;
  border: none;
  outline: 1px solid black;
  margin-left: 0.2em;

  &:hover {
    outline: 1.5px solid black;
  }
`;

export const styles = {
  jobRowContainer: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `,
  name: css`
    width: 6em;
  `,
  workers: css`
    width: 5em;
  `,
  buttons: css`
    margin-left: 3em;
    width: 4em;
  `,
  inc: css`
    ${buttonCommon}
  `,
  dec: css`
    ${buttonCommon}
  `,
};
