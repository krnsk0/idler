import { observer } from 'mobx-react-lite';
import { Zone } from '../../store/zone/zone';
import { styles } from './ZoneView.styles';
import ResourceView from './ResourceView/ResourceView';
import { useState } from 'react';
import ShipColonyView from './ZoneTabView/ShipView/ShipColonyView';
import JobsView from './ZoneTabView/JobsView/JobsView';

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

const Separator = () => <span css={styles.separator} />;

function ZoneView({ zone }: ZoneViewProps) {
  const [selectedTab, setSelectedTab] = useState<ZoneTabNames>(
    ZoneTabNames.ACTIONS,
  );

  const [resourcesOpen, setResourceOpen] = useState<boolean>(true);

  return (
    <>
      <div css={styles.zoneOuter} id="zone-outer">
        <h2 css={styles.zoneHeader}>{zone.name}</h2>
        {resourcesOpen && <ResourceView zone={zone} />}
        <div css={styles.tabViewContainer}>
          <div css={styles.tabContent} id="zone-view-tab-content">
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
      <div css={styles.tabRow}>
        <button
          css={styles.resourceButton}
          type="button"
          onClick={() => setResourceOpen(!resourcesOpen)}
        >
          RES
        </button>
        {zone.jobs.unlocked && (
          <>
            <TabButton
              text="colony"
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
      </div>
    </>
  );
}

export default observer(ZoneView);
