import { css } from '@emotion/react';
import { animation } from '../../../../globalStyles';

const titleOffset = '10px';

export const styles = {
  container: css`
    border: 1px solid black;
    padding: 0.6em 0.4em 0.5em 0.4em;
    margin-top: 0.5em;
    margin-bottom: 1em;
    position: relative;
    top: ${titleOffset};
    height: calc(100% - ${titleOffset});
  `,
  newContainer: css`
    ${animation};
  `,
  containerTitle: css`
    position: absolute;
    top: calc(-${titleOffset});
    background: white;
  `,
};
