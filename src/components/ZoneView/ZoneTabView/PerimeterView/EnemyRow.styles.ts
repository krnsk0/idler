import { Theme, css } from '@emotion/react';
import { mq } from '../../../../globalStyles';

export const styles = {
  enemyRow: (theme: Theme) => css`
    height: 2em;
    border-bottom: 1px solid ${theme.colors.primary};
    display: flex;
    align-items: center;
    position: relative;
  `,

  enemyRowRight: css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    padding-right: 0.5em;
    margin-left: 0.5em;

    z-index: 1;
  `,
  caret: css`
    margin-left: 0.5em;
    z-index: 1;
    display: inherit;
    ${mq['desktop']} {
      display: none;
    }
  `,

  progressBar: (theme: Theme) => css`
    position: absolute;
    height: 2em;
    width: 100%;
    background-color: ${theme.colors.progressBar};
  `,
};
