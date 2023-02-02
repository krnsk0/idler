import { css } from '@emotion/react';
import { colors } from '../../globalStyles';

export const styles = {
  techsContainer: css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    padding: 1em;
  `,
  modalDescripiton: css`
    font-size: 1em;
    text-align: center;
  `,
  techTile: css`
    width: 175px;
    height: 200px;
    border: 1px solid ${colors.black};
    margin: 1em;
    display: flex;
    padding: 1em 0.2em 1em 0.2em;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    cursor: pointer;

    &:hover {
      box-shadow: 0 0 0 0.6px ${colors.black};
    }
  `,
  techTitle: css`
    font-size: 1.2em;
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
