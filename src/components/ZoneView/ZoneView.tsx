import { observer } from 'mobx-react-lite';
import { Zone } from '../../store/zone/zone';
import { styles } from './ZoneView.styles';
import ResourceView from './ResourceView/ResourceView';
import { useState } from 'react';
import ShipColonyView from './ZoneTabView/ShipView/ShipColonyView';
import JobsView from './ZoneTabView/JobsView/JobsView';
import { useMediaQuery } from '../shared/useMediaQuery';
import { useStore } from '../../store/Provider';
import { TooltipContainerId } from '../shared/Tooltip/Tooltip';
import UpgradeView from './ZoneTabView/UpgradeView/UpgradeView';

interface ZoneViewProps {
  zone: Zone;
}

enum ZoneTabNames {
  ACTIONS = 'ACTIONS',
  JOBS = 'JOBS',
  UPGRADES = 'UPGRADES',
}

const TabButton = ({
  text,
  selectedTab,
  setSelectedTab,
  tabName,
}: {
  text: string;
  selectedTab: ZoneTabNames;
  setSelectedTab: React.Dispatch<React.SetStateAction<ZoneTabNames>>;
  tabName: ZoneTabNames;
}) => {
  return (
    <button
      type="button"
      onClick={() => setSelectedTab(tabName)}
      css={styles.tabButton(selectedTab === tabName)}
    >
      {text}
    </button>
  );
};

function ZoneView({ zone }: ZoneViewProps) {
  const { gui } = useStore();

  const [selectedTab, setSelectedTab] = useState<ZoneTabNames>(
    ZoneTabNames.ACTIONS,
  );

  const { isDesktop, isMobile } = useMediaQuery();

  const isResourcePaneOpen = isDesktop || gui.isResourcePaneOpen;

  return (
    <>
      <div css={styles.zoneOuter}>
        <div css={styles.zoneHeader}>
          <h2>{zone.name}</h2>
        </div>
        <div css={styles.zoneColumns}>
          {isResourcePaneOpen && (
            <div css={styles.zoneLeft}>{<ResourceView zone={zone} />}</div>
          )}
          <div css={styles.zoneCenter} id="zone-right">
            <div css={styles.tabRow}>
              {zone.jobs.unlocked && (
                <>
                  <TabButton
                    text="outpost"
                    tabName={ZoneTabNames.ACTIONS}
                    selectedTab={selectedTab}
                    setSelectedTab={setSelectedTab}
                  />
                  <div css={styles.separator} />
                  <TabButton
                    text={`jobs${
                      zone.jobs.unassigned > 0
                        ? ` (${zone.jobs.unassigned})`
                        : ''
                    }`}
                    tabName={ZoneTabNames.JOBS}
                    selectedTab={selectedTab}
                    setSelectedTab={setSelectedTab}
                  />
                  {zone.upgrades.unlocked && (
                    <>
                      <div css={styles.separator} />
                      <TabButton
                        text="improvements"
                        tabName={ZoneTabNames.UPGRADES}
                        selectedTab={selectedTab}
                        setSelectedTab={setSelectedTab}
                      />
                    </>
                  )}
                </>
              )}
            </div>
            {(() => {
              switch (selectedTab) {
                case ZoneTabNames.ACTIONS:
                  return <ShipColonyView zone={zone} />;
                case ZoneTabNames.JOBS:
                  return <JobsView zone={zone} />;
                case ZoneTabNames.UPGRADES:
                  return <UpgradeView zone={zone} />;
                default:
                  throw new Error('should not reach this case');
              }
            })()}
          </div>
          <div css={styles.zoneRight} id={TooltipContainerId}></div>
        </div>
      </div>
      {isMobile && zone.resources.unlocked && (
        <button
          css={styles.resourceButton}
          type="button"
          onClick={() => gui.toggleResourcePane()}
        >
          <div
            css={styles.caret}
            style={{
              transform: !gui.isResourcePaneOpen ? 'rotate(180deg)' : 'none',
            }}
          >
            {'>'}
          </div>
        </button>
      )}
    </>
  );
}

export default observer(ZoneView);
