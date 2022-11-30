import { css } from '@emotion/react';
import { entranceAnimation } from '../../../globalStyles';

const titleOffset = '10px';

export const styles = {
  container: css`
    border: 1px solid black;
    padding: 0.6em 0.4em 0.5em 0.4em;
    margin-bottom: 1em;
    position: relative;
    top: ${titleOffset};
    height: calc(100% - ${titleOffset});
  `,
  animateEntrance: (duration: number) => css`
    animation: ${entranceAnimation} ${duration}ms ease;
  `,
  textContainer: css`
    position: absolute;
    width: calc(100% - 1.2em);
    top: calc(-${titleOffset});
    text-align: right;
    display: flex;
    justify-content: space-between;
  `,
  text: css`
    background: white;
  `,
};
