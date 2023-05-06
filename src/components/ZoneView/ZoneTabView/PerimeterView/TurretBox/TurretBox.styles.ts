import { Theme, css } from '@emotion/react';

export const styles = {
  emptyTurretBox: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  `,
  invisiblePlaceholder: css`
    opacity: 0;
    cursor: default;
  `,
  constructEmplacementBox: (theme: Theme, affordable: boolean) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: ${affordable ? 'pointer' : 'default'};
    border: 1px solid
      ${affordable ? theme.colors.primary : theme.colors.disabled};
    color: 1px solid
      ${affordable ? theme.colors.primary : theme.colors.disabled};

    div {
      color: ${affordable ? theme.colors.primary : theme.colors.disabled};
    }
  `,
  plusSign: css`
    font-size: 1.5em;
    margin-bottom: -0.2em;
  `,
  fortifyHeader: css`
    font-size: 0.8em;
    text-align: center;
  `,
  costDisplay: css`
    margin-top: 0.5em;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 0.8em;
  `,
  costHeader: css`
    margin-top: 0.2em;
  `,
  turretBox: (theme: Theme) => css`
    width: 5em;
    max-width: 5em;
    height: 8em;
    border: 1px solid ${theme.colors.primary};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  `,

  turretTop: css`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  turretBoxHeader: css`
    margin-top: 0.5em;
    text-align: center;
  `,

  turretBottom: css`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,

  ammoDisplay: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 0.8em;
  `,
  progressBarBox: (theme: Theme) => css`
    margin-bottom: 0.3em;
    height: 1em;
    border: 1px solid ${theme.colors.primary};
    position: relative;
    width: 90%;
  `,
  progressBar: (theme: Theme) => css`
    position: absolute;
    height: 1em;
    width: 100%;
    background-color: ${theme.colors.progressBar};
  `,
  boxText: css`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    z-index: 1;
    font-variant: small-caps;
  `,
};
