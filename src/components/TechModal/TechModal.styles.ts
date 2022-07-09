import { css } from '@emotion/react';
import { colors } from '../../globalStyles';

export const styles = {
  techsContainer: css`
    min-width: 600px;
    min-height: 400px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  `,
  modalDescripiton: css`
    font-size: 1em;
    margin-bottom: 0.8em;
  `,
  techTile: css`
    width: 175px;
    height: 200px;
    border: 1px solid black;
    margin: 1em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
    cursor: pointer;

    &:hover {
      border: 2px solid black;
    }
  `,
  techTitle: css`
    font-size: 1.4em;
    text-align: center;
    font-weight: bold;
  `,
  techDescription: css`
    font-size: 0.8em;
    margin: 1.8em 1em 0em 1em;
    font-style: italic;
    text-align: center;
  `,
  techCost: css`
    font-size: 0.8em;
    margin: 1.8em 1em 0em 1em;
    text-align: center;
  `,
};
