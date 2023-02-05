import { observer } from 'mobx-react-lite';
import { styles } from './Divider.styles';

interface DividerProps {
  text: string;
  shown: boolean;
  showEntranceAnimation: boolean;
}

export const Divider = observer(
  ({ text, shown, showEntranceAnimation }: DividerProps) => {
    if (!shown) return null;
    return (
      <>
        <div
          css={[
            styles.divider,
            showEntranceAnimation && styles.animateEntrance,
          ]}
        >
          {text && (
            <div css={styles.dividerTextContainer}>
              {<span css={styles.dividerText}>{text}</span>}
            </div>
          )}
        </div>
      </>
    );
  },
);
