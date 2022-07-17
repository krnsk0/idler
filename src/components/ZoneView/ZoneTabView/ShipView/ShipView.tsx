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
  return (
    <>
      <div css={styles.shipOuter}>
        <Divider text={'ship'} width={374} />
        <div css={styles.shipContainer}>
          <div css={styles.shipColumn}>
            <ActionButton action={zone.actions[ActionNames.HARVEST]} />
            <ActionButton action={zone.actions[ActionNames.GENERATE]} />
            <ActionButton action={zone.actions[ActionNames.THAW]} />
          </div>
          <div css={styles.shipColumn}>
            <TechButton />
            <ActionButton action={zone.actions[ActionNames.COMPRESS]} />
          </div>
        </div>
      </div>
      <div css={styles.shipOuter}>
        <Divider text={'colony'} width={374} />
        <div css={styles.shipContainer}>
          <div css={styles.shipColumnWrap}>
            {zone.producers.unlockedAsArray.map((building) => {
              return <ProducerButton building={building} key={building.name} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default observer(ShipView);
