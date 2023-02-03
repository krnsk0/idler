import { observer } from 'mobx-react-lite';
import { styles } from './Divider.styles';

interface DividerProps {
  text: string;
  shown: boolean;
  showEntranceAnimation: boolean;
  entranceAnimationDuration: number;
}

export const Divider = observer(
  ({
    text,
    shown,
    showEntranceAnimation,
    entranceAnimationDuration,
  }: DividerProps) => {
    if (!shown) return null;
    return (
      <>
        <div
          css={[
            styles.divider,
            showEntranceAnimation &&
              styles.animateEntrance(entranceAnimationDuration),
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
