import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Zone } from '../../../store/zone/zone';
import JobsView from './JobsView/JobsView';
import ShipColonyView from './ShipView/ShipColonyView';
import { styles } from './ZoneTabView.styles';

interface ZoneTabViewProps {
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

const ZoneTabView = ({ zone }: ZoneTabViewProps) => {
  const [selectedTab, setSelectedTab] = useState<ZoneTabNames>(
    ZoneTabNames.ACTIONS,
  );

  return (
    <div css={styles.tabViewContainer}>
      <div css={styles.tabRow}>
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
  );
};

export default observer(ZoneTabView);
