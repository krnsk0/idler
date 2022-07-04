import { css } from '@emotion/react';

export const styles = {
  tabViewContainer: css`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 300px;
  `,
  tabRow: css``,
  separator: css`
    margin-left: 10px;
    padding-left: 10px;
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
  `,

  tabContent: css``,
};
