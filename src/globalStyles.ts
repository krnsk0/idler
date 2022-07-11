import { css, keyframes } from '@emotion/react';
import { background } from './cssBackground';

export const globalStyles = css`
  body {
    margin: 0;
    font-family: 'Lekton', sans-serif;
    box-sizing: content-box;
    user-select: none;
    ${background}
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
  lightgrey: '#D1D1D1',
  darkgrey: '#383838',
  grey: 'grey',
  white: 'white',
  black: 'black',
};

const enter = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`;

export const animation = css`
  animation: ${enter} 0.3s linear;
`;
