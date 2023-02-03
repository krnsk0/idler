import { css } from '@emotion/react';
import { colors } from '../../globalStyles';

export const styles = {
  zoneOuter: css`
    background-color: ${colors.white};
    height: 100%;
  `,
  zoneHeader: css`
    padding: 1em;
    width: 100%;

    h2 {
      margin: 0;
    }
  `,
  zoneColumns: css`
    display: flex;
    flex-direction: row;
  `,
  zoneLeft: css`
    min-width: 140px;
  `,
  zoneRight: css`
    flex-grow: 1;
    padding-top: 0.7em;
    background-color: ${colors.white};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    min-width: 240px;
  `,
  zoneRightInner: css`
    max-width: 400px;
    flex-direction: column;
    justify-content: space-between;
  `,
  tabRow: css`
    background: ${colors.white};
    position: fixed;
    bottom: 0;
    width: 100vw;
    height: 2em;
    border-top: 1px solid ${colors.black};
    font-size: 1.1em;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  `,
  resourceButton: css`
    background: none;
    border: none;
    margin: 0.2em;
  `,
  separator: css`
    margin-left: 0.5em;
    padding-left: 0.5em;
    border-left: 1px solid black;
  `,
  tabButton: (selected: boolean) => css`
    border: none;
    margin: 0;
    padding: 0;
    background: none;
    color: inherit;
    font: inherit;
    text-decoration: ${selected ? 'underline' : 'none'};
    &:hover {
      text-decoration: underline;
    }
    font-size: 1em;
    cursor: ${selected ? 'auto' : 'pointer'};
  `,
};
