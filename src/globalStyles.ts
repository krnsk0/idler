import { css, keyframes } from '@emotion/react';

export const globalStyles = css`
  body {
    margin: 0;
    font-family: 'Lekton', sans-serif;
    box-sizing: content-box;
    user-select: none;
  }
  #app {
    width: 100%;
    height: 100vh;
  }
  button {
    font-family: 'Lekton', sans-serif;
    font-size: 1em;
  }
`;

export const colors = {
  lightgrey: '#F1F1F1',
  mediumgrey: '#D1D1D1',
  mediumdarkgrey: '#919191',
  darkgrey: '#383838',
  grey: 'grey',
  white: 'white',
  black: 'black',
};

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

export const transitionDuration = '300ms';
