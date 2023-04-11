import { css, Theme } from '@emotion/react';
import { mq } from '../../globalStyles';

export const styles = {
  zoneOuter: (theme: Theme) => css`
    background-color: ${theme.colors.background};
    height: 100vh;
    display: flex;
    flex-direction: column;
  `,
  zoneHeader: css`
    flex: 0 1 auto;

    padding: 1em;
    width: 100%;

    h2 {
      margin: 0;
    }

    text-align: left;
    margin: 0;
    ${mq['tablet']} {
      text-align: center;
    }
    ${mq['desktop']} {
      margin: 1em 0 1em 0;
    }
  `,
  zoneColumns: css`
    height: calc(100vh - 56px);
    ${mq['desktop']} {
      height: calc(100vh - 88px);
    }

    display: flex;
    flex-direction: row;
    justify-content: left;
    ${mq['tablet']} {
      justify-content: center;
    }
  `,
  zoneLeft: css`
    width: 140px;
    min-width: 140px;
    max-width: 140px;
    padding-left: 0.7em;
    overflow-y: scroll;
    ::-webkit-scrollbar {
      display: none; /* Safari and Chrome */
    }
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */

    ${mq['tablet']} {
      width: 300px;
      min-width: 300px;
      max-width: 300px;
    }
  `,
  zoneCenter: (theme: Theme) => css`
    flex-grow: 3;
    background-color: ${theme.colors.background};
    min-width: 200px;
    max-width: 425px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    overflow-y: scroll;
    ::-webkit-scrollbar {
      display: none; /* Safari and Chrome */
    }
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */

    ${mq['desktop']} {
      margin-left: 1em;
    }
  `,
  zoneRight: css`
    display: none;
    ${mq['hoverableDesktop']} {
      display: flex;
      width: 300px;
      min-width: 300px;
      max-width: 300px;
      flex-direction: column;
      padding: 1em 1em 1em 1em;
    }
  `,
  resourceButton: (theme: Theme) => css`
    background: ${theme.colors.background};
    border: 1px solid ${theme.colors.primary};
    width: 2.5em;
    height: 2.5em;
    position: fixed;
    bottom: 0.5em;
    left: 0.5em;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  caret: (theme: Theme) => css`
    font-size: 1.4em;
    color: ${theme.colors.primary};
  `,
  tabRow: css`
    font-size: 1em;
    overflow-y: auto;
    display: flex;
    flex-shrink: 0;
    height: 1em;
    width: 87%;
    margin-bottom: 1em;
    ::-webkit-scrollbar {
      display: none; /* Safari and Chrome */
    }
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */

    ${mq['tablet']} {
      justify-content: center;
      box-sizing: border-box;
      width: 100%;
    }
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
  separator: css`
    margin-left: 0.5em;
    padding-left: 0.5em;
    border-left: 1px solid black;
    height: 1em;
  `,
};
