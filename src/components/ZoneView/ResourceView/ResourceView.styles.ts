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
    margin-bottom: 1em;

    font-size: 0.95em;
    ${mq['tablet']} {
      font-size: 1em;
    }
  `,
  resourcesContainer: css`
    display: flex;
    flex-direction: column;
    gap: 0.4em;

    ${mq['tablet']} {
      gap: 0em;
    }

    font-size: 0.95em;
    ${mq['tablet']} {
      font-size: 1em;
    }
  `,
  tabletOnly: css`
    display: none;
    ${mq['tablet']} {
      display: inherit;
    }
  `,
};
