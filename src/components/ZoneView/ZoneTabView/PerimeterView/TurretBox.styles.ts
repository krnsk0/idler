import { Theme, css } from '@emotion/react';

export const styles = {
  turretBox: (theme: Theme) => css`
    width: 5.2em;
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
  constructEmplacementBox: css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  `,
  plusSign: css`
    font-size: 2em;
    margin-bottom: -0.3em;
  `,
};
