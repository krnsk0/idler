import { css } from '@emotion/react';
import { colors } from '../../globalStyles';

export const styles = {
  zoneOuter: css`
    padding: 0em 1em 0em 1em;
    background-color: ${colors.white};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 0.6em 0 0 0;
    height: 100%;
  `,
  zoneHeader: css`
    margin-top: 0.3em;
    margin-bottom: 0.5em;
  `,
  tabViewContainer: css`
    display: flex;
    flex-direction: column;
    margin-top: 1em;
  `,
  tabRow: css`
    font-size: 1.1em;
    margin-top: 0.5em;
    margin-bottom: 1.5em;
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
  tabContent: css`
    padding-top: 0.5em;
  `,
};
