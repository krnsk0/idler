import { css } from '@emotion/react';

export const styles = {
  tabViewContainer: css`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 300px;
  `,
  tabRow: css`
    margin-bottom: 0.5em;
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
  `,
  tabContent: css`
    padding-top: 0.5em;
    height: 100%;
    /* border: 1px solid blue; */
  `,
};
