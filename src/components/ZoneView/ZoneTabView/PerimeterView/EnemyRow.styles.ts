import { Theme, css, keyframes } from '@emotion/react';
import { mq } from '../../../../globalStyles';

const bump = keyframes`
  0% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(0);
  }
  45%{
    transform: translateY(-0.4em);
  }
  100%{
    transform: translateY(-0.2em);
  }
`;

export const styles = {
  noBottomBorder: css`
    border-bottom: none;
  `,
  enemyRow: (theme: Theme) => css`
    height: 2em;
    border-bottom: 1px solid ${theme.colors.primary};
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
    ${mq['hoverableDesktop']} {
      cursor: default;
      border-bottom: 1px solid ${theme.colors.primary};
    }
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
  expandedResourceTooltip: (theme: Theme) => css`
    ${mq['hoverableDesktop']} {
      display: none;
    }
    color: ${theme.colors.secondary};
    font-size: 0.8em;
    padding: 1em 0.5em 0.5em 0.5em;
    border-bottom: 1px solid ${theme.colors.primary};
  `,
  bump: css`
    animation: ${bump} 1000ms linear;
  `,
  dead: (theme: Theme) => css`
    height: 2em;
    border-bottom: 1px solid ${theme.colors.primary};
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    padding-left: 0.5em;
    padding-right: 0.5em;
    cursor: inherit;
  `,
  collect: (theme: Theme) => css`
    cursor: pointer;
    border: 1px solid ${theme.colors.primary};
    font-size: 0.8em;
    padding-left: 0.2em;
    padding-right: 0.2em;
  `,
};
