import { Theme, css, keyframes } from '@emotion/react';
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
  perimeterContainer: css`
    margin-top: 1em;
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
  integrityBox: (theme: Theme) => css`
    margin-top: 0.5em;
    height: 1em;
    border: 1px solid ${theme.colors.primary};
    position: relative;
    width: 99%;
  `,
  progressBar: (theme: Theme) => css`
    position: absolute;
    height: 1em;
    width: 100%;
    background-color: ${theme.colors.progressBar};
  `,
  integrityText: css`
    margin-top: 0.1em;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    z-index: 1;
  `,
};
