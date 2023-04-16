import { css, keyframes } from '@emotion/react';
import { mq } from '../../../globalStyles';

export const styles = {
  paneContainer: css`
    display: flex;
    flex-direction: column;
    gap: 0.2em;
  `,
  powerRow: css`
    margin: 0.1em;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `,
  radarRow: css`
    margin: 0.1em;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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
  radarContainer: css`
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
