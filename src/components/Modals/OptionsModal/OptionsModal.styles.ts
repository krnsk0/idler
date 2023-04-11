import { css, Theme } from '@emotion/react';

export const styles = {
  optionsContainer: css`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
  `,
  button: (theme: Theme) => css`
    margin: 0.5em;
    width: 150px;
    height: 3em;
    position: relative;
    border: 1px solid ${theme.colors.primary};
    background: none;
    position: relative;
    cursor: pointer;
  `,
  version: css`
    position: absolute;
    bottom: 2em;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  `,
  release: css`
    width: 90%;
  `,
  changelogContainer: css`
    height: 70%;
    width: 90%;
    padding: 0em 1em 0em 1em;
    overflow-y: scroll;
    ::-webkit-scrollbar {
      display: none; /* Safari and Chrome */
    }
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */
  `,
};
