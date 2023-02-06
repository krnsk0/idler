import { observer } from 'mobx-react-lite';
import { Zone } from '../../../../store/zone/zone';
import TechButton from './TechButton/TechButton';
import ActionButton from './ActionButton/ActionButton';
import { ActionNames } from '../../../../store/zone/actions/actionNames';
import { Divider } from '../../../shared/Divider/Divider';
import BuildingButton from './BuildingButton/BuildingButton';
import { styles } from './ShipColonyView.styles';

interface ShipViewProps {
  zone: Zone;
}

function ShipColonyView({ zone }: ShipViewProps) {
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
        </div>
      </div>
      <div css={styles.shipOuter}>
        <Divider
          text={'outpost'}
          shown={zone.buildings.unlocked}
          showEntranceAnimation={zone.buildings.showEntranceAnimation()}
        />
        <div css={styles.shipColumnWrap} id="ship-column-wrap">
          {zone.buildings.asArray.map((building, index) => {
            return <BuildingButton building={building} key={building.name} />;
          })}
        </div>
      </div>
    </>
  );
}

export default observer(ShipColonyView);
