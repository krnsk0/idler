import { css, Theme } from '@emotion/react';
import {
  entranceAnimation,
  entranceAnimationDuration,
  mq,
} from '../../../globalStyles';

export const styles = {
  tooltipDivider: (theme: Theme, largeMargin: boolean) => css`
    border-top: 1px solid;
    width: 100%;
    margin-top: ${largeMargin ? '1.4em' : '0.8em'};
    padding-top: 0.8em;
    position: relative;
    color: ${theme.colors.secondary};
  `,
  animateEntrance: css`
    animation: ${entranceAnimation} ${entranceAnimationDuration}ms ease;
  `,
  tooltipDividerTextContainer: css`
    position: absolute;
    top: -0.7em;
    text-align: center;
    width: 100%;
  `,
  tooltipDividerText: (theme: Theme) => css`
    background-color: ${theme.colors.background};
    padding: 0em 0.4em 0em 0.4em;
  `,
  tooltipText: (
    italic: boolean | undefined,
    align: 'left' | 'center' | 'right' | undefined,
    largeBottomMargin?: boolean,
  ) => css`
    width: 100%;
    text-align: ${!align ? 'left' : align};
    font-style: ${!italic ? 'inherit' : 'italic'};
    margin-bottom: ${largeBottomMargin ? '1.5em' : '1em'};
  `,
  tooltipTitle: css`
    width: 100%;
    text-align: center;
    margin-bottom: 1em;

    display: none;
    ${mq['hoverableDesktop']} {
      display: inherit;
    }
  `,
  desktopTooltipDivider: (theme: Theme) => css`
    border-top: 1px solid;
    width: 100%;
    padding-top: 0.8em;
    position: relative;
    color: ${theme.colors.secondary};

    display: none;
    ${mq['hoverableDesktop']} {
      display: inherit;
    }
  `,
};
