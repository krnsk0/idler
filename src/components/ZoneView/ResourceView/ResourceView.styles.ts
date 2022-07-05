import { css } from '@emotion/react';
import { colors } from '../../../colors';

export const styles = {
  resourcesContainer: css`
    display: flex;
    flex-direction: column;
    min-width: 250px;
  `,
  resourceRow: css`
    margin: 0.1em;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  `,
  quantityPerSecond: css`
    color: ${colors.grey};
  `,
  cap: css`
    color: ${colors.grey};
  `,
};
