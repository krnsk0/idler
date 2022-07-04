import { observer } from 'mobx-react-lite';
import { useState } from 'react';
import { Zone } from '../../../store/zone/zone';
import ProductionView from '../ProductionView/ProductionView';
import ShipView from './ShipView/ShipView';
import { styles } from './ZoneTabView.styles';

interface ZoneTabViewProps {
  zone: Zone;
}

enum ZoneTabNames {
  Ship = 'Ship',
  Production = 'Production',
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
    ZoneTabNames.Ship,
  );

  return (
    <div css={styles.tabViewContainer}>
      <div css={styles.tabRow}>
        <TabButton
          text="Crashed Ship"
          tabName={ZoneTabNames.Ship}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />

        <Separator />
        <TabButton
          text="Production"
          tabName={ZoneTabNames.Production}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
      </div>
      <div css={styles.tabContent}>
        {(() => {
          switch (selectedTab) {
            case ZoneTabNames.Ship:
              return <ShipView />;
            case ZoneTabNames.Production:
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
