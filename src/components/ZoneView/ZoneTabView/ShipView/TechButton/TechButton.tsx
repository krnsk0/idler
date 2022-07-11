import { observer } from 'mobx-react-lite';
import { reaction } from 'mobx';
import { useEffect, useState } from 'react';
import { useStore } from '../../../../../store/Provider';
import ZoneEntityButton from '../../../../shared/ZoneEntityButton/ZoneEntityButton';
import { BaseTech } from '../../../../../store/tech/baseTech';
import { styles } from './TechButton.styles';

function TechButton() {
  const root = useStore();
  const selectedTech = root.game.tech.selectedTech;
  const anyTechAvailable = root.game.tech.anyTechAvailable;
  const [didJustFinishResearch, setDidJustFinishResearch] = useState(false);

  /**
   * When research finishes, say so, but only for a bit
   */
  useEffect(() => {
    return reaction(
      () => {
        return root.game.tech.selectedTech;
      },
      (
        selectedTech: BaseTech | undefined,
        previousSelectedTech: BaseTech | undefined,
      ) => {
        if (!selectedTech && previousSelectedTech) {
          setDidJustFinishResearch(true);
          setTimeout(() => {
            setDidJustFinishResearch(false);
          }, 2000);
        }
      },
    );
  }, [root]);

  if (!root.game.tech.unlocked) return null;

  return (
    <ZoneEntityButton
      onClick={() => {
        root.gui.openTechModal();
      }}
      progress={selectedTech?.progress ?? 0}
      disabled={!anyTechAvailable}
    >
      {(() => {
        if (selectedTech) {
          return (
            <>
              <div>{selectedTech.displayName}</div>
              {root.game.zones[0].power.production === 0 && (
                <div css={styles.noPower}>no power</div>
              )}
            </>
          );
        }
        if (didJustFinishResearch) {
          return <div>research complete</div>;
        }
        if (!anyTechAvailable) {
          return <div>no new tech available</div>;
        }
        return <div>pick research target</div>;
      })()}
    </ZoneEntityButton>
  );
}

export default observer(TechButton);
