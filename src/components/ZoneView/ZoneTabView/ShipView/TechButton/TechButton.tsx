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

interface TechButtonProps {}

function TechButton({}: TechButtonProps) {
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
      tooltip={
        <>
          <>
            <TooltipText align={'center'}>databanks</TooltipText>
            <TooltipDivider />
          </>
          {noTechAvailable && (
            <TooltipText italic={true} align={'center'}>
              the ship sleeps
            </TooltipText>
          )}
          {selectedTech && (
            <>
              <TooltipText
                align={'center'}
                italic={true}
                largeBottomMargin={true}
              >
                click to change research target
              </TooltipText>
              {root.game.initialZone.power.blackout && (
                <>
                  <TooltipText align={'center'}>
                    *no power, progress stalled
                  </TooltipText>
                </>
              )}
              <TooltipText align={'center'}>
                {formatNumber(selectedTech.power, { digits: 0 })} of{' '}
                {formatNumber(selectedTech.powerCost, { digits: 0 })} power
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
      showEntranceAnimation={root.game.tech.showEntranceAnimation()}
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
      isButtonExpanded={root.game.tech.isExpanded}
      expandButton={() => root.game.tech.expandButton()}
    />
  );
}

export default observer(TechButton);
