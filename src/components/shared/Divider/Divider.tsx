import { observer } from 'mobx-react-lite';
import { styles } from './Divider.styles';

interface DividerProps {
  text: string;
  shown: boolean;
}

export const Divider = observer(({ text, shown }: DividerProps) => {
  return (
    <>
      <div css={styles.divider(shown)}>
        {text && (
          <div css={styles.dividerTextContainer}>
            {<span css={styles.dividerText}>{text}</span>}
          </div>
        )}
      </div>
    </>
  );
});
