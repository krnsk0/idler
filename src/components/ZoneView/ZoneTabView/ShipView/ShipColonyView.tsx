import { observer } from 'mobx-react-lite';
import { Zone } from '../../../../store/zone/zone';
import TechButton from './TechButton/TechButton';
import ActionButton from './ActionButton/ActionButton';
import { ActionNames } from '../../../../store/zone/actions/actionNames';
import { Divider } from '../../../shared/Divider/Divider';
import BuildingButton from './BuildingButton/BuildingButton';
import { styles } from './ShipColonyView.styles';
import { ZoneEntityButtonSpacer } from '../../../shared/ZoneEntityButton/ZoneEntityButton';
import { useStore } from '../../../../store/Provider';

interface ShipViewProps {
  zone: Zone;
}

function ShipColonyView({ zone }: ShipViewProps) {
  const root = useStore();

  return (
    <>
      <div css={styles.shipOuter} id="ship-view-outer">
        <Divider
          text={'crashed ship'}
          shown={zone.buildings.unlocked}
          showEntranceAnimation={zone.buildings.showEntranceAnimation()}
        />
        <div css={styles.shipColumnWrap} id="ship-column-wrap">
          <ActionButton action={zone.actions[ActionNames.HARVEST]} />
          <TechButton />
          <ActionButton action={zone.actions[ActionNames.GENERATE]} />
          <ActionButton action={zone.actions[ActionNames.COMPRESS]} />
          <ActionButton action={zone.actions[ActionNames.THAW]} />
          <ActionButton action={zone.actions[ActionNames.EXCAVATE]} />
          {root.game.tech.unlocked && <ZoneEntityButtonSpacer />}
        </div>
      </div>
      <div css={styles.shipOuter}>
        <Divider
          text={'outpost'}
          shown={zone.buildings.unlocked}
          showEntranceAnimation={zone.buildings.showEntranceAnimation()}
        />
        <div css={styles.shipColumnWrap} id="ship-column-wrap">
          {zone.buildings.asArray.map((building) => {
            return <BuildingButton building={building} key={building.name} />;
          })}
          <ZoneEntityButtonSpacer />
        </div>
      </div>
    </>
  );
}

export default observer(ShipColonyView);
