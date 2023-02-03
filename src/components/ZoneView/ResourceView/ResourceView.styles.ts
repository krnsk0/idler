import { css, keyframes } from '@emotion/react';
import { colors, mq } from '../../../globalStyles';

export const styles = {
  powerRow: css`
    margin: 0.1em;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `,
  paneContainer: css`
    display: flex;
    flex-direction: column;
  `,
  powerContainer: css`
    display: flex;
    flex-direction: column;
  `,
  resourcesContainer: css`
    display: flex;
    flex-direction: column;
    margin-bottom: 0.4em;
    ${mq['tablet']} {
      margin-bottom: 0em;
    }
  `,
};
