import { Theme, css } from '@emotion/react';
import { mq } from '../../../../globalStyles';

export const styles = {
  perimeterContainer: css`
    padding-top: 0.65em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  `,

  enemyBoxHeader: css`
    width: 90%;
    display: flex;
    justify-content: space-between;
  `,
  enemyBox: (theme: Theme) => css`
    border: 1px solid ${theme.colors.primary};
    width: 90%;
    height: 15.5em;
    overflow-y: scroll;
    ::-webkit-scrollbar {
      display: none; /* Safari and Chrome */
    }
    -ms-overflow-style: none; /* Internet Explorer 10+ */
    scrollbar-width: none; /* Firefox */
  `,
};
