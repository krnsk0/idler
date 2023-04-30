import { Theme, css } from '@emotion/react';

export const styles = {
  turretBox: (theme: Theme) => css`
    width: 5em;
    height: 8em;
    border: 1px solid ${theme.colors.primary};
  `,
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
};
