import { Theme, css, keyframes } from '@emotion/react';

const flash = (theme: Theme) => keyframes`
  0% {
    color: ${theme.colors.background};
  }
  100%{
    color: ${theme.colors.primary};
  }
`;

const bumpUp = keyframes`
  0% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(0);
  }
  45%{
    transform: translateY(0.6em);
  }
  100%{
    transform: translateY(0.3em);
  }
`;

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
    justify-content: flex-start;
    align-items: center;
  `,
  turretBoxHeader: css`
    margin-top: 0.5em;
    text-align: center;
  `,
  stateIcon: css`
    margin-top: 0.5em;
    text-align: center;
  `,
  stateBox: (theme: Theme) => css`
    height: 1em;
    // border: 1px solid ${theme.colors.primary};
    position: relative;
    width: 90%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-variant: small-caps;
    margin-bottom: 0.4em;
  `,
  turretBottom: css`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
  progressBarBox: (theme: Theme, showPointer: boolean) => css`
    margin-bottom: 0.3em;
    height: 1em;
    border: 1px solid ${theme.colors.primary};
    position: relative;
    width: 90%;
    cursor: ${showPointer ? 'pointer' : 'default'};
  `,
  progressBar: (theme: Theme) => css`
    position: absolute;
    height: 1em;
    width: 100%;
    background-color: ${theme.colors.progressBar};
  `,
  boxText: css`
    margin-top: 0.1em;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    z-index: 1;
    font-size: 0.8em;
  `,
  flasher: (theme: Theme) => css`
    animation: ${flash(theme)} 500ms ease infinite;
    background: ${theme.colors.background};
  `,
  bumpUp: css`
    animation: ${bumpUp} 1000ms linear;
  `,
};
