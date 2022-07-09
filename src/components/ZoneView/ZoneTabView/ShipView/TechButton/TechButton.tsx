import { observer } from 'mobx-react-lite';
import { reaction } from 'mobx';
import { useEffect, useState } from 'react';
import { useStore } from '../../../../../store/Provider';
import ZoneEntityButton from '../../../../shared/ZoneEntityButton/ZoneEntityButton';
import { BaseTech } from '../../../../../store/tech/baseTech';

function TechButton() {
  const root = useStore();
  const selectedTech = root.tech.selectedTech;
  const [didJustFinishResearch, setDidJustFinishResearch] = useState(false);

  /**
   * When research finishes, say so, but only for a bit
   */
  useEffect(() => {
    return reaction(
      () => {
        return root.tech.selectedTech;
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

  if (!root.tech.unlocked) return null;

  return (
    <ZoneEntityButton
      tooltipTop={12}
      tooltipLeft={190}
      tooltip={<>test</>}
      onClick={() => {
        root.gui.openTechModal();
      }}
      progress={selectedTech?.progress ?? 0}
    >
      {(() => {
        if (selectedTech) {
          return <div>{selectedTech.displayName}</div>;
        }
        if (didJustFinishResearch) {
          return <div>research complete</div>;
        } else {
          return <div>pick compute target</div>;
        }
      })()}
    </ZoneEntityButton>
  );
}

export default observer(TechButton);
