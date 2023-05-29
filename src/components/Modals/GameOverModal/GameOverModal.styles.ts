import { css, Theme } from '@emotion/react';

export const styles = {
  gameOverContainer: css`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
  `,
  button: (theme: Theme) => css`
    margin: 0.4em;
    width: 175px;
    height: 2.3em;
    position: relative;
    border: 1px solid ${theme.colors.primary};
    background: none;
    position: relative;
    cursor: pointer;
  `,
  bottomContainer: css`
    position: absolute;
    bottom: 2em;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  `,
};
