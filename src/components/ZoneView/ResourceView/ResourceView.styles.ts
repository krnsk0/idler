import { css } from '@emotion/react';
import { colors } from '../../../globalStyles';

export const styles = {
  paneContainer: css`
    display: flex;
    min-width: 300px;
    flex-direction: column;
    height: 100%;
  `,
  resourcesContainer: css`
    display: flex;
    flex-direction: column;
  `,
  resourceRow: css`
    margin: 0.1em;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `,
  quantityContainer: css`
    display: flex;
    min-width: 75px;
    justify-content: space-between;
  `,
  quantityPerSecond: css`
    color: ${colors.grey};
  `,
  cap: css`
    color: ${colors.grey};
  `,
};
