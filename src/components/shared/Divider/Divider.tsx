import { observer } from 'mobx-react-lite';
import { styles } from './Divider.styles';

interface DividerProps {
  text?: string;
  width?: number;
}

export const Divider = observer(({ text, width }: DividerProps) => {
  return (
    <>
      <div css={styles.divider(!!text, width)}>
        {text && (
          <div css={styles.dividerTextContainer}>
            {<span css={styles.dividerText}>{text}</span>}
          </div>
        )}
      </div>
    </>
  );
});
