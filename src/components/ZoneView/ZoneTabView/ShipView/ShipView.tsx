import { observer } from 'mobx-react-lite';
import { Zone } from '../../../../store/zone/zone';
import TechButton from './TechButton/TechButton';
import ActionButton from './ActionButton/ActionButton';
import { ActionNames } from '../../../../store/zone/actions/actionNames';
import { Divider } from '../../../shared/Divider/Divider';
import ProducerButton from './ProducerButton/ProducerButton';
import { styles } from './ShipView.styles';

interface ShipViewProps {
  zone: Zone;
}

function ShipView({ zone }: ShipViewProps) {
  const areProducersUnlocked = !!zone.producers.unlockedAsArray.length;
  return (
    <>
      <div css={styles.shipOuter} id="ship-view-outer">
        <Divider text={'crashed ship'} shown={areProducersUnlocked} />
        <div css={styles.shipColumnWrap} id="ship-column-wrap">
          <ActionButton action={zone.actions[ActionNames.HARVEST]} />
          <TechButton />
          <ActionButton action={zone.actions[ActionNames.GENERATE]} />
          <ActionButton action={zone.actions[ActionNames.COMPRESS]} />
          <ActionButton action={zone.actions[ActionNames.THAW]} />
        </div>
      </div>
      <div css={styles.shipOuter}>
        <Divider text={'colony'} shown={areProducersUnlocked} />
        <div css={styles.shipColumnWrap} id="ship-column-wrap">
          {zone.producers.asArray.map((building) => {
            return <ProducerButton building={building} key={building.name} />;
          })}
        </div>
      </div>
    </>
  );
}

export default observer(ShipView);
