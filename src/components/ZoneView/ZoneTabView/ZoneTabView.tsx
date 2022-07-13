import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Zone } from '../../../store/zone/zone';
import ProductionView from './ProductionView/ProductionView';
import ActionView from './ShipView/ActionView';
import { styles } from './ZoneTabView.styles';

interface ZoneTabViewProps {
  zone: Zone;
}

enum ZoneTabNames {
  ACTIONS = 'ACTIONS',
  PRODUCITON = 'PRODUCTION',
  WORKERS = 'WORKERS'
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
        {zone.producers.anyUnlocked && (
          <TabButton
            text="Crashed Ship"
            tabName={ZoneTabNames.ACTIONS}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        )}

        {zone.producers.anyUnlocked && (
          <>
            <Separator />
            <TabButton
              text="Production"
              tabName={ZoneTabNames.PRODUCITON}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
          </>
        )}


      </div>
      <div css={styles.tabContent}>
        {(() => {
          switch (selectedTab) {
            case ZoneTabNames.ACTIONS:
              return <ActionView zone={zone} />;
            case ZoneTabNames.PRODUCITON:
              return <ProductionView zone={zone} />;
            default:
              throw new Error('should not reach this case');
          }
        })()}
      </div>
    </div>
  );
};

export default observer(ZoneTabView);
