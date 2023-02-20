import { observer } from 'mobx-react-lite';
import ZoneEntityButton from '../../../../shared/ZoneEntityButton/ZoneEntityButton';
import UpgradeTooltip from './UpgradeTooltip';
import { BaseUpgrade } from '../../../../../store/zone/upgrades/baseUpgrade';

interface UpgradeButtonProps {
  upgrade: BaseUpgrade;
}

function UpgradeButton({ upgrade }: UpgradeButtonProps) {
  if (!upgrade.unlocked) return null;

  const displayName = `${upgrade.displayName}${
    upgrade.isStorageConstrainted ? 'ᶜ' : ''
  }`;

  return (
    <ZoneEntityButton
      tooltip={<UpgradeTooltip upgrade={upgrade} />}
      onClick={() => upgrade.buy()}
      disabled={!upgrade.affordable || upgrade.purchased}
      showEntranceAnimation={upgrade.showEntranceAnimation()}
      buttonText={displayName}
      isButtonExpanded={upgrade.isExpanded}
      expandButton={() => upgrade.expandButton()}
    />
  );
}

export default observer(UpgradeButton);
