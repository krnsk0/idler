import { observer } from 'mobx-react-lite';
import { styles } from './Divider.styles';

interface DividerProps {
  text?: string;
  width?: number;
  shown: boolean;
}

export const Divider = observer(({ text, width, shown }: DividerProps) => {
  return (
    <>
      <div css={styles.divider(!!text, width, shown)}>
        {text && (
          <div css={styles.dividerTextContainer}>
            {<span css={styles.dividerText}>{text}</span>}
          </div>
        )}
      </div>
    </>
  );
});
