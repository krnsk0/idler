import { observer } from 'mobx-react-lite';
import { Zone } from '../../store/zone/zone';
import { styles } from './ZoneView.styles';
import ResourceView from './ResourceView/ResourceView';
import { useState } from 'react';
import ShipColonyView from './ZoneTabView/ShipView/ShipColonyView';
import JobsView from './ZoneTabView/JobsView/JobsView';
import { useMediaQuery } from '../shared/useMediaQuery';
import { useStore } from '../../store/Provider';
import { RxChevronLeft, RxChevronRight } from 'react-icons/rx';

interface ZoneViewProps {
  zone: Zone;
}

enum ZoneTabNames {
  ACTIONS = 'ACTIONS',
  JOBS = 'JOBS',
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

  const { isTablet, isMobile } = useMediaQuery();

  const isResourcePaneOpen =
    zone.resources.unlocked && (isTablet || gui.isResourcePaneOpen);

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
          <div css={styles.zoneRight} id="zone-right">
            {(() => {
              switch (selectedTab) {
                case ZoneTabNames.ACTIONS:
                  return <ShipColonyView zone={zone} />;
                case ZoneTabNames.JOBS:
                  return <JobsView zone={zone} />;
                default:
                  throw new Error('should not reach this case');
              }
            })()}
          </div>
        </div>
      </div>
      {/* <div css={styles.tabRow}>
        {zone.jobs.unlocked && (
          <>
            <TabButton
              text="outpost"
              tabName={ZoneTabNames.ACTIONS}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
            <Separator />
            <TabButton
              text={`jobs${
                zone.jobs.unassigned > 0 ? ` (${zone.jobs.unassigned})` : ''
              }`}
              tabName={ZoneTabNames.JOBS}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
          </>
        )}
      </div> */}
      {isMobile && zone.resources.unlocked && (
        <button
          css={styles.resourceButton}
          type="button"
          onClick={() => gui.toggleResourcePane()}
        >
          {gui.isResourcePaneOpen ? (
            <RxChevronRight css={styles.caret} />
          ) : (
            <RxChevronLeft css={styles.caret} />
          )}
        </button>
      )}
    </>
  );
}

export default observer(ZoneView);
