import { css, Theme } from '@emotion/react';
import { mq } from '../../../globalStyles';

export const styles = {
  modalHeader: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h2 {
      font-size: 1.2em;
      margin: 1em 0 1em 0;
    }

    ${mq['landscape']} {
      h2 {
        margin: 0.5em 0 0.5em 0;
      }
    }

    div {
      font-size: 1em;
      text-align: center;
      padding: 0 2em 0 2em;
    }
  `,

  techsContainer: css`
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    overflow-x: scroll;

    ${mq['desktop']} {
      justify-content: center;
    }
  `,
  paddingTile: css`
    display: inline-block;
    padding-left: calc(50vw - 134px);

    ${mq['desktop']} {
      padding-left: 0px;
    }
  `,
  techTile: (theme: Theme) => css`
    width: 175px;
    min-width: 175px;
    height: 200px;
    min-height: 200px;
    margin: 0.5em;
    border: 1px solid ${theme.colors.primary};
    display: flex;
    padding: 0.5em 0.2em 0.5em 0.2em;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    cursor: pointer;

    &:hover {
      box-shadow: 0 0 0 0.6px ${theme.colors.primary};
    }
  `,
  techTitle: css`
    font-size: 1em;
    text-align: center;
    font-weight: bold;
  `,
  techDescription: css`
    font-size: 0.7em;
    margin: 1.3em 1em 0em 1em;
    font-style: italic;
    text-align: center;
  `,
  techCost: css`
    font-size: 0.8em;
    margin: 1em 1em 0em 1em;
    text-align: center;
  `,
};
