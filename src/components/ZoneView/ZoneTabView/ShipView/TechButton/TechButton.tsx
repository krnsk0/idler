import { observer } from 'mobx-react-lite';
import { reaction } from 'mobx';
import { useEffect, useState } from 'react';
import { useStore } from '../../../../../store/Provider';
import ZoneEntityButton from '../../../../shared/ZoneEntityButton/ZoneEntityButton';
import { BaseTech } from '../../../../../store/tech/baseTech';
import {
  TooltipDivider,
  TooltipText,
} from '../../../../shared/Tooltip/Tooltip';
import { formatNumber } from '../../../../../utils/formatNumber';

interface TechButtonProps {
  tooltipPosition: 'LEFT' | 'RIGHT';
}

function TechButton({ tooltipPosition }: TechButtonProps) {
  const root = useStore();
  const selectedTech = root.game.tech.selectedTech;
  const noTechAvailable = root.game.tech.noTechAvailable;
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
        if (
          !selectedTech &&
          previousSelectedTech &&
          previousSelectedTech.researched
        ) {
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
      tooltipPosition={tooltipPosition}
      tooltip={
        <>
          {noTechAvailable && (
            <TooltipText italic={true} align={'center'}>
              the ship sleeps
            </TooltipText>
          )}
          {selectedTech && (
            <>
              {root.game.initialZone.power.blackout && (
                <>
                  <TooltipText align={'center'}>
                    *no power, progress stalled
                  </TooltipText>
                  <TooltipDivider />
                </>
              )}
              <TooltipText align={'center'}>
                {formatNumber(selectedTech.power, { digits: 0 })} of{' '}
                {formatNumber(selectedTech.powerCost)} power
              </TooltipText>
              <TooltipDivider />
              <TooltipText align={'center'} italic={true}>
                click to change target
              </TooltipText>
            </>
          )}
          {!selectedTech && !noTechAvailable && (
            <TooltipText italic={true} align={'center'}>
              to what end should ship turn its contemplation?
            </TooltipText>
          )}
        </>
      }
      onClick={() => {
        root.gui.openTechModal();
      }}
      progress={selectedTech?.progress ?? 0}
      disabled={noTechAvailable}
      showEntranceAnimation={root.game.tech.showEntranceAnimation}
      buttonText={(() => {
        if (selectedTech) {
          return `${selectedTech.displayName}${
            root.game.initialZone.power.blackout ? '*' : ''
          }
            `;
        }
        if (didJustFinishResearch) {
          return `research complete`;
        }
        if (noTechAvailable) {
          return `no new tech`;
        }
        return `databanks`;
      })()}
    />
  );
}

export default observer(TechButton);
