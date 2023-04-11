import { css, Theme } from '@emotion/react';
import { mq } from '../../../../../globalStyles';

const buttonCommon = css`
  background: none;
  border: none;
  outline: 1px solid grey;
  margin-left: 0.2em;
  max-height: 1em;
  max-width 1em;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0em 0.3em 0em 0.3em;


  &:enabled {
    outline: 1px solid black;
  }

  &:hover:enabled {
    outline: 1.5px solid black;
  }
`;

export const styles = {
  jobRowOuter: css`
    display: flex;
    flex-direction: column;
  `,
  jobRowInner: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.1em;
  `,
  name: css`
    width: 6em;
  `,
  workers: css`
    width: 2em;
  `,
  buttons: css`
    margin-left: 0em;
    width: 4em;
    display: flex;
    flex-direction: row;
  `,
  inc: css`
    ${buttonCommon}
  `,
  dec: css`
    ${buttonCommon}
  `,
  expand: css`
    background: none;
    border: none;
    width: 2em;
    padding: none;

    ${mq['desktop']} {
      visibility: hidden;
    }
  `,
  invisibleOnDesktop: css`
    ${mq['hoverableDesktop']} {
      display: none;
    }
  `,
  expandedJobTooltip: (theme: Theme) => css`
    width: 15em;
    color: ${theme.colors.secondary};
    font-size: 0.8em;
    padding: 0 1em 1em;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
  `,
};
