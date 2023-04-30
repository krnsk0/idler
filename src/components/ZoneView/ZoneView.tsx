import { observer } from 'mobx-react-lite';
import { Zone } from '../../store/zone/zone';
import { styles } from './ZoneView.styles';
import ZoneLeftPane from './ZoneLeftPane/ZoneLeftPane';
import ShipColonyView from './ZoneTabView/ShipView/ShipColonyView';
import JobsView from './ZoneTabView/JobsView/JobsView';
import { useMediaQuery } from '../shared/useMediaQuery';
import { useStore } from '../../store/Provider';
import { TooltipContainerId } from '../shared/Tooltip/Tooltip';
import UpgradeView from './ZoneTabView/UpgradeView/UpgradeView';
import PerimeterView from './ZoneTabView/PerimeterView/PerimeterView';
import { ZoneTabNames } from '../../store/gui/gui';

interface ZoneViewProps {
  zone: Zone;
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

  const { isDesktop, isMobile } = useMediaQuery();

  const isResourcePaneOpen = isDesktop || gui.isResourcePaneOpen;

  const isTabRowUnlocked =
    zone.jobs.unlocked || zone.upgrades.unlocked || zone.perimeter.unlocked;

  return (
    <>
      <div css={styles.zoneOuter}>
        <div css={styles.zoneHeader}>
          <h2>{zone.name}</h2>
        </div>
        <div css={styles.zoneColumns}>
          {isResourcePaneOpen && (
            <div css={styles.zoneLeft}>{<ZoneLeftPane zone={zone} />}</div>
          )}
          <div css={styles.zoneCenter} id="zone-right">
            {isTabRowUnlocked && (
              <div css={styles.tabRow}>
                <TabButton
                  text="outpost"
                  tabName={ZoneTabNames.ACTIONS}
                  selectedTab={gui.selectedTab}
                  setSelectedTab={() => gui.selectTab(ZoneTabNames.ACTIONS)}
                />
                <span css={styles.separator} />
                <TabButton
                  text={`jobs${
                    zone.jobs.unassigned > 0 ? ` (${zone.jobs.unassigned})` : ''
                  }`}
                  tabName={ZoneTabNames.JOBS}
                  selectedTab={gui.selectedTab}
                  setSelectedTab={() => gui.selectTab(ZoneTabNames.JOBS)}
                />
                {zone.upgrades.unlocked && (
                  <>
                    <span css={styles.separator} />
                    <TabButton
                      text="improvements"
                      tabName={ZoneTabNames.UPGRADES}
                      selectedTab={gui.selectedTab}
                      setSelectedTab={() =>
                        gui.selectTab(ZoneTabNames.UPGRADES)
                      }
                    />
                  </>
                )}
                {zone.perimeter.unlocked && (
                  <>
                    <span css={styles.separator} />
                    <TabButton
                      text="perimeter"
                      tabName={ZoneTabNames.PERIMETER}
                      selectedTab={gui.selectedTab}
                      setSelectedTab={() =>
                        gui.selectTab(ZoneTabNames.PERIMETER)
                      }
                    />
                  </>
                )}
              </div>
            )}
            <div css={styles.scrollableZoneRight}>
              {(() => {
                switch (gui.selectedTab) {
                  case ZoneTabNames.ACTIONS:
                    return <ShipColonyView zone={zone} />;
                  case ZoneTabNames.JOBS:
                    return <JobsView zone={zone} />;
                  case ZoneTabNames.UPGRADES:
                    return <UpgradeView zone={zone} />;
                  case ZoneTabNames.PERIMETER:
                    return <PerimeterView zone={zone} />;
                  default:
                    throw new Error('should not reach this case');
                }
              })()}
            </div>
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
