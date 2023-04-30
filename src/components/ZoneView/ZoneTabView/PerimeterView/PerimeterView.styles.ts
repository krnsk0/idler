import { Theme, css } from '@emotion/react';

export const styles = {
  perimeterContainer: css`
    padding-top: 0.65em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  `,
  emptyPerimeterMessage: css`
    width: 80%;
    display: flex;
    justify-content: space-between;
  `,
  enemyBox: (theme: Theme) => css`
    border: 1px solid ${theme.colors.primary};
    width: 90%;
    height: 16em;
    overflow-y: scroll;
    ::-webkit-scrollbar {
      display: none; /* Safari and Chrome */
    }
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */
  `,
  emptyEnemyBox: css`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  integrityHeader: css`
    margin-top: 1em;
  `,
  integrityBox: (theme: Theme) => css`
    height: 2em;
    border: 1px solid ${theme.colors.primary};
    position: relative;
    width: 90%;
  `,
  progressBar: (theme: Theme) => css`
    position: absolute;
    height: 2em;
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
  turretHeader: css`
    margin-top: 1em;
  `,
  turretContainer: css`
    padding-top: 0.5em;
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.5em;
  `,
  turretBox: (theme: Theme) => css`
    width: 5em;
    height: 8em;
    border: 1px solid ${theme.colors.primary};
  `,
};
