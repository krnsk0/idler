import { observer } from 'mobx-react-lite';
import { Zone } from '../../../../store/zone/zone';
import { Divider } from '../../../shared/Divider/Divider';
import UpgradeButton from './UpgradeButton/UpgradeButton';
import { styles } from './UpgradeView.styles';
import { ZoneEntityButtonSpacer } from '../../../shared/ZoneEntityButton/ZoneEntityButton';
import { useStore } from '../../../../store/Provider';

interface UpgradeViewProps {
  zone: Zone;
}

function UpgradeView({ zone }: UpgradeViewProps) {
  const root = useStore();

  return (
    <>
      <div css={styles.upgradeOuter} id="ship-view-outer">
        <Divider
          text={'available'}
          shown={true}
          showEntranceAnimation={zone.upgrades.showEntranceAnimation()}
        />
        <div css={styles.upgradeColumnWrap} id="ship-column-wrap">
          {zone.upgrades.availableAsArray.map((upgrade) => {
            return <UpgradeButton upgrade={upgrade} key={upgrade.name} />;
          })}
          {zone.upgrades.availableAsArray.length > 1 && (
            <ZoneEntityButtonSpacer />
          )}
          {zone.upgrades.availableAsArray.length === 0 && (
            <em css={styles.message}>all available upgrades purchased</em>
          )}
        </div>
      </div>
      <div css={styles.upgradeOuter} id="ship-view-outer">
        <Divider
          text={'purchased'}
          shown={true}
          showEntranceAnimation={zone.upgrades.showEntranceAnimation()}
        />
        <div css={styles.upgradeColumnWrap} id="ship-column-wrap">
          {zone.upgrades.purchasedAsArray.map((upgrade) => {
            return <UpgradeButton upgrade={upgrade} key={upgrade.name} />;
          })}
          {zone.upgrades.purchasedAsArray.length > 1 && (
            <ZoneEntityButtonSpacer />
          )}
          {zone.upgrades.purchasedAsArray.length === 0 && (
            <em css={styles.message}>no upgrades purchased</em>
          )}
        </div>
      </div>
    </>
  );
}

export default observer(UpgradeView);
