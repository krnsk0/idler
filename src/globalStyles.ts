import { css, keyframes, Theme } from '@emotion/react';

export const lightTheme: Theme = {
  colors: {
    background: 'white',
    primary: 'black',
    secondary: '#808080',
    disabled: '#919191',
    progressBar: '#D1D1D1',
  },
};

export const darkTheme: Theme = {
  colors: {
    background: '#323232',
    primary: '#EFEFEF',
    secondary: '#A0A0A0',
    disabled: '#919191',
    progressBar: '#818181',
  },
};

export const globalStyles = (theme: Theme) => css`
  html,
  body {
    overflow: hidden;
    overscroll-behavior: none;
  }

  body {
    margin: 0;
    font-family: 'Lekton', sans-serif;
    box-sizing: content-box;
    user-select: none;
    touch-action: manipulation;
    text-size-adjust: none;
  }

  button {
    font-family: 'Lekton', sans-serif;
    font-size: 1em;
    color: ${theme.colors.primary};
    padding: none;
    -webkit-tap-highlight-color: transparent;
  }

  svg {
    width: 100%;
    height: 100%;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  div,
  span {
    color: ${theme.colors.primary};
  }
`;

export const entranceAnimation = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.5, 0.5);
  }
  100%{
    opacity: 1;
    transform: scale(1, 1);
  }
`;

export const breakpoints = {
  tablet: 600,
  // anything less than 1060 tends to flex-wrap the center area
  desktop: 1060,
} as const;

export const mq = {
  tablet: `@media (min-width: ${breakpoints.tablet}px)`,
  desktop: `@media (min-width: ${breakpoints.desktop}px)`,
  hoverableDesktop: `@media (min-width: ${breakpoints.desktop}px) and (hover: hover)`,
  landscape: `@media (orientation: landscape)`,
} as const;

export const entranceAnimationDuration = 300;
